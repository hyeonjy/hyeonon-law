"use server";

import { redirect } from "next/navigation";
import { createSupabaseServer } from "@/lib/supabase/server";
import { signup } from "../../services/signup";
import { signupSchema } from "./schema";
import { SignupActionState } from "./types";
import { ROUTES } from "@/constants/url";

export async function signupAction(
  prevState: SignupActionState | null,
  formData: FormData,
): Promise<SignupActionState> {
  const data = Object.fromEntries(formData.entries());

  // 서버에서 Zod 검증 (클라이언트 검증 우회 방지)
  const validatedFields = signupSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      message: "입력값이 올바르지 않습니다.",
    };
  }

  const { email, password, name } = validatedFields.data;

  try {
    const supabase = await createSupabaseServer();
    await signup(supabase, email, password, name);
  } catch (error: any) {
    // 네트워크 에러
    // TODO: Supabase에서 네트워크 에러 시 어떤 메시지가 오는지 확인 필요
    if (error.message?.includes("network")) {
      return {
        success: false,
        message: "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      };
    }

    if (error.message.includes("User already registered")) {
      return {
        success: false,
        message: "이미 가입된 이메일입니다.",
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
