"use client";

import { Database } from "@/types/supabase";
import { ChatHeader } from "../chat-header";
import { ChatInput } from "../chat-input";
import { ChatMessageList } from "../chat-message-list";
import { useChatMessages } from "../../hooks/use-chat-messages";

type ChatRoom = Database["public"]["Tables"]["chat_rooms"]["Row"];
type User = Database["public"]["Tables"]["users"]["Row"];

interface AdminChatRoomProps {
  chatRoom: ChatRoom;
  requester: User;
  currentUser: User;
}

export function AdminChatRoom({
  chatRoom,
  requester,
  currentUser,
}: AdminChatRoomProps) {
  const { groupedMessages, messagesEndRef, isConnected, sendMessage } =
    useChatMessages(chatRoom.id, currentUser);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader isAdmin={true} title={requester.name || "상담 고객"} />
      <ChatMessageList
        groupedMessages={groupedMessages}
        messagesEndRef={messagesEndRef}
      />
      <ChatInput onSend={sendMessage} disabled={!isConnected} />
    </div>
  );
}
