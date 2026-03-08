import { SupabaseClient } from "@supabase/supabase-js";

export const getAllChatRoomsQueryBuilder = (supabaseClient: SupabaseClient) => {
  const query = supabaseClient
    .from("chat_rooms")
    .select("*")
    .order("created_at", { ascending: false }); // 최신순 정렬

  return query;
};
