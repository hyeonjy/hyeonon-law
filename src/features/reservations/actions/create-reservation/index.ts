"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { createReservation } from "@/features/reservations/services/create-reservation";
import { CreateReservationSchema } from "./schema";
import { ActionState } from "./types";

export async function createReservationAction(
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

  const dateStr = date.toISOString().split("T")[0]; // YYYY-MM-DD
  const startTime = time.split("-")[0]; // "10:00-11:00" → "10:00"
  const consultAt = `${dateStr} ${startTime}`;

  const supabase = await createSupabaseServer();

  // 로그인된 사용자라면 user_id 포함
  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    await createReservation(supabase, {
      name,
      phone,
      email,
      content,
      case_type_id: caseTypeId,
      consult_at: consultAt,
      user_id: user?.id ?? null,
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
  revalidatePath("/reservations");
  redirect("/reservations");
}
