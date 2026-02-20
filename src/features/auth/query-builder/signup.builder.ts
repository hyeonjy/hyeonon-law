import { SupabaseClient } from "@supabase/supabase-js";

/**
 * 회원가입 쿼리 빌더
 * Supabase auth.signUp 쿼리를 생성만 하고 실행하지 않음
 */
export const signupQueryBuilder = (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
  name: string,
) => {
  return supabaseClient.auth.signUp({
    email,
    password,
    options: {
      data: { name }, // users 테이블의 name 컬럼에 저장
    },
  });
};
