import { SupabaseClient } from "@supabase/supabase-js";

/**
 * userId로 예약 목록 조회 쿼리 빌더
 * reservations 테이블에서 user_id가 일치하는 레코드를 반환하는 쿼리를 생성
 * 최신 예약이 가장 위에 오도록 created_at 기준 내림차순 정렬
 */
export const getReservationsByUserIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  userId: string,
) => {
  const query = supabaseClient
    .from("reservations")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false }); // 최신순 정렬

  return query;
};
