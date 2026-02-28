import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const insertReservationQueryBuilder = (
  supabaseClient: SupabaseClient<Database>,
  reservationData: Database["public"]["Tables"]["reservations"]["Insert"],
) => {
  const query = supabaseClient.from("reservations").insert(reservationData);

  return query;
};
