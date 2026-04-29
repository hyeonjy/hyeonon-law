import { Button } from "@/components/ui/button";
import { AdminReservationList } from "@/features/reservations/components/admin-list/reservation-list";
import { ReservationTableSkeleton } from "@/features/reservations/components/reservation-table-skeleton";
import { PAGE_SIZE } from "@/features/reservations/constants/admin-list";
import {
  getReservations,
  ReservationListFilters,
} from "@/features/reservations/services/admin/get-reservations";
import {
  createPageHref,
  getSuspenseKey,
  PublicReservationListFilters,
} from "@/features/reservations/utils/filters";
import {
  getPaginationPages,
  getPrevNextPage,
} from "@/features/reservations/utils/pagination";
import { cn } from "@/lib/utils";
import { createSupabaseServer } from "@/lib/supabase/server";
import { ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ReservationFilterForm } from "./filter";

interface AdminReservationSectionProps {
  page: number;
  filters: ReservationListFilters;
  publicFilters: PublicReservationListFilters;
}

export function AdminReservationSection({
  page,
  filters,
  publicFilters,
}: AdminReservationSectionProps) {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-8 md:hidden">
        <input
          id="mobile-filter-toggle"
          type="checkbox"
          className="peer sr-only"
        />
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-4xl font-bold text-primary-100">예약 관리</h1>
          <label
            htmlFor="mobile-filter-toggle"
            className="inline-flex h-10 cursor-pointer select-none items-center gap-2 rounded-xl border border-grayscale-200 bg-white px-3 text-sm font-semibold text-primary-100 transition-colors hover:bg-grayscale-100"
          >
            <SlidersHorizontal className="h-4 w-4" />
            검색필터 열기
          </label>
        </div>
        <p className="mt-2 text-lg text-grayscale-400">
          모든 상담 예약을 확인하고 관리하실 수 있습니다.
        </p>

        <ReservationFilterForm
          filters={filters}
          idPrefix="mobile"
          className="mt-6 hidden rounded-2xl border border-grayscale-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,41,66,0.06)] peer-checked:block"
        />
      </div>

      <div className="mb-12 hidden md:block">
        <div className="space-y-2">
          <h1 className="text-4xl md:text-5xl font-bold text-primary-100">
            예약 관리
          </h1>
          <p className="text-lg text-grayscale-400">
            모든 상담 예약을 확인하고 관리하실 수 있습니다.
          </p>
        </div>
      </div>

      <ReservationFilterForm
        filters={filters}
        idPrefix="desktop"
        className="mb-8 hidden rounded-2xl border border-grayscale-200 bg-white p-5 shadow-[0_8px_24px_rgba(15,41,66,0.06)] md:block"
      />

      <Suspense
        key={getSuspenseKey(page, filters)}
        fallback={<ReservationTableSkeleton />}
      >
        <AdminReservationsContent
          page={page}
          filters={filters}
          publicFilters={publicFilters}
        />
      </Suspense>
    </div>
  );
}

async function AdminReservationsContent({
  page,
  filters,
  publicFilters,
}: AdminReservationSectionProps) {
  const supabase = await createSupabaseServer();
  const reservationPageData = await getReservations(supabase, {
    page,
    pageSize: PAGE_SIZE,
    filters,
  });

  const totalPages = Math.max(
    1,
    Math.ceil(reservationPageData.totalCount / PAGE_SIZE),
  );
  const currentPage = Math.min(page, totalPages);
  const currentListHref = createPageHref(currentPage, publicFilters);
  const currentListQuery = currentListHref.split("?")[1] ?? "";
  const reservations = reservationPageData.data;
  const pages = getPaginationPages(currentPage, totalPages);
  const { prevPage, nextPage } = getPrevNextPage(currentPage, totalPages);

  return (
    <>
      <AdminReservationList data={reservations} returnQuery={currentListQuery} />

      {/* 페이지네이션 버튼 */}
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
                href={createPageHref(prevPage, publicFilters)}
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
                <Link href={createPageHref(pageNumber, publicFilters)}>
                  {pageNumber}
                </Link>
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
                href={createPageHref(nextPage, publicFilters)}
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
