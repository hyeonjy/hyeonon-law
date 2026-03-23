import { SupabaseClient } from "@supabase/supabase-js";
import { googleLoginQueryBuilder } from "../query-builder/google-login.builder";

/**
 * Google OAuth 로그인 서비스
 * query-builder를 호출하고 에러 처리 후 리다이렉트 URL 반환
 */
export const googleLogin = async (
  supabaseClient: SupabaseClient,
  redirectUrl: string,
) => {
  const { data, error } = await googleLoginQueryBuilder(supabaseClient, redirectUrl);

  if (error) {
    throw new Error(`Google 로그인에 실패했습니다: ${error.message}`);
  }

  return data;
};
