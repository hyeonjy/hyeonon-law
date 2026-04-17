import { AdminReservationList } from "@/features/reservations/components/admin-reservation-list";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getAllReservations } from "@/features/reservations/services/get-all-reservations";
import { Suspense } from "react";
import { ReservationTableSkeleton } from "@/features/reservations/components/reservation-table-skeleton";
import Link from "next/link";
import { ROUTES } from "@/constants/url";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const PAGE_SIZE = 10;
const PAGE_BUTTON_COUNT = 3;

interface AdminReservationsPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

function getSafePage(page: string | undefined) {
  const parsed = Number(page);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

function getPaginationPages(currentPage: number, totalPages: number) {
  const startPage = Math.max(
    1,
    Math.min(
      currentPage - Math.floor(PAGE_BUTTON_COUNT / 2),
      totalPages - PAGE_BUTTON_COUNT + 1,
    ),
  );
  const endPage = Math.min(totalPages, startPage + PAGE_BUTTON_COUNT - 1);

  return Array.from(
    { length: endPage - startPage + 1 },
    (_, index) => startPage + index,
  );
}

function createPageHref(page: number) {
  return page === 1
    ? ROUTES.ADMIN.RESERVATIONS
    : `${ROUTES.ADMIN.RESERVATIONS}?page=${page}`;
}

interface AdminReservationsContentProps {
  page: number;
}

async function AdminReservationsContent({
  page,
}: AdminReservationsContentProps) {
  const supabase = await createSupabaseServer();
  const reservationPageData = await getAllReservations(supabase, {
    page,
    pageSize: PAGE_SIZE,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(reservationPageData.totalCount / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const reservations = reservationPageData.data;
  const pages = getPaginationPages(currentPage, totalPages);
  const prevPage = currentPage > 1 ? currentPage - 1 : null;
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;

  return (
    <>
      <AdminReservationList data={reservations} />

      {totalPages > 1 && (
        <nav className="mt-8 flex items-center justify-center gap-1">
          {prevPage === null ? (
            <Button
              variant="ghost"
              size="icon-sm"
              disabled
              aria-label="이전 페이지"
              className={cn("text-grayscale-300")}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button asChild variant="ghost" size="icon-sm">
              <Link
                href={createPageHref(prevPage)}
                aria-label="이전 페이지"
                className={cn("text-grayscale-400 hover:text-primary-100")}
              >
                <ChevronLeft className="h-4 w-4" />
              </Link>
            </Button>
          )}

          {pages.map((pageNumber) =>
            pageNumber === currentPage ? (
              <Button
                key={pageNumber}
                variant="ghost"
                size="sm"
                disabled
                aria-current="page"
                className="min-w-8 border-none px-2 text-primary-100 font-bold disabled:opacity-100"
              >
                {pageNumber}
              </Button>
            ) : (
              <Button
                key={pageNumber}
                asChild
                variant="ghost"
                size="sm"
                className="min-w-8 border-none px-2 text-grayscale-400 hover:text-primary-100"
              >
                <Link href={createPageHref(pageNumber)}>{pageNumber}</Link>
              </Button>
            ),
          )}

          {nextPage === null ? (
            <Button
              variant="ghost"
              size="icon-sm"
              disabled
              aria-label="다음 페이지"
              className="text-grayscale-300"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button asChild variant="ghost" size="icon-sm">
              <Link
                href={createPageHref(nextPage)}
                aria-label="다음 페이지"
                className="text-grayscale-400 hover:text-primary-100"
              >
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          )}
        </nav>
      )}
    </>
  );
}

export default async function AdminReservationsPage({
  searchParams,
}: AdminReservationsPageProps) {
  const queryParams = await searchParams;
  const page = getSafePage(queryParams.page);

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

      <Suspense key={page} fallback={<ReservationTableSkeleton />}>
        <AdminReservationsContent page={page} />
      </Suspense>
    </div>
  );
}
