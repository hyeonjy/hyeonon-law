"use client";

import { useActionState, startTransition, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DefaultTextField } from "@/components/ui/default-textfield";
import { SelectField } from "./select-field";
import { DateField } from "./date-field";
import { CheckboxField } from "./checkbox-field";
import { FormAction } from "./form-action";
import { caseTypes } from "@/mocks/case_types";
import { createReservationAction } from "@/features/reservations/actions/create-reservation";
import {
  CreateReservationSchema,
  CreateReservationInput,
} from "@/features/reservations/actions/create-reservation/schema";
import { ErrorMessage } from "@/components/ui/error-message";

// 상담시간 슬롯 (10:00-16:00, 점심시간 12:00-13:00 제외)
const TIME_SLOTS = [
  "10:00-11:00",
  "11:00-12:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
];

export function ReservationForm() {
  const [state, formAction, isPending] = useActionState(
    createReservationAction,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateReservationInput>({
    mode: "onChange",
    resolver: zodResolver(CreateReservationSchema),
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

  /**
   * TODO: 추후 Supabase 연동 시 예약된 시간대는 제외 하고 날짜 선택을 가능하게 필터링 예정
   * 현재는 UI 확인을 위해 단순 매핑만 수행
   */
  const timeOptions = TIME_SLOTS.map((slot) => ({
    value: slot,
    label: slot,
    disabled: false, // 로직 구현 전까지는 모두 선택 가능하도록 처리
  }));

  // 사건유형 옵션
  const caseTypeOptions = caseTypes.map((caseType) => ({
    value: caseType.id,
    label: caseType.name,
  }));

  return (
    <form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit((data) => {
          startTransition(() => {
            // DefaultTextField(name, phone, email, content)는 formRef에서 자동 수집
            // 커스텀 컴포넌트 필드는 data 객체에서 직접 추가
            const formData = new FormData(formRef.current!);
            formData.set("date", data.date.toISOString());
            formData.set("caseTypeId", data.caseTypeId);
            formData.set("time", data.time);
            formData.set("agreePrivacy", String(data.agreePrivacy));
            formAction(formData);
          });
        })(e);
      }}
      className="space-y-[30px] rounded-[14px] border border-grayscale-300 bg-white p-8"
    >
      {/* 성함 + 연락처 */}
      <div className="flex flex-col gap-[30px] md:flex-row md:gap-6">
        <DefaultTextField
          name="name"
          label="성함"
          showIcon
          register={register("name")}
          isError={!!errors.name}
          errorMessage={errors.name?.message}
          className="flex-1"
        />

        <DefaultTextField
          name="phone"
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
        name="email"
        label="이메일"
        type="email"
        showIcon
        register={register("email")}
        isError={!!errors.email}
        errorMessage={errors.email?.message}
      />

      {/* 내용 */}
      <DefaultTextField
        name="content"
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
        options={selectedDate ? timeOptions : []}
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

      {/* 서버 에러 메시지 */}
      {state && !state.success && state.message && (
        <ErrorMessage>{state.message}</ErrorMessage>
      )}

      {/* 버튼 및 알림 */}
      <FormAction isSubmitting={isPending} />
    </form>
  );
}
