import { createSupabaseServer } from "@/lib/supabase/server";
import { getAuth } from "@/features/users/services/get-auth";
import { getUserById } from "@/features/users/services/get-user-by-id";
import { upsertChatRoom } from "@/features/chat/services/upsert-chat-room";
import { MyChatRoom } from "@/features/chat/components/my-chat-room";

export const dynamic = "force-dynamic";

export default async function MyChatRoomPage() {
  const supabase = await createSupabaseServer();
  const user = await getAuth(supabase);

  // 익명 로그인 완료 전 SSR 타이밍 엣지케이스 방어
  if (!user) {
    return;
  }

  const chatRoom = await upsertChatRoom(supabase, user.id);

  // 현재 접속 유저 정보 (DB 조회)
  const currentUser = await getUserById(supabase, user.id);

  if (!currentUser) {
    return <div>유저 정보를 찾을 수 없습니다.</div>;
  }

  return <MyChatRoom chatRoom={chatRoom} currentUser={currentUser} />;
}
