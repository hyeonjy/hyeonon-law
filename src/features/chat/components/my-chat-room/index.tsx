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
  const { groupedMessages, messagesEndRef, isConnected, sendMessage } =
    useChatMessages(chatRoom.id, currentUser);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader />
      <ChatMessageList
        groupedMessages={groupedMessages}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput onSend={sendMessage} disabled={!isConnected} />
    </div>
  );
}
