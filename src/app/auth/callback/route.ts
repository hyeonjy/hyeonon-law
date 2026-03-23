import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServer } from "@/lib/supabase/server";

/**
 * Google OAuth 콜백 Route Handler
 * Google 인증 완료 후 code를 세션으로 교환하고 홈으로 리다이렉트
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createSupabaseServer();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // 인증 실패 시 로그인 페이지로 리다이렉트
  return NextResponse.redirect(`${origin}/login?error=OAuth+인증에+실패했습니다`);
}
