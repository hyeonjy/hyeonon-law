import { ReservationForm } from "@/features/reservations/components/reservation-form";
import { getReservationById } from "@/features/reservations/services/get-reservation-by-id";
import { createSupabaseServer } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

interface ReservationEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

// consult_at("2025-03-01 10:00:00+09:00")에서 TIME_SLOT 문자열("10:00-11:00") 복원
const TIME_SLOTS = [
  "10:00-11:00",
  "11:00-12:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
];

function getTimeSlotFromConsultAt(consultAt: string): string {
  const date = new Date(consultAt);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const startTime = `${hours}:${minutes}`;

  console.log(startTime);

  const matched = TIME_SLOTS.find((slot) => slot.startsWith(startTime));
  return matched ?? "";
}

export default async function ReservationEditPage({
  params,
}: ReservationEditPageProps) {
  const { id } = await params;

  const supabase = await createSupabaseServer();

  let reservation;
  try {
    reservation = await getReservationById(supabase, id);
  } catch {
    notFound();
  }

  if (!reservation) {
    notFound();
  }

  const defaultValues = {
    id: reservation.id,
    name: reservation.name,
    phone: reservation.phone,
    email: reservation.email,
    content: reservation.content ?? "",
    caseTypeId: reservation.case_type_id ?? "",
    date: new Date(reservation.consult_at),
    time: getTimeSlotFromConsultAt(reservation.consult_at),
  };

  return (
    <div className="w-full bg-white mx-auto max-w-[672px] px-4 py-24">
      {/* 페이지 제목 및 설명 */}
      <div className="mb-10 space-y-4">
        <h1 className="text-5xl font-bold leading-[48px] text-primary-100">
          예약 수정
        </h1>
        <p className="text-lg leading-7 text-grayscale-400">
          수정할 내용을 입력하신 후 저장해주세요.
        </p>
      </div>

      {/* 예약 수정 폼 */}
      <ReservationForm mode="edit" defaultValues={defaultValues} />
    </div>
  );
}
