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

  // 익명 로그인 완료 전 SSR 타이밍 엣지케이스 방어
  if (!user) {
    return;
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
