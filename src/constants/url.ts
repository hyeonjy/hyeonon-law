/**
 * URL 경로 상수 관리 파일
 *
 * 프로젝트의 모든 URL 경로를 중앙에서 관리하여 일관성과 유지보수성을 향상시킵니다.
 *
 * @example
 * // Next.js Link 컴포넌트에서 사용
 * import Link from 'next/link';
 * import { ROUTES } from '@/constants/url';
 *
 * <Link href={ROUTES.HOME}>홈으로</Link>
 * <Link href={ROUTES.reservationDetail('123')}>예약 상세</Link>
 * <Link href={ROUTES.chatDetail('abc')}>채팅방</Link>
 *
 * @example
 * // useRouter 훅에서 사용
 * import { useRouter } from 'next/navigation';
 * import { ROUTES } from '@/constants/url';
 *
 * const router = useRouter();
 * router.push(ROUTES.LOGIN);
 * router.push(ROUTES.ADMIN.reservationDetail('456'));
 * router.push(ROUTES.chatDetail('789'));
 */

/**
 * 기본 라우트 경로 상수
 */
export const ROUTES = {
  /** 홈페이지 */
  HOME: "/",

  /** 소개 페이지 */
  ABOUT: "/about",

  /** 자주 묻는 질문 페이지 */
  FAQ: "/faq",

  /** 로그인 페이지 */
  LOGIN: "/login",

  /** 회원가입 페이지 */
  SIGNUP: "/signup",

  /** 상담 예약 작성 페이지 */
  RESERVATION_NEW: "/reservations/new",

  /** 내 예약 목록 조회 페이지 */
  RESERVATIONS: "/reservations",

  /**
   * 내 예약 상세 조회 페이지 (동적 라우팅)
   * @param reservedId - 예약 ID
   * @returns 예약 상세 페이지 경로
   * @example
   * ROUTES.reservationDetail('123') // '/reservations/123'
   */
  reservationDetail: (reservedId: string): string =>
    `/reservations/${reservedId}`,

  /**
   * 채팅 상세 페이지 (동적 라우팅)
   * @param chatId - 채팅방 ID
   * @returns 채팅 페이지 경로
   * @example
   * ROUTES.chatDetail('123') // '/chat/123'
   */
  chatDetail: (chatId: string): string => `/chat/${chatId}`,

  /** 관리자 관련 경로 */
  ADMIN: {
    /** 관리자 예약 목록 조회 페이지 */
    RESERVATIONS: "/admin/reservations",

    /**
     * 관리자 예약 상세 조회 페이지 (동적 라우팅)
     * @param reservedId - 예약 ID
     * @returns 관리자 예약 상세 페이지 경로
     * @example
     * ROUTES.ADMIN.reservationDetail('789') // '/admin/reservations/789'
     */
    reservationDetail: (reservedId: string): string =>
      `/admin/reservations/${reservedId}`,

    /** 관리자 채팅 목록 조회 페이지 */
    CHATS: "/admin/chats",
  },
} as const;

/**
 * ROUTES 객체의 타입
 * 타입 안정성을 위해 추출된 타입
 */
export type RoutesType = typeof ROUTES;

/**
 * 정적 라우트 경로만 추출한 타입
 * 함수형 라우트를 제외한 문자열 경로만 포함
 */
export type StaticRoute =
  | typeof ROUTES.HOME
  | typeof ROUTES.ABOUT
  | typeof ROUTES.FAQ
  | typeof ROUTES.LOGIN
  | typeof ROUTES.SIGNUP
  | typeof ROUTES.RESERVATION_NEW
  | typeof ROUTES.RESERVATIONS
  | typeof ROUTES.ADMIN.RESERVATIONS
  | typeof ROUTES.ADMIN.CHATS;
