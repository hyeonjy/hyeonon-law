"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { DefaultTextField } from "@/components/ui/default-textfield";
import { BaseButton } from "@/components/ui/base-button";
import { ROUTES } from "@/constants/url";

const signupSchema = z
  .object({
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
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
        message:
          "비밀번호는 영문, 숫자, 특수문자를 포함하여 6~20자여야 합니다.",
      })
      .max(20, {
        message:
          "비밀번호는 영문, 숫자, 특수문자를 포함하여 6~20자여야 합니다.",
      })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/,
        {
          message:
            "비밀번호는 영문, 숫자, 특수문자를 포함하여 6~20자여야 합니다.",
        },
      ),
    confirmPassword: z
      .string()
      .min(1, { message: "비밀번호 확인을 입력해주세요." }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type SignupSchemaType = z.infer<typeof signupSchema>;

export const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SignupSchemaType) => {
    // 실제 회원가입 로직은 아직 구현하지 않음 (하드코딩 원칙)
    console.log("Signup submitted:", data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[30px] mb-8"
      >
        <div className="flex flex-col gap-[30px]">
          <DefaultTextField
            htmlFor="name"
            label="이름"
            type="text"
            register={register("name")}
            isError={!!errors.name}
            errorMessage={errors.name?.message}
          />
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
          <DefaultTextField
            htmlFor="confirmPassword"
            label="비밀번호 확인"
            type="password"
            register={register("confirmPassword")}
            isError={!!errors.confirmPassword}
            errorMessage={errors.confirmPassword?.message}
          />
        </div>
        <BaseButton type="submit" label="회원가입" variant="primary" />
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
