import { SupabaseClient } from "@supabase/supabase-js";
import { getUserByIdQueryBuilder } from "../query-builder/get-user-by-id.builder";

/**
 * id로 유저 정보를 조회하는 서비스 함수
 * @param supabaseClient Supabase 클라이언트
 * @param id 조회할 유저의 UUID
 * @returns 유저 정보 데이터
 * @throws 유저 조회 실패 시 구체적인 에러 메시지와 함께 throw
 */
export const getUserById = async (
  supabaseClient: SupabaseClient,
  id: string,
) => {
  const { data, error } = await getUserByIdQueryBuilder(supabaseClient, id);

  if (error) {
    throw new Error(`User를 불러오는데 실패했습니다: ${error.message}`);
  }

  return data;
};
