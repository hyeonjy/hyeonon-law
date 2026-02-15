import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { ROUTES } from "@/constants/url";

interface IChatHeaderProps {
  isAdmin?: boolean;
  title?: string;
}

export function ChatHeader({ isAdmin = false, title }: IChatHeaderProps) {
  return (
    <>
      <header className="fixed top-[65px] w-full z-10 flex h-14 items-center border-b bg-white ">
        <div className="flex items-center max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {isAdmin && (
            <Link href={ROUTES.ADMIN.CHATS} className="mr-3">
              <ChevronLeft className="h-6 w-6 text-gray-900" />
            </Link>
          )}
          <h1 className="text-lg font-bold text-gray-900">
            {isAdmin ? title : "현온 상담 채팅"}
          </h1>
        </div>
      </header>

      <div className="fixed top-[121px] w-full z-10 bg-secondary-300 border-b border-secondary-100/20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm text-primary-100">
            <strong>상담 가능 시간:</strong> 평일 10:00~18:00 (점심 12:00~13:00)
            운영 시간 외 문의는 순차적으로 답변드립니다.
          </p>
        </div>
      </div>
    </>
  );
}
