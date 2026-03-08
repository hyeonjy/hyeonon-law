"use client";

import { useState } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || disabled || isSending) return;

    setIsSending(true);
    try {
      await onSend(content);
      setContent("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-[#d9d7d2] bg-white">
      <form
        onSubmit={handleSubmit}
        className="flex gap-3 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 "
      >
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={disabled || isSending}
          placeholder={disabled ? "연결 중입니다..." : "메시지를 입력하세요"}
          className="flex h-9 w-full flex-1 rounded-lg border border-[#e8e7e3] bg-white px-4 text-sm text-[#1a1a1a] outline-none placeholder:text-[#a1a1a1] focus:border-[#0f2942] disabled:opacity-50"
        />
        <button
          className="flex h-9 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0f2942] text-white transition-colors hover:bg-[#1a3b5c] disabled:opacity-50"
          type="submit"
          disabled={!content.trim() || disabled || isSending}
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
