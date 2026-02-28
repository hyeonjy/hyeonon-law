import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { deleteReservationQueryBuilder } from "../query-builder/delete-reservation.builder";

export const deleteReservation = async (
  supabaseClient: SupabaseClient<Database>,
  reservationId: string,
) => {
  const { data, error } = await deleteReservationQueryBuilder(
    supabaseClient,
    reservationId,
  );

  if (error) {
    throw new Error(`예약을 취소하는데 실패했습니다: ${error.message}`);
  }

  return data;
};
