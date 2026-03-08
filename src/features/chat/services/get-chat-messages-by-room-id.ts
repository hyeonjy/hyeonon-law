import { SupabaseClient } from "@supabase/supabase-js";
import { getChatMessagesByRoomIdQueryBuilder } from "../query-builder/get-chat-messages-by-room-id.builder";

export const getChatMessagesByRoomId = async (
  supabaseClient: SupabaseClient,
  roomId: string,
) => {
  const { data, error } = await getChatMessagesByRoomIdQueryBuilder(
    supabaseClient,
    roomId,
  );

  if (error) {
    throw new Error(`메시지를 불러오는데 실패했습니다: ${error.message}`);
  }

  return data;
};
