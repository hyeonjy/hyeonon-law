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
  const supabase = createSupabaseClient();
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  // 실시간 연결 상태 - true면 연결됨, false면 끊김/문제 발생 상태
  const [isConnected, setIsConnected] = useState(false);
  // auth 이벤트 콜백에서 최신 연결 상태를 참조하기 위한 ref
  const isConnectedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 메시지 추가 시 스크롤 이동
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // state 값이 바뀔 때 ref에도 최신값 반영
  useEffect(() => {
    isConnectedRef.current = isConnected;
  }, [isConnected]);

  // 초기 메시지 로드 및 웹소켓 연결
  useEffect(() => {
    let isMounted = true;
    // 현재 연결된 realtime 채널
    let channel: ReturnType<typeof supabase.channel> | null = null;
    let activeChannelName: string | null = null;
    // 재연결 타이머 저장용
    let reconnectTimer: ReturnType<typeof setTimeout> | null = null;
    // 재연결 시도 횟수
    let reconnectAttempts = 0;
    // 중복 연결 방지
    let isConnecting = false;
    // 초기 메시지 로드 여부
    let hasFetchedInitialMessages = false;
    let authSubscription: { unsubscribe: () => void } | null = null;

    const fetchInitialMessages = async () => {
      try {
        const data = await getChatMessagesByRoomId(supabase, roomId);

        if (!isMounted || !data) return;

        const formatted = data.map((val) => ({
          ...val,
          users: Array.isArray(val.users) ? val.users[0] : val.users,
        })) as ChatMessage[];

        // 초기 조회 결과와 현재 상태를 병합하면서 중복 id를 제거하고 시간순 정렬
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

    const fetchInitialMessagesOnce = async () => {
      // Strict Mode에서 effect가 재실행되어도 초기 로딩은 1회만 수행
      if (hasFetchedInitialMessages) return;
      hasFetchedInitialMessages = true;
      await fetchInitialMessages();
    };

    // realtime 연결 전에 현재 로그인 세션의 access token을 supabase realtime에 세팅하는 함수
    const ensureRealtimeAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.access_token) {
        return false;
      }

      await supabase.realtime.setAuth(session.access_token);
      return true;
    };

    const connectRealtime = async () => {
      if (!isMounted || isConnecting) return;
      isConnecting = true;

      try {
        const hasSession = await ensureRealtimeAuth();

        if (!isMounted) return;

        if (!hasSession) {
          // 세션이 없으면 구독을 붙여도 실패/타임아웃 재시도가 발생하므로
          // auth state 변경 이벤트를 기다렸다가 다시 연결
          setIsConnected(false);
          return;
        }

        if (channel) {
          // room 변경/재연결 시 기존 채널 정리
          const previousChannel = channel;
          channel = null;
          activeChannelName = null;
          void supabase.removeChannel(previousChannel);
        }

        if (!isMounted) {
          return;
        }

        if (reconnectTimer) {
          clearTimeout(reconnectTimer);
          reconnectTimer = null;
        }

        // React Strict Mode 등에서 컴포넌트가 빠르게 언마운트/마운트될 때
        // 동일한 채널 이름으로 재구독을 시도하면 포스트그레스 필터 에러(mismatch bindings)가
        // 발생할 수 있습니다. 이를 방지하기 위해 고유한 채널명을 사용합니다.
        const channelName = `room_${roomId}_${Date.now()}`;
        activeChannelName = channelName;

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
              if (!isMounted || activeChannelName !== channelName) return;

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
            // stale channel 콜백(이미 교체된 채널)은 무시해 재연결 루프를 차단
            if (!isMounted || activeChannelName !== channelName) return;

            if (status === "SUBSCRIBED") {
              setIsConnected(true);
              reconnectAttempts = 0;
              // 실시간 연결 완료 시 누락 메시지 동기화(최초 1회)
              void fetchInitialMessagesOnce();
              return;
            }

            if (
              (status === "CHANNEL_ERROR" ||
                status === "TIMED_OUT" ||
                status === "CLOSED") &&
              reconnectAttempts < 5
            ) {
              // 연결 실패 상태에서만 입력 비활성화를 반영
              setIsConnected(false);
              reconnectAttempts += 1;

              if (reconnectTimer) clearTimeout(reconnectTimer);
              // 짧은 backoff 후 동일 로직으로 재연결 시도
              reconnectTimer = setTimeout(() => {
                reconnectTimer = null;
                void connectRealtime();
              }, 500);
              return;
            }

            // SUBSCRIBING 등 중간 상태에서는 기존 입력 가능 상태를 유지
          });
      } finally {
        isConnecting = false;
      }
    };

    const init = async () => {
      const { data } = supabase.auth.onAuthStateChange(async (_, session) => {
        if (!isMounted) {
          return;
        }

        if (!session?.access_token) {
          setIsConnected(false);
          return;
        }

        await supabase.realtime.setAuth(session.access_token);
        reconnectAttempts = 0;

        if (!isConnectedRef.current) {
          void connectRealtime();
        }
      });

      authSubscription = data.subscription;

      // 초기 메시지 조회와 실시간 연결을 병렬로 시작
      void fetchInitialMessagesOnce();
      void connectRealtime();
    };

    init();

    return () => {
      isMounted = false;

      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
      }

      if (authSubscription) {
        authSubscription.unsubscribe();
      }

      if (channel) {
        const currentChannel = channel;
        channel = null;
        activeChannelName = null;
        supabase.removeChannel(currentChannel);
      }
    };
  }, [roomId, supabase]);

  // 메시지 보내기
  const sendMessage = useCallback(
    async (content: string) => {
      const trimmedContent = content.trim();
      if (!trimmedContent) return;

      const messageId = crypto.randomUUID();
      const now = new Date().toISOString();

      // UX 개선을 위한 낙관적 업데이트: 먼저 화면에 반영하고 실패 시 롤백
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
      // UI 헤더 표시에 맞게 로컬 포맷(ko-KR)의 날짜 키 생성
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
