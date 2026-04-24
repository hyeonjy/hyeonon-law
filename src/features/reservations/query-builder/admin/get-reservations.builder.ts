import { SupabaseClient } from "@supabase/supabase-js";
import { ReservationStatus } from "../../types";

export interface ReservationQueryFilters {
  name?: string;
  phone?: string;
  caseTypeId?: string;
  consultAtFrom?: string;
  consultAtTo?: string;
  status?: ReservationStatus;
}

interface GetReservationsQueryBuilderParams {
  from: number;
  to: number;
  filters?: ReservationQueryFilters;
}

/**
 * 관리자용 예약 목록 조회 쿼리 빌더
 * reservations 테이블을 created_at 최신순으로 조회하고,
 * 페이지네이션을 위해 count + range를 함께 적용
 */
export const getReservationsQueryBuilder = (
  supabaseClient: SupabaseClient,
  { from, to, filters }: GetReservationsQueryBuilderParams,
) => {
  let query = supabaseClient
    .from("reservations")
    .select(
      "id,user_id,name,phone,email,content,case_type_id,consult_at,status,created_at,updated_at",
      { count: "exact" },
    )
    .order("created_at", { ascending: false });

  if (filters?.name) {
    query = query.ilike("name", `%${filters.name}%`);
  }

  if (filters?.phone) {
    query = query.ilike("phone", `%${filters.phone}%`);
  }

  const equalityFilters: Record<string, string> = {};

  if (filters?.caseTypeId) {
    equalityFilters.case_type_id = filters.caseTypeId;
  }

  if (filters?.status) {
    equalityFilters.status = filters.status;
  }

  if (Object.keys(equalityFilters).length > 0) {
    query = query.match(equalityFilters);
  }

  if (filters?.consultAtFrom) {
    query = query.gte("consult_at", filters.consultAtFrom);
  }

  if (filters?.consultAtTo) {
    query = query.lt("consult_at", filters.consultAtTo);
  }

  return query.range(from, to);
};
