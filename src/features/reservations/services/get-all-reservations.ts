import { SupabaseClient } from "@supabase/supabase-js";
import { getAllReservationsQueryBuilder } from "../query-builder/get-all-reservations.builder";

/**
 * 관리자용 전체 예약 목록을 조회하는 서비스 함수
 * @param supabaseClient Supabase 클라이언트
 * @returns 전체 예약 목록 데이터 배열
 * @throws 예약 목록 조회 실패 시 구체적인 에러 메시지와 함께 throw
 */
export const getAllReservations = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await getAllReservationsQueryBuilder(supabaseClient);

  if (error) {
    throw new Error(
      `전체 예약 목록을 불러오는데 실패했습니다: ${error.message}`,
    );
  }

  return data;
};
