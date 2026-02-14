import { reservations } from "@/mocks/reservations";
import { MyReservationDetail } from "@/features/reservations/components/my-reservation-detail";
import { notFound } from "next/navigation";

interface ReservationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ReservationDetailPage({
  params,
}: ReservationDetailPageProps) {
  const { id } = await params;

  // Mock 데이터에서 해당 ID의 예약 정보 찾기
  // 실제 구현에서는 API 호출 등으로 대체됨
  const reservation = reservations.find((r) => r.id === id);

  if (!reservation) {
    notFound();
  }

  return <MyReservationDetail reservation={reservation} />;
}
