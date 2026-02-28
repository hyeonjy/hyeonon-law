"use server";

import { createSupabaseServer } from "@/lib/supabase/server";
import { getReservedTimes } from "@/features/reservations/services/get-reserved-times";

export async function getReservedTimesAction(
  dateStr: string,
): Promise<string[]> {
  try {
    const supabase = await createSupabaseServer();

    const reservedTimes = await getReservedTimes(supabase, dateStr);

    return reservedTimes;
  } catch (error) {
    console.error("예약된 시간 조회 실패:", error);
    // UI 무너짐을 방지하기 위해 에러 시 빈 배열 반환 우선 처리
    return [];
  }
}
