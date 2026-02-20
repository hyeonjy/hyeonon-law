import { SupabaseClient } from "@supabase/supabase-js";

/**
 * id로 유저 단건 조회 쿼리 빌더
 * users 테이블에서 id가 일치하는 단일 레코드를 반환하는 쿼리를 생성
 */
export const getUserByIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  id: string,
) => {
  const query = supabaseClient.from("users").select("*").eq("id", id).single();
  return query;
};
