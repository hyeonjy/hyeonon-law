import { AdminChatRoom } from "@/features/chat/components/admin-chat-room";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getChatRoomById } from "@/features/chat/services/get-chat-room-by-id";
import { getUserById } from "@/features/users/services/get-user-by-id";
import { getAuth } from "@/features/users/services/get-auth";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminChatRoomPage({ params }: PageProps) {
  const { id } = await params;

  const supabase = await createSupabaseServer();

  const [currentUser, chatRoom] = await Promise.all([
    getAuth(supabase),
    getChatRoomById(supabase, id),
  ]);
  if (!currentUser || !chatRoom) return notFound();

  const [requester, currentAdminUser] = await Promise.all([
    getUserById(supabase, chatRoom.requester_id),
    getUserById(supabase, currentUser.id),
  ]);
  if (!requester || !currentAdminUser) return notFound();

  return (
    <AdminChatRoom
      chatRoom={chatRoom}
      requester={requester}
      currentUser={currentAdminUser}
    />
  );
}
