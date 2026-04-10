// 토스트 코드 문자열 상수
export const TOAST_CODE = {
  RESERVATION_CREATED: "reservation_created",
  RESERVATION_UPDATED: "reservation_updated",
  RESERVATION_DELETED: "reservation_deleted",
} as const;

export type ToastCode = (typeof TOAST_CODE)[keyof typeof TOAST_CODE];

// 토스트 관련 공통 설정
export const TOAST = {
  // redirect 이후 1회성 토스트를 전달하는 쿠키 키
  COOKIE_NAME: "hyeonon_flash_toast",
  // 너무 오래 남지 않도록 짧은 TTL 유지
  COOKIE_TTL_SECONDS: 30,
  // 토스트 코드 -> 사용자 노출 문구 매핑
  MESSAGE_BY_CODE: {
    [TOAST_CODE.RESERVATION_CREATED]: "상담 예약이 정상적으로 접수되었습니다.",
    [TOAST_CODE.RESERVATION_UPDATED]: "예약 정보가 수정되었습니다.",
    [TOAST_CODE.RESERVATION_DELETED]: "예약이 삭제되었습니다.",
  },
} as const;

// 쿠키 값은 "코드:타임스탬프" 형태로 저장
export function createToastValue(code: ToastCode): string {
  return `${code}:${Date.now()}`;
}

// 쿠키 값에서 코드만 추출해 토스트 문구 찾기
export function getToastMessageFromValue(
  value: string | null | undefined,
): string | null {
  if (!value) return null;

  const [code] = value.split(":");
  if (code in TOAST.MESSAGE_BY_CODE) {
    return TOAST.MESSAGE_BY_CODE[code as ToastCode];
  }

  return null;
}
