import { AdminAuthProvider } from "@/components/providers/admin-auth-provider";

export default function AdminChatRoomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminAuthProvider>{children}</AdminAuthProvider>;
}
