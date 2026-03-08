import { SupabaseClient } from "@supabase/supabase-js";
import { upsertChatRoomQueryBuilder } from "../query-builder/upsert-chat-room.builder";
import { Database } from "@/types/supabase";

type ChatRoom = Database["public"]["Tables"]["chat_rooms"]["Row"];

export const upsertChatRoom = async (
  supabaseClient: SupabaseClient,
  userId: string,
): Promise<ChatRoom> => {
  const { data, error } = await upsertChatRoomQueryBuilder(
    supabaseClient,
    userId,
  );

  if (error) {
    throw new Error(`채팅방 정보 조회/생성에 실패했습니다: ${error.message}`);
  }

  return data;
};
