"use client";

import { useEffect, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { getAllChatRooms } from "../../services/get-all-chat-rooms";
import { ChatListItem } from "./chat-list-item";

const CHAT_LIST_SKELETON_COUNT = 5;

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
      <div
        className="flex w-full min-h-[600px] flex-col"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <span className="sr-only">채팅방 목록을 불러오는 중...</span>
        {Array.from({ length: CHAT_LIST_SKELETON_COUNT }).map((_, index) => (
          <ChatListItemSkeleton key={index} />
        ))}
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

function ChatListItemSkeleton() {
  return (
    <div className="flex items-start gap-4 border-b border-grayscale-200 p-4 last:border-b-0">
      <div className="mt-0.5 h-12 w-12 shrink-0 animate-pulse rounded-full bg-grayscale-200" />

      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-baseline justify-between">
          <div className="h-5 w-24 animate-pulse rounded bg-grayscale-200" />
          <div className="ml-2 h-3 w-12 animate-pulse rounded bg-grayscale-200" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="h-4 w-[60%] animate-pulse rounded bg-grayscale-200" />
        </div>
      </div>
    </div>
  );
}
