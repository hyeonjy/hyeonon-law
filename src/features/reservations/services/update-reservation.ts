import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { updateReservationQueryBuilder } from "../query-builder/update-reservation.builder";

export const updateReservation = async (
  supabaseClient: SupabaseClient<Database>,
  reservationId: string,
  updateData: Database["public"]["Tables"]["reservations"]["Update"],
) => {
  const { data, error } = await updateReservationQueryBuilder(
    supabaseClient,
    reservationId,
    updateData,
  );

  if (error) {
    throw new Error(`예약을 수정하는데 실패했습니다: ${error.message}`);
  }

  return data;
};
