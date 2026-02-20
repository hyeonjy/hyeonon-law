import { SupabaseClient } from "@supabase/supabase-js";

export const logoutQueryBuilder = (
  supabaseClient: SupabaseClient,
  scope: "local" | "global" = "local",
) => {
  return supabaseClient.auth.signOut({ scope });
};
