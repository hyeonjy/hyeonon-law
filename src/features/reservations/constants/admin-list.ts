import { ReservationStatus } from "@/features/reservations/types";

export const PAGE_SIZE = 10;
export const PAGE_BUTTON_COUNT = 5;
export const PRIVATE_FILTERS_COOKIE_KEY = "admin-reservation-private-filters";
export const PRIVATE_FILTER_MAX_LENGTH = {
  name: 100,
  phone: 30,
} as const;

export const RESERVATION_STATUS_OPTIONS: ReservationStatus[] = [
  "접수",
  "확인중",
  "완료",
  "취소",
];
