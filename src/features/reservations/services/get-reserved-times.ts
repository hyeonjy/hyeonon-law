import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { getReservedTimesQueryBuilder } from "../query-builder/get-reserved-times.builder";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

// KST 변환을 위한 플러그인
dayjs.extend(utc);
dayjs.extend(timezone);

export const getReservedTimes = async (
  supabaseClient: SupabaseClient<Database>,
  dateStr: string,
): Promise<string[]> => {
  const { data, error } = await getReservedTimesQueryBuilder(
    supabaseClient,
    dateStr,
  );

  if (error) {
    throw new Error(`예약된 시간 조회에 실패했습니다: ${error.message}`);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // DB에서 반환된 consult_at(TIMESTAMPTZ) 목록에서 KST 기준 HH:mm만 추출
  const reservedSlots = data.map(
    (reservation: Database["public"]["Tables"]["reservations"]["Row"]) => {
      const kstTime = dayjs(reservation.consult_at)
        .tz("Asia/Seoul")
        .format("HH:mm");

      // "10:00" -> "10:00-11:00" 포맷으로 변환
      const startHour = parseInt(kstTime.split(":")[0], 10);
      const endTime = `${startHour + 1}:00`;

      return `${kstTime}-${endTime}`;
    },
  );

  return reservedSlots;
};
