import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils"; // Assuming utils exists, otherwise I'll need to create or import from where it is. I saw it in view_file 29.
import { User } from "@/mocks/users";
import { ChatMessage } from "@/mocks/chat_messages";
import { ROUTES } from "@/constants/url";

interface IChatListItemProps {
  id: string; // chat room id
  requester: User;
  lastMessage?: ChatMessage;
  unreadCount?: number; // 읽지 않은 메시지 수, 기본값 0
}

function formatTimeAgo(dateString: string): string {
  const now = new Date();
  const date = new Date(dateString);
  const diff = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diff / (1000 * 60));
  const diffHours = Math.floor(diff / (1000 * 60 * 60));
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (diffMinutes < 1) {
    return "방금";
  }
  if (diffMinutes < 60) {
    return `${diffMinutes}분 전`;
  }
  if (diffHours < 24) {
    return `${diffHours}시간 전`;
  }
  if (diffDays === 1) {
    return "어제";
  }
  return date.toLocaleDateString("ko-KR", {
    month: "long",
    day: "numeric",
  });
}

export function ChatListItem({
  id,
  requester,
  lastMessage,
  unreadCount = 0,
}: IChatListItemProps) {
  return (
    <Link
      href={ROUTES.ADMIN.chatDetail(id)}
      className="flex items-start gap-4 p-4 hover:bg-gray-50 transition-colors border-b border-grayscale-200 last:border-b-0"
    >
      <Avatar className="h-12 w-12 mt-0.5">
        <AvatarImage
          src={requester.avatar_url || ""}
          alt={requester.name || "User"}
        />
        <AvatarFallback>{requester.name?.[0] || "U"}</AvatarFallback>
      </Avatar>

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline justify-between mb-1">
          <span className="font-semibold text-base text-gray-900 truncate">
            {requester.name || "알 수 없는 사용자"}
          </span>
          {lastMessage && (
            <span
              className={cn(
                "text-xs whitespace-nowrap ml-2",
                unreadCount > 0 ? "text-primary font-medium" : "text-gray-500",
              )}
            >
              {formatTimeAgo(lastMessage.created_at)}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between gap-4">
          <p className="text-sm text-grayscale-400/90 w-[60%] overflow-hidden text-ellipsis whitespace-nowrap">
            {lastMessage?.content || "대화 내용이 없습니다."}
          </p>
          {unreadCount > 0 && (
            <Badge
              variant="default"
              className="h-5 min-w-[20px] px-1.5 rounded-full flex items-center justify-center text-[10px]"
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
}
