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
