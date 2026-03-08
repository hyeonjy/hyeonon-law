import { Database } from "@/types/supabase";

// DB에서 가져온 메시지 row (sender 정보가 JOIN된 상태)
export type ChatMessageRow =
  Database["public"]["Tables"]["chat_messages"]["Row"] & {
    sender: {
      name: string | null;
      avatar_url: string | null;
    } | null;
  };

// 화면에 표시할 준비가 완료된 메시지
// (발신자 이름/아바타가 이미 결정된 상태)
export type DisplayMessage = {
  id: string;
  content: string;
  created_at: string;
  isMe: boolean;
  senderName: string;
  senderAvatarUrl: string | undefined;
};
