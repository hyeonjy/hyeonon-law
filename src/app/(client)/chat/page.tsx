import { createSupabaseServer } from "@/lib/supabase/server";
import { getAuth } from "@/features/users/services/get-auth";
import { getUserById } from "@/features/users/services/get-user-by-id";
import { upsertChatRoom } from "@/features/chat/services/upsert-chat-room";
import { MyChatRoom } from "@/features/chat/components/my-chat-room";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/url";

export const dynamic = "force-dynamic";

export default async function MyChatRoomPage() {
  const supabase = await createSupabaseServer();
  const user = await getAuth(supabase);

  // proxy에서 세션을 보장하므로 이 경로는 정상 흐름에서 도달하지 않음
  // 혹시 도달하더라도 홈으로 리다이렉트
  if (!user) {
    redirect(ROUTES.HOME);
  }

  // 현재 접속 유저 정보 (DB 조회)
  const currentUser = await getUserById(supabase, user.id);

  if (!currentUser) {
    return <div>유저 정보를 찾을 수 없습니다.</div>;
  }

  // 관리자 계정은 사용자 채팅(/chat) 접근 차단
  if (currentUser.is_admin) {
    redirect(ROUTES.ADMIN.CHATS);
  }

  const chatRoom = await upsertChatRoom(supabase, user.id);

  return <MyChatRoom chatRoom={chatRoom} currentUser={currentUser} />;
}
