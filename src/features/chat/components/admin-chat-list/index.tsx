"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { getAllChatRooms } from "../../services/get-all-chat-rooms";
import { ChatListItem } from "./chat-list-item";

export function AdminChatList() {
  const [chatRooms, setChatRooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createSupabaseClient();

  useEffect(() => {
    let isMounted = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const fetchRooms = async () => {
      try {
        const data = await getAllChatRooms(supabase as any);
        if (isMounted) {
          setChatRooms(data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("채팅방 목록 로딩 에러:", error);
      }
    };

    const initRealtime = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        await supabase.realtime.setAuth(session.access_token);
      }

      const channelName = `admin_chat_list_${Date.now()}`;

      channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "chat_rooms" },
          () => {
            fetchRooms();
          },
        )
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "chat_messages" },
          () => {
            fetchRooms();
          },
        )
        .subscribe();
    };

    fetchRooms().then(() => {
      if (isMounted) initRealtime();
    });

    return () => {
      isMounted = false;
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [supabase]);

  if (isLoading) {
    return (
      <div className="flex flex-col w-full min-h-[600px] items-center justify-center text-gray-500 text-sm">
        채팅방 목록을 불러오는 중...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full min-h-[600px]">
      {chatRooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full p-8 text-gray-500 text-sm">
          아직 개설된 채팅방이 없습니다.
        </div>
      ) : (
        chatRooms.map((room) => {
          if (!room.requester) return null;

          return (
            <ChatListItem
              key={room.id}
              id={room.id}
              requester={room.requester}
              lastMessage={room.latest_message}
            />
          );
        })
      )}
    </div>
  );
}
