import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";

export const getAllChatRoomsQueryBuilder = (
  supabaseClient: SupabaseClient<Database>,
) => {
  const query = supabaseClient
    .from("chat_rooms")
    .select(
      `
      id,
      created_at,
      requester_id,
      updated_at,
      requester:users!chat_rooms_requester_id_fkey (
        id,
        name,
        avatar_url
      ),
      latest_message:chat_messages!inner (
        id,
        content,
        created_at,
        sender_id
      )
    `,
    )
    .order("created_at", { ascending: false })
    .order("created_at", { referencedTable: "chat_messages", ascending: false })
    .limit(1, { referencedTable: "chat_messages" });

  return query;
};
