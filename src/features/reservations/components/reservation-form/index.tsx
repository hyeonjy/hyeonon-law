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
import { getReservedTimesAction } from "@/features/reservations/actions/get-reserved-times";
import {
  CreateReservationSchema,
  CreateReservationInput,
} from "@/features/reservations/actions/create-reservation/schema";
import { ErrorMessage } from "@/components/ui/error-message";
import { useState, useEffect } from "react";

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
  const [reservedTimes, setReservedTimes] = useState<string[]>([]);
  const [isCheckingTimes, setIsCheckingTimes] = useState(false);

  // 날짜가 바뀔 때마다 해당 날짜의 예약된 시간을 서버 액션으로 조회
  useEffect(() => {
    if (!selectedDate) {
      setReservedTimes([]);
      return;
    }

    const checkReservedTimes = async () => {
      setIsCheckingTimes(true);
      try {
        const year = selectedDate.getFullYear();
        const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
        const day = String(selectedDate.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;

        const times = await getReservedTimesAction(dateStr);
        setReservedTimes(times);

        // 만약 사용자가 이미 클릭해둔 시간이 나중에 보니 '예약됨' 상태라면 값 초기화
        const currentTime = watch("time");
        if (currentTime && times.includes(currentTime)) {
          setValue("time", "", { shouldValidate: true });
        }
      } catch (error) {
        console.error("예약된 시간 체크 실패", error);
      } finally {
        setIsCheckingTimes(false);
      }
    };

    checkReservedTimes();
  }, [selectedDate]);

  // 옵션 데이터 가공 (이미 예약된 시간은 disabled 처리)
  const timeOptions = TIME_SLOTS.map((slot) => ({
    value: slot,
    label: slot,
    disabled: reservedTimes.includes(slot) || isCheckingTimes,
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
