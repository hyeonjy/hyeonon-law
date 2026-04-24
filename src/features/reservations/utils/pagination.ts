import { PAGE_BUTTON_COUNT } from "@/features/reservations/constants/admin-list";

export function getPaginationPages(currentPage: number, totalPages: number) {
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

export function getPrevNextPage(currentPage: number, totalPages: number) {
  return {
    prevPage: currentPage > 1 ? currentPage - 1 : null,
    nextPage: currentPage < totalPages ? currentPage + 1 : null,
  };
}
