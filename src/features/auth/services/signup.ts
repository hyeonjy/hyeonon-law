import { SupabaseClient } from "@supabase/supabase-js";
import { signupQueryBuilder } from "../query-builder/signup.builder";

/**
 * 회원가입 서비스
 * query-builder에서 만든 쿼리를 실행하고 에러를 처리
 */
export const signup = async (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
  name: string,
) => {
  const { data, error } = await signupQueryBuilder(
    supabaseClient,
    email,
    password,
    name,
  );

  if (error) {
    throw new Error(`회원가입에 실패했습니다: ${error.message}`);
  }

  return data;
};
