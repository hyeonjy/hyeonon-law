"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { createReservation } from "@/features/reservations/services/create-reservation";
import { CreateReservationSchema } from "./schema";
import { ActionState } from "./types";
import { ROUTES } from "@/constants/url";
import { createToastValue, TOAST, TOAST_CODE } from "@/constants/flash-toast";

export async function createReservationAction(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  // FormData를 일반 객체로 변환해 스키마 검증 입력 사용
  const rawData = Object.fromEntries(formData.entries());

  // date 필드는 ISO string → Date 객체로 변환
  const parsed = {
    ...rawData,
    date: rawData.date ? new Date(rawData.date as string) : undefined,
    agreePrivacy: rawData.agreePrivacy === "true",
  };

  // Zod 스키마로 검증
  const validated = CreateReservationSchema.safeParse(parsed);

  if (!validated.success) {
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors: validated.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { name, phone, email, content, caseTypeId, date, time } =
    validated.data;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;

  const startTime = time.split("-")[0]; // "10:00-11:00" → "10:00"

  // "YYYY-MM-DD HH:mm:ss+09:00" 형식으로 KST 타임존 정보를 명시하여 저장
  const consultAt = `${dateStr} ${startTime}:00+09:00`;

  const supabase = await createSupabaseServer();

  // 로그인된 사용자라면 user_id 포함
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedInUser = !!user && !user.is_anonymous;

  try {
    await createReservation(supabase, {
      name,
      phone,
      email,
      content,
      case_type_id: caseTypeId,
      consult_at: consultAt,
      user_id: isLoggedInUser ? user.id : null,
    });
  } catch (error: any) {
    // 네트워크 등 기타 에러
    return {
      success: false,
      message: "예약 등록 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      errors: {},
    };
  }

  // redirect()는 try/catch 밖에서 호출
  const cookieStore = await cookies();
  cookieStore.set(
    TOAST.COOKIE_NAME,
    createToastValue(TOAST_CODE.RESERVATION_CREATED),
    {
      path: "/",
      maxAge: TOAST.COOKIE_TTL_SECONDS,
      sameSite: "lax",
    },
  );

  revalidatePath(ROUTES.RESERVATIONS);
  redirect(isLoggedInUser ? ROUTES.RESERVATIONS : ROUTES.HOME);
}
