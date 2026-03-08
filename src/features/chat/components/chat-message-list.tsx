"use client";

import { ChatMessageItem } from "./chat-message-item";
import { DisplayMessage } from "../types";

interface ChatMessageListProps {
  groupedMessages: Record<string, DisplayMessage[]>;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

export function ChatMessageList({
  groupedMessages,
  messagesEndRef,
}: ChatMessageListProps) {
  return (
    <div className="mt-[121px] flex-1 overflow-y-auto bg-white pb-[36px]">
      <div className="mx-auto max-w-2xl px-4 py-8 space-y-6 sm:px-6 lg:px-8">
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} className="flex flex-col gap-4">
            <div className="flex justify-center">
              <span className="rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500">
                {date}
              </span>
            </div>
            {msgs.map((msg) => (
              <ChatMessageItem
                key={msg.id}
                content={msg.content}
                createdAt={msg.created_at}
                isMe={msg.isMe}
                senderName={msg.senderName}
                senderAvatar={msg.senderAvatarUrl}
              />
            ))}
          </div>
        ))}
        {/* 스크롤 하단 자동 이동을 위한 더미 타겟 */}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}
