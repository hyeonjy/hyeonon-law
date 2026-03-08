import { Database } from "@/types/supabase";
import { GUEST_PROFILE } from "../constants";
import { ChatMessageRow, DisplayMessage } from "../types";

type User = Database["public"]["Tables"]["users"]["Row"];

/**
 * 메시지 하나의 발신자 이름과 아바타를 결정해서 반환합니다.
 */
export function getSenderProfile(
  msg: ChatMessageRow,
  currentUser: User,
): Pick<DisplayMessage, "isMe" | "senderName" | "senderAvatarUrl"> {
  const isMe = msg.sender_id === currentUser.id;

  // 상대방이 익명 로그인일 때 보여줄 기본 프로필
  const unknownSenderProfile = GUEST_PROFILE;

  const senderName = msg.sender?.name ?? unknownSenderProfile.name;

  const senderAvatarUrl =
    msg.sender?.avatar_url ?? unknownSenderProfile.avatar_url ?? undefined;

  return { isMe, senderName, senderAvatarUrl };
}
