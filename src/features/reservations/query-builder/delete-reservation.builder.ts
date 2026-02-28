import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const deleteReservationQueryBuilder = (
  supabaseClient: SupabaseClient<Database>,
  reservationId: string,
) => {
  const query = supabaseClient
    .from("reservations")
    .delete()
    .eq("id", reservationId);

  return query;
};
