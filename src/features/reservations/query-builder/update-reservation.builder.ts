import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const updateReservationQueryBuilder = (
  supabaseClient: SupabaseClient<Database>,
  reservationId: string,
  updateData: Database["public"]["Tables"]["reservations"]["Update"],
) => {
  const query = supabaseClient
    .from("reservations")
    .update(updateData)
    .eq("id", reservationId)
    .select()
    .single();

  return query;
};
