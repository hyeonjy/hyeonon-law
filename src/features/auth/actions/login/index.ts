"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { login } from "../../services/login";
import { loginSchema } from "./schema";
import { LoginActionState } from "./types";
import { ROUTES } from "@/constants/url";

export async function loginAction(
  prevState: LoginActionState | null,
  formData: FormData,
): Promise<LoginActionState> {
  const data = Object.fromEntries(formData.entries());

  // 서버에서 Zod 검증 (클라이언트 검증 우회 방지)
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력값이 올바르지 않습니다.",
      errors: validatedFields.error.flatten().fieldErrors as Record<
        string,
        string[]
      >,
    };
  }

  const { email, password } = validatedFields.data;

  try {
    const supabase = await createSupabaseServer();
    await login(supabase, email, password);
  } catch (error: any) {
    // 네트워크 에러
    if (error?.message?.toLowerCase().includes("network")) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    // 이메일/비밀번호 불일치
    if (
      error?.message?.includes("Invalid login credentials") ||
      error?.message?.includes("Email not confirmed")
    ) {
      return {
        success: false,
        message: "이메일 또는 비밀번호가 올바르지 않습니다.",
      };
    }

    // 그 외 서버 에러
    return {
      success: false,
      message: "오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    };
  }

  // redirect()는 try/catch 밖에서 호출해야 함
  redirect(ROUTES.HOME);
}
