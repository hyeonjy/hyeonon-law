import { ROUTES } from "@/constants/url";
import {
  PRIVATE_FILTER_MAX_LENGTH,
  RESERVATION_STATUS_OPTIONS,
} from "@/features/reservations/constants/admin-list";
import {
  privateFiltersCookieSchema,
  reservationListSearchParamsSchema,
} from "@/features/reservations/components/admin-list/schema";
import { ReservationListFilters } from "@/features/reservations/services/admin/get-reservations";
import { ReservationStatus } from "@/features/reservations/types";

export type ReservationListPageSearchParams = {
  page?: string;
  caseTypeId?: string;
  consultDate?: string;
  status?: string;
};

export type PublicReservationListFilters = Pick<
  ReservationListFilters,
  "caseTypeId" | "consultDate" | "status"
>;

export function normalizeQueryValue(value: string | undefined) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export function getSafePage(page: string | undefined) {
  const parsed = Number(page);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export function createPageHref(
  page: number,
  filters: PublicReservationListFilters,
) {
  const queryParams = new URLSearchParams();

  if (page > 1) {
    queryParams.set("page", String(page));
  }

  if (filters.caseTypeId) {
    queryParams.set("caseTypeId", filters.caseTypeId);
  }

  if (filters.consultDate) {
    queryParams.set("consultDate", filters.consultDate);
  }

  if (filters.status) {
    queryParams.set("status", filters.status);
  }

  const serializedQueryParams = queryParams.toString();

  return serializedQueryParams
    ? `${ROUTES.ADMIN.RESERVATIONS}?${serializedQueryParams}`
    : ROUTES.ADMIN.RESERVATIONS;
}

export function getSuspenseKey(page: number, filters: ReservationListFilters) {
  return JSON.stringify({
    page,
    caseTypeId: filters.caseTypeId ?? "",
    consultDate: filters.consultDate ?? "",
    status: filters.status ?? "",
    name: filters.name ?? "",
    phone: filters.phone ?? "",
  });
}

function isStrictIsoDate(dateString: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return false;
  }

  const [year, month, day] = dateString.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month &&
    date.getUTCDate() === day
  );
}

function getSafeStatus(status: string | undefined): ReservationStatus | undefined {
  const normalizedStatus = normalizeQueryValue(status);

  if (!normalizedStatus) {
    return undefined;
  }

  if (RESERVATION_STATUS_OPTIONS.includes(normalizedStatus as ReservationStatus)) {
    return normalizedStatus as ReservationStatus;
  }

  return undefined;
}

function getSafeConsultDate(consultDate: string | undefined) {
  const normalizedDate = normalizeQueryValue(consultDate);

  if (!normalizedDate) {
    return undefined;
  }

  if (!isStrictIsoDate(normalizedDate)) {
    return undefined;
  }

  return normalizedDate;
}

export function normalizeTextWithMaxLength(
  value: string | undefined,
  maxLength: number,
) {
  const normalized = normalizeQueryValue(value);

  if (!normalized) {
    return undefined;
  }

  return normalized.slice(0, maxLength);
}

export function getPublicFilters(
  searchParams: ReservationListPageSearchParams,
): PublicReservationListFilters {
  const parsed = reservationListSearchParamsSchema.safeParse(searchParams);
  const safeParams = parsed.success ? parsed.data : {};

  return {
    caseTypeId: normalizeQueryValue(safeParams.caseTypeId),
    consultDate: getSafeConsultDate(safeParams.consultDate),
    status: getSafeStatus(safeParams.status),
  };
}

export function getPrivateFiltersFromCookie(
  cookieValue: string | undefined,
): Pick<ReservationListFilters, "name" | "phone"> {
  if (!cookieValue) {
    return {};
  }

  try {
    const parsedJson: unknown = JSON.parse(decodeURIComponent(cookieValue));
    const parsedCookie = privateFiltersCookieSchema.safeParse(parsedJson);

    if (!parsedCookie.success) {
      return {};
    }

    return {
      name: normalizeTextWithMaxLength(
        parsedCookie.data.name,
        PRIVATE_FILTER_MAX_LENGTH.name,
      ),
      phone: normalizeTextWithMaxLength(
        parsedCookie.data.phone,
        PRIVATE_FILTER_MAX_LENGTH.phone,
      ),
    };
  } catch {
    return {};
  }
}
