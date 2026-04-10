"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { deleteReservation } from "@/features/reservations/services/delete-reservation";
import { ROUTES } from "@/constants/url";
import { createToastValue, TOAST, TOAST_CODE } from "@/constants/flash-toast";
import { ActionState } from "./types";

export async function deleteReservationAction(
  reservationId: string,
  isAdmin: boolean = false,
): Promise<ActionState> {
  const supabase = await createSupabaseServer();

  try {
    await deleteReservation(supabase, reservationId);
  } catch (error: any) {
    // 존재하지 않는 ID 접근
    if (error?.code === "PGRST116") {
      return {
        success: false,
        message: "존재하지 않는 예약입니다.",
      };
    }

    // 권한 에러
    if (error?.code === "42501" || error?.message?.includes("permission")) {
      return {
        success: false,
        message: "예약을 취소할 권한이 없습니다.",
      };
    }

    // 네트워크 등 기타 에러
    return {
      success: false,
      message: "예약 취소 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  const targetPath = isAdmin ? ROUTES.ADMIN.RESERVATIONS : ROUTES.RESERVATIONS;

  // 삭제 완료 후 리다이렉트된 페이지에서 1회성 토스트 표시
  const cookieStore = await cookies();
  cookieStore.set(
    TOAST.COOKIE_NAME,
    createToastValue(TOAST_CODE.RESERVATION_DELETED),
    {
      path: "/",
      maxAge: TOAST.COOKIE_TTL_SECONDS,
      sameSite: "lax",
    },
  );

  revalidatePath(targetPath);
  redirect(targetPath);
}
