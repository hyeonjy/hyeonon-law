import { SupabaseClient } from "@supabase/supabase-js";

export const getAuth = async (supabaseClient: SupabaseClient) => {
  const supabase = supabaseClient;
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // 세션 없음 = 로그인 안 된 정상 상태 → null 반환
  if (error?.message?.includes("Auth session missing!")) {
    return null;
  }

  // 그 외 예상치 못한 오류는 throw
  if (error) {
    throw new Error(`인증 정보를 가져오는데 실패했습니다: ${error.message}`);
  }

  return user;
};
