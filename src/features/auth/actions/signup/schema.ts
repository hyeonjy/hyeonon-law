import { z } from "zod";

export const signupSchema = z
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
