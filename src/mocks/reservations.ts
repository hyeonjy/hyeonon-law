import { users } from "./users";
import { caseTypes } from "./case_types";

export type ReservationStatus = "접수" | "확인중" | "완료" | "취소";

export interface Reservation {
  id: string;
  user_id: string | null;
  name: string;
  phone: string;
  email: string;
  content: string;
  case_type_id: string;
  consult_at: string;
  status: ReservationStatus;
  created_at: string;
  updated_at: string;
}

export const reservations: Reservation[] = [
  {
    id: "r1eebc99-9c0b-4ef8-bb6d-6bb9bd380r11",
    user_id: users[1].id, // 유저1 (로그인 예약)
    name: users[1].name || "유저1",
    phone: "010-1234-5678",
    email: "user1@example.com",
    content: "형사 사건 관련 상담 요청합니다.",
    case_type_id: caseTypes[0].id, // 형사
    consult_at: new Date(
      new Date().setDate(new Date().getDate() + 1),
    ).toISOString(), // Tomorrow
    status: "접수",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r2eebc99-9c0b-4ef8-bb6d-6bb9bd380r22",
    user_id: null, // 비로그인 예약
    name: "게스트 유저1",
    phone: "010-9876-5432",
    email: "guest@example.com",
    content: "민사 소송 절차 문의 드립니다.",
    case_type_id: caseTypes[1].id, // 민사
    consult_at: new Date(
      new Date().setDate(new Date().getDate() + 2),
    ).toISOString(), // Day after tomorrow
    status: "확인중",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "r3eebc99-9c0b-4ef8-bb6d-6bb9bd380r33",
    user_id: users[1].id, // 유저1 (로그인 예약)
    name: users[1].name || "유저1",
    phone: "010-1234-5678",
    email: "user1@example.com",
    content: "기업 자문 계약 관련 미팅 요청",
    case_type_id: caseTypes[2].id, // 기업
    consult_at: new Date(
      new Date().setDate(new Date().getDate() - 7),
    ).toISOString(), // Last week
    status: "완료",
    created_at: new Date(
      new Date().setDate(new Date().getDate() - 10),
    ).toISOString(),
    updated_at: new Date(
      new Date().setDate(new Date().getDate() - 7),
    ).toISOString(),
  },
  {
    id: "r4eebc99-9c0b-4ef8-bb6d-6bb9bd380r44",
    user_id: null, // 비로그인 예약
    name: "게스트 유저2",
    phone: "010-1111-2222",
    email: "cancel@example.com",
    content: "행정 처분 취소 소송 상담 (취소됨)",
    case_type_id: caseTypes[3].id, // 행정
    consult_at: new Date(
      new Date().setDate(new Date().getDate() - 1),
    ).toISOString(), // Yesterday
    status: "취소",
    created_at: new Date(
      new Date().setDate(new Date().getDate() - 3),
    ).toISOString(),
    updated_at: new Date(
      new Date().setDate(new Date().getDate() - 1),
    ).toISOString(),
  },
  {
    id: "r5eebc99-9c0b-4ef8-bb6d-6bb9bd380r55",
    user_id: users[1].id, // 유저1 (로그인 예약)
    name: users[1].name || "유저1",
    phone: "010-1234-5678",
    email: "user1@example.com",
    content: "부동산 등기 관련 민사 상담",
    case_type_id: caseTypes[1].id, // 민사
    consult_at: new Date(
      new Date().setDate(new Date().getDate() + 5),
    ).toISOString(), // Next week
    status: "접수",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
