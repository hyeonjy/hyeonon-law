"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createSupabaseClient } from "@/lib/supabase/client";
import { Database } from "@/types/supabase";
import { getChatMessagesByRoomId } from "../services/get-chat-messages-by-room-id";
import { getUserById } from "@/features/users/services/get-user-by-id";
import { ChatMessageRow, DisplayMessage } from "../types";
import { getSenderProfile } from "../utils/get-sender-profile";

export type User = Database["public"]["Tables"]["users"]["Row"];

export interface ChatMessage {
  id: string;
  room_id: string;
  sender_id: string;
  content: string;
  created_at: string;
  users?: {
    name: string | null;
    avatar_url: string | null;
  } | null;
}

export function useChatMessages(roomId: string, currentUser: User) {
  // 매 렌더마다 새 인스턴스 생성 방지 (React 권장 방식: useState 초기화 함수 사용)
  const [supabase] = useState(() => createSupabaseClient());

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 추가 시 스크롤 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 초기 메시지 로드 및 웹소켓 연결
  useEffect(() => {
    let isMounted = true;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const fetchInitialMessages = async () => {
      try {
        const data = await getChatMessagesByRoomId(supabase, roomId);

        if (!isMounted || !data) return;

        const formatted = data.map((val) => ({
          ...val,
          users: Array.isArray(val.users) ? val.users[0] : val.users,
        })) as ChatMessage[];

        setMessages((prev) => {
          const merged = new Map<string, ChatMessage>();
          [...prev, ...formatted].forEach((msg) => merged.set(msg.id, msg));
          return Array.from(merged.values()).sort(
            (a, b) =>
              new Date(a.created_at).getTime() -
              new Date(b.created_at).getTime(),
          );
        });
      } catch (error) {
        console.error(error);
      }
    };

    const init = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        await supabase.realtime.setAuth(session.access_token);
      }

      // React Strict Mode 등에서 컴포넌트가 빠르게 언마운트/마운트될 때
      // 동일한 채널 이름으로 재구독을 시도하면 포스트그레스 필터 에러(mismatch bindings)가
      // 발생할 수 있습니다. 이를 방지하기 위해 고유한 채널명을 사용합니다.
      const channelName = `room_${roomId}_${Date.now()}`;

      channel = supabase
        .channel(channelName)
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat_messages",
            filter: `room_id=eq.${roomId}`,
          },
          async (payload) => {
            if (!isMounted) return;

            const newRow = payload.new;
            const userData = await getUserById(supabase, newRow.sender_id);

            const incomingMessage: ChatMessage = {
              id: newRow.id,
              room_id: newRow.room_id,
              sender_id: newRow.sender_id,
              content: newRow.content,
              created_at: newRow.created_at,
              users: userData
                ? {
                    name: userData.name,
                    avatar_url: userData.avatar_url,
                  }
                : null,
            };

            setMessages((prev) => {
              if (prev.some((m) => m.id === incomingMessage.id)) return prev;
              return [...prev, incomingMessage];
            });
          },
        )
        .subscribe((status) => {
          if (!isMounted) return;
          const connected = status === "SUBSCRIBED";
          setIsConnected(connected);
          if (connected) fetchInitialMessages();
        });
    };

    init();

    return () => {
      isMounted = false;
      if (channel) supabase.removeChannel(channel);
    };
  }, [roomId, supabase]);

  // 메시지 보내기
  const sendMessage = useCallback(
    async (content: string) => {
      const trimmedContent = content.trim();
      if (!trimmedContent) return;

      const messageId = crypto.randomUUID();
      const now = new Date().toISOString();

      const newMessage: ChatMessage = {
        id: messageId,
        room_id: roomId,
        sender_id: currentUser.id,
        content: trimmedContent,
        created_at: now,
        users: {
          name: currentUser.name,
          avatar_url: currentUser.avatar_url,
        },
      };

      setMessages((prev) => [...prev, newMessage]);

      const { error } = await supabase.from("chat_messages").insert({
        id: messageId,
        room_id: roomId,
        sender_id: currentUser.id,
        content: trimmedContent,
        created_at: now,
      });

      if (error) {
        console.error("Message send failed:", error);
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      }
    },
    [roomId, currentUser, supabase],
  );

  // 날짜별로 메시지 그룹화
  const groupedMessages = (() => {
    const groups: Record<string, DisplayMessage[]> = {};

    messages.forEach((msg) => {
      const date = new Date(msg.created_at).toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
      });

      const { isMe, senderName, senderAvatarUrl } = getSenderProfile(
        {
          ...msg,
          sender: msg.users,
        } as ChatMessageRow,
        currentUser,
      );

      if (!groups[date]) groups[date] = [];
      groups[date].push({
        id: msg.id,
        content: msg.content,
        created_at: msg.created_at,
        isMe,
        senderName: isMe ? "" : senderName,
        senderAvatarUrl: isMe ? undefined : senderAvatarUrl,
      });
    });

    return groups;
  })();

  return { groupedMessages, messagesEndRef, isConnected, sendMessage };
}
