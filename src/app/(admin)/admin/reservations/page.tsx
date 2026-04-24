import { PRIVATE_FILTERS_COOKIE_KEY } from "@/features/reservations/constants/admin-list";
import { ReservationListFilters } from "@/features/reservations/services/admin/get-reservations";
import {
  getPrivateFiltersFromCookie,
  getPublicFilters,
  getSafePage,
  ReservationListPageSearchParams,
} from "@/features/reservations/utils/filters";
import { AdminReservationSection } from "@/features/reservations/components/admin-list";
import { cookies } from "next/headers";

interface AdminReservationsPageProps {
  searchParams: Promise<ReservationListPageSearchParams>;
}

export default async function AdminReservationsPage({
  searchParams,
}: AdminReservationsPageProps) {
  const queryParams = await searchParams;
  const page = getSafePage(queryParams.page);
  const publicFilters = getPublicFilters(queryParams);

  const cookieStore = await cookies();
  const privateFilters = getPrivateFiltersFromCookie(
    cookieStore.get(PRIVATE_FILTERS_COOKIE_KEY)?.value,
  );

  const filters: ReservationListFilters = {
    ...publicFilters,
    ...privateFilters,
  };

  return (
    <AdminReservationSection
      page={page}
      filters={filters}
      publicFilters={publicFilters}
    />
  );
}
