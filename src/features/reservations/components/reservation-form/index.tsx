"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMemo } from "react";
import { DefaultTextField } from "@/components/ui/default-textfield";
import { SelectField } from "./select-field";
import { DateField } from "./date-field";
import { CheckboxField } from "./checkbox-field";
import { FormAction } from "./form-action";
import { caseTypes } from "@/mocks/case_types";
import { reservations } from "@/mocks/reservations";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod 스키마 정의
const reservationSchema = z.object({
  name: z.string().min(1, "성함을 입력해주세요"),
  phone: z.string().min(1, "연락처를 입력해주세요"),
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  content: z.string().min(1, "상담 내용을 입력해주세요"),
  caseTypeId: z.string({
    required_error: "사건유형을 선택해주세요",
  }),
  date: z.date({
    required_error: "상담날짜를 선택해주세요",
    invalid_type_error: "올바른 날짜를 선택해주세요",
  }),
  time: z.string({
    required_error: "상담시간을 선택해주세요",
  }),
  agreePrivacy: z.boolean({
    required_error: "개인정보 이용에 동의해주세요",
  }),
});

type ReservationFormData = z.infer<typeof reservationSchema>;

// 상담시간 슬롯 (10:00-16:00, 점심시간 12:00-13:00 제외)
const TIME_SLOTS = [
  "10:00-11:00",
  "11:00-12:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
];

export function ReservationForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ReservationFormData>({
    mode: "onChange",
    resolver: zodResolver(reservationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      content: "",
      caseTypeId: "",
      time: "",
      agreePrivacy: false,
    },
  });

  // 선택된 날짜 감지
  const selectedDate = watch("date");

  // 예약된 시간대 필터링
  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dateString = selectedDate.toISOString().split("T")[0];
    const reservedTimes = reservations
      .filter((reservation) => {
        const reservationDate = new Date(reservation.consult_at)
          .toISOString()
          .split("T")[0];
        return reservationDate === dateString;
      })
      .map((reservation) => {
        const date = new Date(reservation.consult_at);
        const hours = date.getHours();
        return `${hours.toString().padStart(2, "0")}:00-${(hours + 1).toString().padStart(2, "0")}:00`;
      });

    return TIME_SLOTS.map((slot) => ({
      value: slot,
      label: slot,
      disabled: reservedTimes.includes(slot),
    }));
  }, [selectedDate]);

  // 사건유형 옵션
  const caseTypeOptions = caseTypes.map((caseType) => ({
    value: caseType.id,
    label: caseType.name,
  }));

  // 폼 제출 핸들러
  const onSubmit = (data: ReservationFormData) => {
    console.log("예약 데이터:", data);
    // TODO: API 호출로 교체 예정
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-[30px] rounded-[14px] border border-grayscale-300 bg-white p-8"
    >
      {/* 성함 + 연락처 */}
      <div className="flex gap-6">
        <DefaultTextField
          htmlFor="name"
          label="성함"
          showIcon
          register={register("name")}
          isError={!!errors.name}
          errorMessage={errors.name?.message}
          className="flex-1"
        />

        <DefaultTextField
          htmlFor="phone"
          label="연락처"
          showIcon
          register={register("phone")}
          isError={!!errors.phone}
          errorMessage={errors.phone?.message}
          className="flex-1"
        />
      </div>

      {/* 이메일 */}
      <DefaultTextField
        htmlFor="email"
        label="이메일"
        type="email"
        showIcon
        register={register("email")}
        isError={!!errors.email}
        errorMessage={errors.email?.message}
      />

      {/* 내용 */}
      <DefaultTextField
        htmlFor="content"
        label="내용"
        showIcon
        register={register("content")}
        isError={!!errors.content}
        errorMessage={errors.content?.message}
        className="h-[128px]"
        multiline
      />

      {/* 사건유형 + 상담날짜 */}
      <div className="flex flex-col gap-[30px] md:gap-6 md:flex-row md:justify-between">
        <div className="flex-1">
          <SelectField
            label="사건유형"
            options={caseTypeOptions}
            value={watch("caseTypeId")}
            onChange={(value) =>
              setValue("caseTypeId", value, { shouldValidate: true })
            }
            error={errors.caseTypeId?.message}
          />
        </div>

        <div className="flex-1">
          <DateField
            label="상담날짜"
            value={selectedDate}
            onChange={(date) => {
              if (date) {
                setValue("date", date, { shouldValidate: true });
              }
            }}
            error={errors.date?.message}
          />
        </div>
      </div>

      {/* 상담시간 */}
      <SelectField
        label="상담시간"
        options={selectedDate ? availableTimeSlots : []}
        value={watch("time")}
        onChange={(value) => setValue("time", value, { shouldValidate: true })}
        error={errors.time?.message}
        disabled={!selectedDate}
      />

      {/* 개인정보 동의 */}
      <CheckboxField
        label="개인정보 이용에 동의합니다 "
        checked={watch("agreePrivacy")}
        onChange={(checked) =>
          setValue("agreePrivacy", checked, { shouldValidate: true })
        }
        error={errors.agreePrivacy?.message}
      />

      {/* 버튼 및 알림 */}
      <FormAction isSubmitting={isSubmitting} />
    </form>
  );
}
