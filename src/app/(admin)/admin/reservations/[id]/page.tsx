import { notFound } from "next/navigation";
import { AdminReservationDetail } from "@/features/reservations/components/admin-reservation-detail";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getReservationById } from "@/features/reservations/services/get-reservation-by-id";

interface IReservationDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function AdminReservationDetailPage({
  params,
}: IReservationDetailPageProps) {
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

  return <AdminReservationDetail reservation={reservation} />;
}
