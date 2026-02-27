import { z } from "zod";

export const CreateReservationSchema = z.object({
  name: z.string().min(1, "성함을 입력해주세요"),
  phone: z.string().min(1, "연락처를 입력해주세요"),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  content: z.string().min(1, "상담 내용을 입력해주세요"),
  caseTypeId: z.string().min(1, "사건유형을 선택해주세요"),
  date: z.date({
    required_error: "상담날짜를 선택해주세요",
    invalid_type_error: "올바른 날짜를 선택해주세요",
  }),
  time: z.string().min(1, "상담시간을 선택해주세요"),
  agreePrivacy: z.boolean().refine((val) => val === true, {
    message: "개인정보 이용에 동의해주세요",
  }),
});

export type CreateReservationInput = z.infer<typeof CreateReservationSchema>;
