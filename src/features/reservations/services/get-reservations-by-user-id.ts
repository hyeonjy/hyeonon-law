import { SupabaseClient } from "@supabase/supabase-js";
import { getReservationsByUserIdQueryBuilder } from "../query-builder/get-reservations-by-user-id.builder";

/**
 * userId로 예약 목록을 조회하는 서비스 함수
 * @param supabaseClient Supabase 클라이언트
 * @param userId 조회할 유저의 UUID
 * @returns 예약 목록 데이터 배열
 * @throws 예약 목록 조회 실패 시 구체적인 에러 메시지와 함께 throw
 */
export const getReservationsByUserId = async (
  supabaseClient: SupabaseClient,
  userId: string,
) => {
  const { data, error } = await getReservationsByUserIdQueryBuilder(
    supabaseClient,
    userId,
  );

  if (error) {
    throw new Error(`예약 목록을 불러오는데 실패했습니다: ${error.message}`);
  }

  return data;
};
