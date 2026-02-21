import { SupabaseClient } from "@supabase/supabase-js";

export const getReservationByIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  reservationId: string,
) => {
  const query = supabaseClient
    .from("reservations")
    .select("*") // 필요한 경우 .select("*, case_types(*)") 처럼 조인 가능
    .eq("id", reservationId)
    .single(); // 단일 객체 반환

  return query;
};
