import { SupabaseClient } from "@supabase/supabase-js";
import { ReservationStatus } from "../../types";
import {
  getReservationsQueryBuilder,
  ReservationQueryFilters,
} from "../../query-builder/admin/get-reservations.builder";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);

const RESERVATION_STATUSES: ReservationStatus[] = [
  "접수",
  "확인중",
  "완료",
  "취소",
];

export interface ReservationListFilters {
  name?: string;
  phone?: string;
  caseTypeId?: string;
  consultDate?: string;
  status?: string;
}

interface GetReservationsParams {
  page: number;
  pageSize: number;
  filters?: ReservationListFilters;
}

function normalizeText(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

function isReservationStatus(value: string): value is ReservationStatus {
  return RESERVATION_STATUSES.includes(value as ReservationStatus);
}

function normalizeFilters(
  filters: ReservationListFilters | undefined,
): ReservationQueryFilters {
  const name = normalizeText(filters?.name);
  const phone = normalizeText(filters?.phone);
  const caseTypeId = normalizeText(filters?.caseTypeId);
  const status = normalizeText(filters?.status);
  const consultDate = normalizeText(filters?.consultDate);

  const normalizedFilters: ReservationQueryFilters = {};

  if (name) {
    normalizedFilters.name = name;
  }

  if (phone) {
    normalizedFilters.phone = phone;
  }

  if (caseTypeId) {
    normalizedFilters.caseTypeId = caseTypeId;
  }

  if (status && isReservationStatus(status)) {
    normalizedFilters.status = status;
  }

  if (consultDate) {
    const startOfDayKst = dayjs.tz(`${consultDate}T00:00:00`, "Asia/Seoul");

    if (startOfDayKst.isValid()) {
      normalizedFilters.consultAtFrom = startOfDayKst.toISOString();
      normalizedFilters.consultAtTo = startOfDayKst.add(1, "day").toISOString();
    }
  }

  return normalizedFilters;
}

/**
 * 관리자용 예약 목록을 페이지 단위로 조회하는 서비스 함수
 * @param supabaseClient Supabase 클라이언트
 * @param page 조회할 페이지 번호 (1부터 시작)
 * @param pageSize 페이지당 개수
 * @param filters 검색 필터
 * @returns 페이지 데이터와 전체 개수
 * @throws 예약 목록 조회 실패 시 구체적인 에러 메시지와 함께 throw
 */
export const getReservations = async (
  supabaseClient: SupabaseClient,
  { page, pageSize, filters }: GetReservationsParams,
) => {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const normalizedFilters = normalizeFilters(filters);

  const { data, count, error } = await getReservationsQueryBuilder(
    supabaseClient,
    { from, to, filters: normalizedFilters },
  );

  if (error) {
    throw new Error(
      `예약 목록을 불러오는데 실패했습니다: ${error.message}`,
    );
  }

  return {
    data: data ?? [],
    totalCount: count ?? 0,
  };
};
