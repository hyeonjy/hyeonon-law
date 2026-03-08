import { AnonymousAuthProvider } from "@/components/providers/anonymous-auth-provider";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AnonymousAuthProvider>{children}</AnonymousAuthProvider>;
}
