"use client";

import {
  useActionState,
  startTransition,
  useRef,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { DefaultTextField } from "@/components/ui/default-textfield";
import { BaseButton } from "@/components/ui/base-button";
import { ROUTES } from "@/constants/url";
import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/ui/error-message";
import { loginAction } from "../../actions/login";
import { LoginSchemaType } from "../../actions/login/schema";
import { loginSchema } from "../../actions/login/schema";
import { googleLoginAction } from "../../actions/google";

export const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginAction, null);
  const formRef = useRef<HTMLFormElement>(null);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isGooglePending, startGoogleTransition] = useTransition();

  const handleGoogleLogin = () => {
    setGoogleError(null);
    startGoogleTransition(async () => {
      const result = await googleLoginAction();
      if (result?.error) {
        setGoogleError(result.error);
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  return (
    <>
      <form
        ref={formRef}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(() => {
            startTransition(() => formAction(new FormData(formRef.current!)));
          })(e);
        }}
        className="flex flex-col gap-[30px] mb-8"
      >
        <div className="flex flex-col gap-[30px]">
          <DefaultTextField
            name="email"
            label="이메일"
            type="email"
            register={register("email")}
            isError={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <div className="relative">
            <DefaultTextField
              name="password"
              label="비밀번호"
              type={showPassword ? "text" : "password"}
              register={register("password")}
              isError={!!errors.password}
              errorMessage={errors.password?.message}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="cursor-pointer absolute right-3 top-10 -translate-y-1/2 text-grayscale-400 hover:text-grayscale-500 transition-colors"
              aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시하기"}
              aria-pressed={showPassword}
              aria-controls="password"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" aria-hidden="true" />
              ) : (
                <Eye className="h-4 w-4" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <BaseButton
          type="submit"
          label={isPending ? "로그인 중..." : "로그인"}
          variant="primary"
          disabled={isPending}
        />
        {state && !state.success && state.message && (
          <ErrorMessage>{state.message}</ErrorMessage>
        )}
      </form>

      {/* SNS 로그인 */}
      <div className="mb-8">
        <p className="text-sm text-grayscale-400 text-center mb-4">
          SNS로 로그인
        </p>
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer w-full flex items-center justify-center gap-2 text-grayscale-500 bg-transparent"
          onClick={handleGoogleLogin}
          disabled={isGooglePending || isPending}
        >
          <Image
            src="/icons/auth-google.svg"
            alt="Google"
            width={16}
            height={16}
          />
          {isGooglePending ? "Google 인증 중..." : "Google로 로그인"}
        </Button>
        {googleError && (
          <div className="mt-4">
            <ErrorMessage>{googleError}</ErrorMessage>
          </div>
        )}
      </div>

      {/* 회원가입 링크 */}
      <p className="text-center text-grayscale-400">
        계정이 없으신가요?{" "}
        <Link
          href={ROUTES.SIGNUP}
          className="text-primary-100 hover:text-primary-100/80 font-semibold"
        >
          회원가입
        </Link>
      </p>
    </>
  );
};
