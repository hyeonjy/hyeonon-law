import { SupabaseClient } from "@supabase/supabase-js";

export const getChatMessagesByRoomIdQueryBuilder = (
  supabaseClient: SupabaseClient,
  roomId: string,
) => {
  const query = supabaseClient
    .from("chat_messages")
    .select(
      `id, room_id, sender_id, content, created_at,
      users!chat_messages_sender_id_fkey(name, avatar_url)`,
    )
    .eq("room_id", roomId)
    .order("created_at", { ascending: true });

  return query;
};
