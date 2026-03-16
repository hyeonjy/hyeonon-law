import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export const getChatRoomByIdQueryBuilder = (
  supabaseClient: SupabaseClient<Database>,
  roomId: string,
) => {
  const query = supabaseClient
    .from("chat_rooms")
    .select("*")
    .eq("id", roomId);

  return query;
};
