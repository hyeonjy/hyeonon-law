import { ChatMessageItem } from "./chat-message-item";
import { chatMessages } from "@/mocks/chat_messages";
import { users } from "@/mocks/users";

interface ChatMessageListProps {
  roomId: string;
  currentUserId: string;
}

export function ChatMessageList({
  roomId,
  currentUserId,
}: ChatMessageListProps) {
  // 현재 채팅방의 메시지 필터링
  const roomMessages = chatMessages
    .filter((msg) => msg.room_id === roomId)
    .sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
    );

  // 사용자 정보 찾기
  const getUser = (userId: string) => users.find((u) => u.id === userId);

  // 메시지 날짜별로 그룹화
  const groupedMessages: Record<string, typeof roomMessages> = {};
  roomMessages.forEach((msg) => {
    const date = new Date(msg.created_at).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    if (!groupedMessages[date]) {
      groupedMessages[date] = [];
    }
    groupedMessages[date].push(msg);
  });

  return (
    <div className="mt-[121px] flex-1 overflow-y-auto bg-white">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {Object.entries(groupedMessages).map(([date, messages]) => (
          <div key={date} className="flex flex-col gap-4">
            <div className="flex justify-center">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                {date}
              </span>
            </div>
            {messages.map((msg) => {
              const sender = getUser(msg.sender_id);
              const isMe = msg.sender_id === currentUserId;

              return (
                <ChatMessageItem
                  key={msg.id}
                  content={msg.content}
                  createdAt={msg.created_at}
                  isMe={isMe}
                  senderName={sender?.name || "알 수 없음"}
                  senderAvatar={sender?.avatar_url || undefined}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
