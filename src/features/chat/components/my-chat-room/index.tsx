import { ChatHeader } from "../chat-header";
import { ChatInput } from "../chat-input";
import { ChatMessageList } from "../chat-message-list";
import { chatRooms } from "@/mocks/chat_rooms";
import { users } from "@/mocks/users";

export function MyChatRoom() {
  // 채팅 임시 데이터
  const roomId = chatRooms[0].id;
  const currentUserId = users[1].id; // 유저1

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader />
      <ChatMessageList roomId={roomId} currentUserId={currentUserId} />
      <ChatInput />
    </div>
  );
}
