import { BaseButton } from "@/components/ui/base-button";
import { MyReservationList } from "@/features/reservations/components/my-reservation-list";
import { ROUTES } from "@/constants/url";
import Link from "next/link";

export default function ReservationsPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-100">
            내 예약 조회
          </h1>
          <p className="text-lg text-grayscale-400">
            예약 내역을 확인하고 관리하실 수 있습니다.
          </p>
        </div>

        <Link href={ROUTES.RESERVATION_NEW} className="w-24 block">
          <BaseButton label="새로운 예약" />
        </Link>
      </div>

      <MyReservationList />
    </div>
  );
}
