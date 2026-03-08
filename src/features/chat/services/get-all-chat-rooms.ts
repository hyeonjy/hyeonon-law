import { SupabaseClient } from "@supabase/supabase-js";
import { getAllChatRoomsQueryBuilder } from "../query-builder/get-all-chat-rooms.builder";

export const getAllChatRooms = async (supabaseClient: SupabaseClient) => {
  const { data, error } = await getAllChatRoomsQueryBuilder(supabaseClient);

  if (error) {
    throw new Error(`채팅방 목록을 불러오는데 실패했습니다: ${error.message}`);
  }

  return data;
};
