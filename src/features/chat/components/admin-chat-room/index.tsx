import { ChatHeader } from "../chat-header";
import { ChatInput } from "../chat-input";
import { ChatMessageList } from "../chat-message-list";
import { chatRooms } from "@/mocks/chat_rooms";
import { users } from "@/mocks/users";

interface AdminChatRoomProps {
  roomId: string;
}

export function AdminChatRoom({ roomId }: AdminChatRoomProps) {
  // 채팅방 정보 및 사용자 정보 조회
  const chatRoom = chatRooms.find((room) => room.id === roomId);
  const requester = users.find((user) => user.id === chatRoom?.requester_id);
  const currentUserId = users[0].id; // 관리자

  // 채팅방이나 요청자가 없는 경우 처리 (예외 처리)
  if (!chatRoom || !requester) {
    return <div>존재하지 않는 채팅방입니다.</div>;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <ChatHeader isAdmin={true} title={requester.name || "상담 고객"} />
      <ChatMessageList roomId={roomId} currentUserId={currentUserId} />
      <ChatInput />
    </div>
  );
}
