"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { logout } from "../../services/logout";
import { ROUTES } from "@/constants/url";

export async function logoutAction(): Promise<void> {
  try {
    const supabase = await createSupabaseServer();
    await logout(supabase);
  } catch (error: any) {
    // FIXME: 로그아웃 실패 시에도 로그인 페이지로 이동
    console.error("로그아웃 오류:", error.message);
  }

  // redirect()는 try/catch 밖에서 호출해야 함
  redirect(ROUTES.LOGIN);
}
