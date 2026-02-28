import { SupabaseClient } from "@supabase/supabase-js";

export const getReservedTimesQueryBuilder = (
  supabaseClient: SupabaseClient,
  dateStr: string,
) => {
  const query = supabaseClient.rpc("get_reserved_times_for_date", {
    target_date: dateStr,
  });

  return query;
};
