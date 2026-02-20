import { SupabaseClient } from "@supabase/supabase-js";
import { loginQueryBuilder } from "../query-builder/login.builder";

/**
 * 로그인 서비스
 * query-builder에서 만든 쿼리를 실행하고 에러를 처리
 */
export const login = async (
  supabaseClient: SupabaseClient,
  email: string,
  password: string,
) => {
  const { data, error } = await loginQueryBuilder(
    supabaseClient,
    email,
    password,
  );

  if (error) {
    throw new Error(`로그인에 실패했습니다: ${error.message}`);
  }

  return data;
};
