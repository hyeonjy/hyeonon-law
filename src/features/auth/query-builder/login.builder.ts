import { SupabaseClient } from "@supabase/supabase-js";

/**
 * 로그인 쿼리 빌더
 * Supabase auth.signInWithPassword 쿼리를 생성만 하고 실행하지 않음
 */
export const loginQueryBuilder = (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
) => {
  return supabaseClient.auth.signInWithPassword({
    email,
    password,
  });
};
