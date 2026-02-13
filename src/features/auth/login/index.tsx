"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { DefaultTextField } from "@/components/ui/default-textfield";
import { BaseButton } from "@/components/ui/base-button";
import { ROUTES } from "@/constants/url";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "이메일을 입력해주세요." })
    .email({ message: "이메일 형식이 올바르지 않습니다." })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
      message: "이메일 형식이 올바르지 않습니다.",
    }),
  password: z
    .string()
    .min(1, { message: "비밀번호를 입력해주세요." })
    .min(6, {
      message: "비밀번호는 영문, 숫자, 특수문자를 포함하여 6~20자여야 합니다.",
    })
    .max(20, {
      message: "비밀번호는 영문, 숫자, 특수문자를 포함하여 6~20자여야 합니다.",
    })
    .regex(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/, {
      message: "비밀번호는 영문, 숫자, 특수문자를 포함하여 6~20자여야 합니다.",
    }),
});

type LoginSchemaType = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginSchemaType) => {
    // 실제 로그인 로직은 아직 구현하지 않음 (하드코딩 원칙)
    console.log("Login submitted:", data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[30px] mb-8"
      >
        <div className="flex flex-col gap-[30px]">
          <DefaultTextField
            htmlFor="email"
            label="이메일"
            type="email"
            register={register("email")}
            isError={!!errors.email}
            errorMessage={errors.email?.message}
          />
          <DefaultTextField
            htmlFor="password"
            label="비밀번호"
            type="password"
            register={register("password")}
            isError={!!errors.password}
            errorMessage={errors.password?.message}
          />
        </div>
        <BaseButton type="submit" label="로그인" variant="primary" />
      </form>

      {/* SNS 로그인 */}
      <div className="mb-8">
        <p className="text-sm text-grayscale-400 text-center mb-4">
          SNS로 로그인
        </p>
        <Button
          type="button"
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-grayscale-500 bg-transparent"
        >
          <Image
            src="/icons/auth-google.svg"
            alt="Google"
            width={16}
            height={16}
          />
          Google로 로그인
        </Button>
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
