import { chatRooms } from "@/mocks/chat_rooms";
import { users } from "@/mocks/users";
import { chatMessages } from "@/mocks/chat_messages";
import { ChatListItem } from "./chat-list-item";

export function AdminChatList() {
  const chatListItems = chatRooms.map((room) => {
    const requester = users.find((user) => user.id === room.requester_id);
    // 해당 방의 메시지 중 가장 최근 메시지 찾기
    const roomMessages = chatMessages.filter((msg) => msg.room_id === room.id);
    const lastMessage = roomMessages.sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )[0];

    // 읽지 않은 메시지 수
    const unreadCount = 1;

    return {
      ...room,
      requester,
      lastMessage,
      unreadCount,
    };
  });

  return (
    <div className="flex flex-col w-full min-h-[600px]">
      {chatListItems.map((item) => {
        if (!item.requester) return null; // requester 정보가 없으면 렌더링 하지 않음 (예외처리)
        return (
          <ChatListItem
            key={item.id}
            id={item.id}
            requester={item.requester}
            lastMessage={item.lastMessage}
            unreadCount={item.unreadCount}
          />
        );
      })}
    </div>
  );
}
