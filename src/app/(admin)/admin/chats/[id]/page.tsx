import { AdminChatRoom } from "@/features/chat/components/admin-chat-room";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminChatRoomPage({ params }: PageProps) {
  const { id } = await params;
  return <AdminChatRoom roomId={id} />;
}
