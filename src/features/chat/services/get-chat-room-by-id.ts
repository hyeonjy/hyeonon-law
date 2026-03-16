import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { getChatRoomByIdQueryBuilder } from "../query-builder/get-chat-room-by-id.builder";

export async function getChatRoomById(
  supabase: SupabaseClient<Database>,
  roomId: string,
) {
  const { data, error } = await getChatRoomByIdQueryBuilder(
    supabase,
    roomId,
  ).single();

  if (error) {
    console.error("Error fetching chat room:", error);
    return null;
  }

  return data;
}
