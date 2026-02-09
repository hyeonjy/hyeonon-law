import Link from "next/link";
import { ROUTES } from "@/constants/url";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, Scale, X } from "lucide-react";
import { User, users } from "@/mocks/users";
import { BaseButton } from "../ui/base-button";

// 1. 네비게이션 데이터 정의
const NAV_ITEMS = [
  { label: "소개", href: ROUTES.ABOUT },
  { label: "자주묻는질문", href: ROUTES.FAQ },
  { label: "상담예약", href: ROUTES.RESERVATION_NEW },
];

// 2. 권한별 메뉴 아이템 추출 (데스크톱/모바일 공용)
const USER_MENUS = (isAdmin: boolean) =>
  isAdmin
    ? [
        { label: "예약 조회", href: ROUTES.ADMIN.RESERVATIONS },
        { label: "채팅 조회", href: ROUTES.ADMIN.CHATS },
      ]
    : [{ label: "예약 조회", href: ROUTES.RESERVATIONS }];

export function Header() {
  // FIXME: 인증 기능 구현 전까지 임시로 사용할 사용자 상태
  // null: 로그아웃 상태
  // users[0]: 관리자 로그인 상태
  // users[1]: 일반 사용자 로그인 상태
  const user = users[0];
  const isLoggedIn = !!user;

  return (
    <header className="w-full border-b border-grayscale-300 bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1216px] items-center justify-between px-4 xl:px-0">
        {/* 좌측: 로고 */}
        <Logo />

        {/* 중앙: 메인 네비게이션 (데스크탑) */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-pretendard text-base text-grayscale-500"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* 우측: 사용자 영역 (데스크탑) */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <UserDropDown user={user} />
          ) : (
            <Link href={ROUTES.LOGIN}>
              <button className="h-8 rounded-lg border-grayscale-300 bg-grayscale-100 px-4 py-1 text-sm font-medium text-grayscale-500 hover:bg-gray-100">
                로그인
              </button>
            </Link>
          )}
        </div>

        {/* 모바일 메뉴 */}
        <MobileMenu user={user} />
      </div>
    </header>
  );
}

// --- 하위 컴포넌트들 ---

const Logo = () => (
  <Link href={ROUTES.HOME} className="flex items-center gap-2">
    {/* 로고 아이콘 자리 (SVG) */}
    <Scale className="w-6 h-6 text-secondary-100" />
    <span className="font-pretendard text-base font-semibold leading-6 text-primary-100">
      법무법인 현온
    </span>
  </Link>
);

const UserDropDown = ({ user }: { user: User }) => (
  <DropdownMenu>
    <DropdownMenuTrigger className="flex items-center gap-2 outline-none">
      <Avatar className="size-[30px]">
        <AvatarImage src={user.avatar_url || ""} alt={user.name || "User"} />
        <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <span className="font-pretendard text-[15px] font-normal text-black">
        {user.name}
      </span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[160px]">
      {USER_MENUS(user.is_admin).map((menu) => (
        <DropdownMenuItem key={menu.href}>
          <Link href={menu.href}>{menu.label}</Link>
        </DropdownMenuItem>
      ))}
      <DropdownMenuItem className="cursor-pointer">로그아웃</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const MobileMenu = ({ user }: { user: User | null }) => (
  <div className="md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center p-2">
          <Menu className="size-6 text-grayscale-500" />
          <span className="sr-only">메뉴 열기</span>
        </button>
      </SheetTrigger>
      <SheetContent
        side="top"
        className="flex flex-col p-0"
        showCloseButton={false}
      >
        <SheetHeader className="flex h-[64px] flex-row items-center justify-between px-4 border-b border-grayscale-300">
          <SheetTitle>
            <Scale className="w-6 h-6 text-secondary-100" />
          </SheetTitle>
          <SheetDescription className="sr-only">
            아래 메뉴를 선택해주세요.
          </SheetDescription>
          <SheetClose className="cursor-pointer rounded-sm opacity-70 transition-opacity hover:opacity-100">
            <X className="h-6 w-6 text-grayscale-500" />
            <span className="sr-only">Close</span>
          </SheetClose>
        </SheetHeader>

        <div className="flex flex-col flex-1 px-4 py-6">
          <nav className="flex flex-col gap-8">
            {NAV_ITEMS.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="font-pretendard text-base font-medium text-grayscale-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* 모바일 사용자 영역 */}
          <div className="mt-8">
            {user ? (
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-4">
                <div className="flex flex-col gap-2 pl-2">
                  {USER_MENUS(user.is_admin).map((menu) => (
                    <Link
                      key={menu.label}
                      href={menu.href}
                      className="py-2 text-base text-gray-600"
                    >
                      {menu.label}
                    </Link>
                  ))}
                  <button className="py-2 text-left text-base text-gray-600">
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <Link href={ROUTES.LOGIN} className="block w-full">
                <BaseButton label="로그인" />
              </Link>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
);
