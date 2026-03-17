"use client";

import { Database } from "@/types/supabase";
import { ChatHeader } from "../chat-header";
import { ChatInput } from "../chat-input";
import { ChatMessageList } from "../chat-message-list";
import { useChatMessages } from "../../hooks/use-chat-messages";

type ChatRoom = Database["public"]["Tables"]["chat_rooms"]["Row"];
type User = Database["public"]["Tables"]["users"]["Row"];

interface MyChatRoomProps {
  chatRoom: ChatRoom;
  currentUser: User;
}

export function MyChatRoom({ chatRoom, currentUser }: MyChatRoomProps) {
  const {
    groupedMessages,
    messagesEndRef,
    isConnected,
    sendMessage,
    isInitialLoading,
  } = useChatMessages(chatRoom.id, currentUser);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader />
      {isInitialLoading ? (
        <div
          className="mt-[121px] flex flex-1 flex-col items-center justify-center bg-white pb-[36px]"
          role="status"
          aria-busy="true"
          aria-live="polite"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-grayscale-300 border-t-primary-100" />
          <p className="mt-4 text-sm font-medium text-grayscale-400">
            메시지를 불러오는 중입니다.
          </p>
        </div>
      ) : (
        <ChatMessageList
          groupedMessages={groupedMessages}
          messagesEndRef={messagesEndRef}
        />
      )}
      <ChatInput onSend={sendMessage} disabled={!isConnected} />
    </div>
  );
}
