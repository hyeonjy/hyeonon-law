import { SupabaseClient } from "@supabase/supabase-js";
import { getAllReservationsQueryBuilder } from "../query-builder/get-all-reservations.builder";

interface GetAllReservationsParams {
  page: number;
  pageSize: number;
}

/**
 * 관리자용 전체 예약 목록을 페이지 단위로 조회하는 서비스 함수
 * @param supabaseClient Supabase 클라이언트
 * @param page 조회할 페이지 번호 (1부터 시작)
 * @param pageSize 페이지당 개수
 * @returns 페이지 데이터와 전체 개수
 * @throws 예약 목록 조회 실패 시 구체적인 에러 메시지와 함께 throw
 */
export const getAllReservations = async (
  supabaseClient: SupabaseClient,
  { page, pageSize }: GetAllReservationsParams,
) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const { data, count, error } = await getAllReservationsQueryBuilder(
    supabaseClient,
    { from, to },
  );

  if (error) {
    throw new Error(
      `전체 예약 목록을 불러오는데 실패했습니다: ${error.message}`,
    );
  }

  return {
    data: data ?? [],
    totalCount: count ?? 0,
  };
};
