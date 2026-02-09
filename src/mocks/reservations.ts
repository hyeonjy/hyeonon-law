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
    user_id: users[1].id, // Normal User 1 (Login Reservation)
    name: users[1].name || "Normal User 1",
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
    user_id: null, // Non-login Reservation
    name: "Guest User",
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
];
