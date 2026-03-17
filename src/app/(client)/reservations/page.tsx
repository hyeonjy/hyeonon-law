import { BaseButton } from "@/components/ui/base-button";
import { MyReservationList } from "@/features/reservations/components/my-reservation-list";
import { ROUTES } from "@/constants/url";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getAuth } from "@/features/users/services/get-auth";
import { getReservationsByUserId } from "@/features/reservations/services/get-reservations-by-user-id";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ReservationTableSkeleton } from "@/features/reservations/components/reservation-table-skeleton";

async function ReservationsContent() {
  const supabase = await createSupabaseServer();

  // 현재 로그인 유저 확인
  const user = await getAuth(supabase);
  if (!user) {
    redirect("/");
  }

  // 유저 ID로 예약 목록 조회
  const reservations = await getReservationsByUserId(supabase, user.id);

  return <MyReservationList data={reservations ?? []} />;
}

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

      <Suspense fallback={<ReservationTableSkeleton />}>
        <ReservationsContent />
      </Suspense>
    </div>
  );
}
