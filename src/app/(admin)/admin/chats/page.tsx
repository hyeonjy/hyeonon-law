import { AdminChatList } from "@/features/chat/components/admin-chat-list";

export default function AdminChatPage() {
  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="space-y-2 mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-primary-100">
          채팅 관리
        </h1>
        <p className="text-lg text-grayscale-400">
          사용자와의 실시간 채팅을 관리하실 수 있습니다.
        </p>
      </div>

      <AdminChatList />
    </div>
  );
}
