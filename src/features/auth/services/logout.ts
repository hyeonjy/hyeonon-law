import { SupabaseClient } from "@supabase/supabase-js";
import { logoutQueryBuilder } from "../query-builder/logout.builder";

export const logout = async (
  supabaseClient: SupabaseClient,
  scope: "local" | "global" = "local",
): Promise<void> => {
  const { error } = await logoutQueryBuilder(supabaseClient, scope);

  if (error) {
    throw new Error(`로그아웃에 실패했습니다: ${error.message}`);
  }
};
