import { reservations } from "@/mocks/reservations";
import { notFound } from "next/navigation";
import { AdminReservationDetail } from "@/features/reservations/components/admin-reservation-detail";

interface IReservationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminReservationDetailPage({
  params,
}: IReservationDetailPageProps) {
  const { id } = await params;

  // Mock 데이터에서 해당 ID의 예약 정보 찾기
  // 실제 구현에서는 API 호출 등으로 대체됨
  const reservation = reservations.find((r) => r.id === id);

  if (!reservation) {
    notFound();
  }

  return <AdminReservationDetail reservation={reservation} />;
}
