import { ReservationForm } from "@/features/reservations/components/reservation-form";

export default function ReservationNewPage() {
  return (
    <div className="w-full bg-white mx-auto max-w-[672px] px-4 py-24">
      {/* 페이지 제목 및 설명 */}
      <div className="mb-10 space-y-4">
        <h1 className="text-5xl font-bold leading-[48px] text-primary-100">
          상담 예약
        </h1>
        <p className="text-lg leading-7 text-grayscale-400">
          아래 정보를 입력하시면 상담 예약이 완료됩니다.
        </p>
      </div>

      {/* 예약 폼 */}
      <ReservationForm />
    </div>
  );
}
