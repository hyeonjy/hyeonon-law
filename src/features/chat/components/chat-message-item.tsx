import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  content: string;
  createdAt: string;
  isMe: boolean;
  senderName?: string;
  senderAvatar?: string;
}

export function ChatMessageItem({
  content,
  createdAt,
  isMe,
  senderName,
  senderAvatar,
}: ChatMessageItemProps) {
  const timeString = new Date(createdAt).toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className={cn(
        "flex w-full gap-2",
        isMe ? "justify-end" : "justify-start",
      )}
    >
      {!isMe && (
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={senderAvatar || ""} alt={senderName || "User"} />
          <AvatarFallback>{senderName?.[0] || "U"}</AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex max-w-[70%] flex-col",
          isMe ? "items-end" : "items-start",
        )}
      >
        {!isMe && (
          <span className="mb-1 text-xs text-gray-500">{senderName}</span>
        )}

        <div className="flex items-end gap-1">
          {isMe && (
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {timeString}
            </span>
          )}

          <div
            className={cn(
              "rounded-2xl px-4 py-2 text-sm",
              isMe
                ? "rounded-tr-none bg-primary-100 text-white"
                : "rounded-tl-none bg-gray-100 text-gray-900",
            )}
          >
            {content}
          </div>

          {!isMe && (
            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {timeString}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
