"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase/server";
import { updateReservation } from "@/features/reservations/services/update-reservation";
import { ActionState } from "./types";
import { ROUTES } from "@/constants/url";

export async function updateReservationStatusAction(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const rawData = Object.fromEntries(formData.entries());

  const { id, ...updateData } = rawData;

  if (!id || typeof id !== "string") {
    return {
      success: false,
      message: "예약 ID가 유효하지 않습니다.",
      errors: { id: ["예약 ID가 필요합니다."] },
    };
  }

  if (!updateData.status || typeof updateData.status !== "string") {
    return {
      success: false,
      message: "변경할 상태 값이 유효하지 않습니다.",
      errors: { status: ["상태 값이 필요합니다."] },
    };
  }

  const supabase = await createSupabaseServer();

  let data;
  try {
    data = await updateReservation(supabase, id, {
      status: updateData.status as "pending" | "confirmed" | "cancelled",
    });
  } catch (error: any) {
    // 데이터베이스 제약조건 위반
    if (error?.code === "23514" || error?.message?.includes("constraint")) {
      return {
        success: false,
        message: "허용되지 않는 상태 값입니다.",
        errors: { status: ["유효한 상태 값을 입력해주세요."] },
      };
    }

    // 네트워크 등 기타 에러
    return {
      success: false,
      message:
        "예약 상태 변경 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      errors: {},
    };
  }

  // 예약 상세 페이지 캐시 무효화
  revalidatePath(ROUTES.ADMIN.reservationDetail(id));

  return {
    success: true,
    message: "예약 상태가 성공적으로 변경되었습니다.",
    data,
  };
}
