import { SupabaseClient } from "@supabase/supabase-js";

interface GetAllReservationsQueryBuilderParams {
  from: number;
  to: number;
}

/**
 * 관리자용 전체 예약 목록 조회 쿼리 빌더
 * reservations 테이블을 created_at 최신순으로 조회하고,
 * 페이지네이션을 위해 count + range를 함께 적용
 */
export const getAllReservationsQueryBuilder = (
  supabaseClient: SupabaseClient,
  { from, to }: GetAllReservationsQueryBuilderParams,
) => {
  const query = supabaseClient
    .from("reservations")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  return query;
};
