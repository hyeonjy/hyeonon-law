import { AdminReservationList } from "@/features/reservations/components/admin-reservation-list";

export default function AdminReservationsPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="space-y-2 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-100">
          예약 관리
        </h1>
        <p className="text-lg text-grayscale-400">
          모든 상담 예약을 확인하고 관리하실 수 있습니다.
        </p>
      </div>

      <AdminReservationList />
    </div>
  );
}
