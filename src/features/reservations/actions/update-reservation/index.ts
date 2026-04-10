"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { updateReservation } from "@/features/reservations/services/update-reservation";
import { UpdateReservationSchema } from "./schema";
import { ActionState } from "./types";
import { ROUTES } from "@/constants/url";
import { getAuth } from "@/features/users/services/get-auth";
import { getUserById } from "@/features/users/services/get-user-by-id";
import {
  createToastValue,
  TOAST,
  TOAST_CODE,
} from "@/constants/flash-toast";

export async function updateReservationAction(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());

  // date 필드는 ISO string → Date 객체로 변환
  const parsed = {
    ...rawData,
    date: rawData.date ? new Date(rawData.date as string) : undefined,
    agreePrivacy: rawData.agreePrivacy === "true",
  };

  // Zod 스키마로 검증
  const validated = UpdateReservationSchema.safeParse(parsed);

  if (!validated.success) {
    return {
      success: false,
      message: "입력값을 확인해주세요.",
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const { id, name, phone, email, content, caseTypeId, date, time } =
    validated.data;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const dateStr = `${year}-${month}-${day}`;

  const startTime = time.split("-")[0]; // "10:00-11:00" → "10:00"

  // "YYYY-MM-DD HH:mm:ss+09:00" 형식으로 KST 타임존 정보를 명시하여 저장
  const consultAt = `${dateStr} ${startTime}:00+09:00`;

  const supabase = await createSupabaseServer();

  // 유저 정보 조회
  const authUser = await getAuth(supabase);
  const user = authUser ? await getUserById(supabase, authUser.id) : null;
  const isAdmin = user?.is_admin ?? false;

  try {
    await updateReservation(supabase, id, {
      name,
      phone,
      email,
      content,
      case_type_id: caseTypeId,
      consult_at: consultAt,
    });
  } catch (error: any) {
    // 트랜잭션/데이터베이스 에러 혹은 네트워크 에러
    return {
      success: false,
      message:
        error.message ||
        "예약 수정 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      errors: {},
    };
  }

  const detailPath = isAdmin
    ? ROUTES.ADMIN.reservationDetail(id)
    : ROUTES.reservationDetail(id);

  const cookieStore = await cookies();
  cookieStore.set(
    TOAST.COOKIE_NAME,
    createToastValue(TOAST_CODE.RESERVATION_UPDATED),
    {
      path: "/",
      maxAge: TOAST.COOKIE_TTL_SECONDS,
      sameSite: "lax",
    },
  );

  revalidatePath(detailPath);
  redirect(detailPath);
}
