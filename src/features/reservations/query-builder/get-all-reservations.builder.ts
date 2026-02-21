import { SupabaseClient } from "@supabase/supabase-js";

/**
 * 관리자용 전체 예약 목록 조회 쿼리 빌더
 * reservations 테이블의 모든 레코드를 반환하는 쿼리를 생성
 * 최신 예약이 가장 위에 오도록 created_at 기준 내림차순 정렬
 */
export const getAllReservationsQueryBuilder = (
  supabaseClient: SupabaseClient,
) => {
  const query = supabaseClient
    .from("reservations")
    .select("*")
    .order("created_at", { ascending: false }); // 최신순 정렬

  return query;
};
