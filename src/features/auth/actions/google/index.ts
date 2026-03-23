"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { googleLogin } from "../../services/google-login";

export async function googleLoginAction(): Promise<{ error: string } | void> {
  let oauthUrl = "";

  try {
    const supabase = await createSupabaseServer();
    const oauthCallbackUrl = `${process.env.NEXT_PUBLIC_URL}/auth/callback`;
    const data = await googleLogin(supabase, oauthCallbackUrl);

    if (!data.url) {
      return { error: "Google 로그인 URL을 가져오지 못했습니다." };
    }

    oauthUrl = data.url;
  } catch (error: any) {
    console.error("Google 로그인 오류:", error.message);
    return { error: "Google 로그인에 실패했습니다." };
  }

  // 성공한 경우에만 redirect 실행 (try/catch 밖에서 호출)
  redirect(oauthUrl);
}
