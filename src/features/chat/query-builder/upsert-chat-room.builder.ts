import { SupabaseClient } from "@supabase/supabase-js";

export const upsertChatRoomQueryBuilder = (
  supabaseClient: SupabaseClient,
  userId: string,
) => {
  return supabaseClient
    .from("chat_rooms")
    .upsert(
      { requester_id: userId },
      { onConflict: "requester_id", ignoreDuplicates: false },
    )
    .select()
    .single();
};
