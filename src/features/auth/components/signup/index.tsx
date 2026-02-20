"use client";

import { useActionState, startTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { DefaultTextField } from "@/components/ui/default-textfield";
import { BaseButton } from "@/components/ui/base-button";
import { ROUTES } from "@/constants/url";
import { signupAction } from "../../actions/signup";
import { SignupSchemaType } from "../../actions/signup/types";
import { signupSchema } from "../../actions/signup/schema";
import { ErrorMessage } from "@/components/ui/error-message";

export const SignupForm = () => {
  const [state, formAction, isPending] = useActionState(signupAction, null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
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
            name="name"
            label="이름"
            type="text"
            register={register("name")}
            isError={!!errors.name}
            errorMessage={errors.name?.message}
          />
          <DefaultTextField
            name="email"
            label="이메일"
            type="email"
            register={register("email")}
            isError={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <DefaultTextField
            name="password"
            label="비밀번호"
            type="password"
            register={register("password")}
            isError={!!errors.password}
            errorMessage={errors.password?.message}
          />
          <DefaultTextField
            name="confirmPassword"
            label="비밀번호 확인"
            type="password"
            register={register("confirmPassword")}
            isError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
        <BaseButton
          type="submit"
          label={isPending ? "가입 처리 중..." : "회원가입"}
          variant="primary"
          disabled={isPending}
        />
        {state &&
          !state.success &&
          state.message &&
          Object.keys(errors).length === 0 && (
            <ErrorMessage>{state.message}</ErrorMessage>
          )}
      </form>

      {/* 로그인 링크 */}
      <p className="text-center text-grayscale-400">
        이미 계정이 있으신가요?{" "}
        <Link
          href={ROUTES.LOGIN}
          className="text-primary-100 hover:text-primary-100/80 font-semibold"
        >
          로그인
        </Link>
      </p>
    </>
  );
};
