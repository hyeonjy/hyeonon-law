import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Google OAuth 로그인 쿼리 빌더
 * signInWithOAuth를 호출하여 Google 인증 URL을 반환
 */
export const googleLoginQueryBuilder = async (
  supabaseClient: SupabaseClient,
  redirectUrl: string,
) => {
  return supabaseClient.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: redirectUrl,
      queryParams: {
        prompt: "select_account",
      },
    },
  });
};
