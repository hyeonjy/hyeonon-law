import { Database } from "@/types/supabase";
import { SupabaseClient } from "@supabase/supabase-js";
import { getAllChatRoomsQueryBuilder } from "../query-builder/get-all-chat-rooms.builder";

export const getAllChatRooms = async (
  supabaseClient: SupabaseClient<Database>,
) => {
  const { data, error } = await getAllChatRoomsQueryBuilder(supabaseClient);

  if (error) {
    throw new Error(
      `관리자용 채팅방 목록을 불러오는데 실패했습니다: ${error.message}`,
    );
  }

  // 데이터 정제: 배열로 반환된 관계형 데이터를 단일 객체로 변환
  const formattedRooms = data.map((room) => {
    const lastMessage =
      Array.isArray(room.latest_message) && room.latest_message.length > 0
        ? room.latest_message[0]
        : null;

    return {
      ...room,
      requester: room.requester,
      latest_message: lastMessage,
    };
  });

  return formattedRooms;
};
