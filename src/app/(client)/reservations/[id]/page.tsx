import { MyReservationDetail } from "@/features/reservations/components/my-reservation-detail";
import { getReservationById } from "@/features/reservations/services/get-reservation-by-id";
import { createSupabaseServer } from "@/lib/supabase/server";
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

  return <MyReservationDetail reservation={reservation} />;
}
