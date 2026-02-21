import { SupabaseClient } from "@supabase/supabase-js";
import { getReservationByIdQueryBuilder } from "../query-builder/get-reservation-by-id.builder";

export const getReservationById = async (
  supabaseClient: SupabaseClient,
  reservationId: string,
) => {
  const { data, error } = await getReservationByIdQueryBuilder(
    supabaseClient,
    reservationId,
  );

  if (error) {
    console.log("error: ", error);
    throw new Error(`예약 정보를 불러오는데 실패했습니다: ${error.message}`);
  }

  return data;
};
