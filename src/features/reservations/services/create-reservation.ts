import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { insertReservationQueryBuilder } from "../query-builder/insert-reservation.builder";

export const createReservation = async (
  supabaseClient: SupabaseClient<Database>,
  reservationData: Database["public"]["Tables"]["reservations"]["Insert"],
) => {
  const { data, error } = await insertReservationQueryBuilder(
    supabaseClient,
    reservationData,
  );

  if (error) {
    throw new Error(`예약을 등록하는데 실패했습니다: ${error.message}`);
  }

  return data;
};
