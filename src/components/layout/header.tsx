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
import { BaseButton } from "../ui/base-button";
import { LogoutButton } from "@/features/auth/components/logout";
import { createSupabaseServer } from "@/lib/supabase/server";
import { getAuth } from "@/features/users/services/get-auth";
import { getUserById } from "@/features/users/services/get-user-by-id";
import { redirect } from "next/navigation";

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

export async function Header() {
  let user = null;
  try {
    // 1. Supabase 서버 클라이언트 생성 후 인증 여부 확인
    const supabase = await createSupabaseServer();
    const authUser = await getAuth(supabase);
    // 2. 인증된 경우 유저 정보 조회 (익명 로그인은 null 처리)
    user =
      authUser && !authUser.is_anonymous
        ? await getUserById(supabase, authUser.id)
        : null;
  } catch (error) {
    console.error("인증 정보를 가져오는데 실패했습니다:", error);
    user = null;
  }
  const isLoggedIn = !!user;

  return (
    <header className="fixed top-0 left-0 z-10 w-full border-b border-grayscale-300 bg-white">
      <div className="mx-auto flex h-[64px] max-w-[1216px] items-center justify-between px-4 xl:px-0">
        {/* 좌측: 로고 */}
        <Logo />

        {/* 중앙: 메인 네비게이션 (데스크탑) */}
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-base text-grayscale-500"
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
              <button className="cursor-pointer h-8 rounded-lg border-grayscale-300 bg-grayscale-100 px-4 py-1 text-sm font-medium text-grayscale-500 hover:bg-gray-100">
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
    <span className="text-base font-semibold leading-6 text-primary-100">
      법무법인 현온
    </span>
  </Link>
);

type DbUser = {
  id: string;
  name: string | null;
  avatar_url: string | null;
  is_admin: boolean;
};

const UserDropDown = ({ user }: { user: DbUser }) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger className="cursor-pointer flex items-center gap-2 outline-none">
      <Avatar className="size-[30px]">
        <AvatarImage src={user.avatar_url || ""} alt={user.name || "User"} />
        <AvatarFallback>{user.name?.[0] || "U"}</AvatarFallback>
      </Avatar>
      <span className="text-[15px] font-normal text-black">{user.name}</span>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" className="w-[160px]">
      {USER_MENUS(user.is_admin).map((menu) => (
        <Link key={menu.href} href={menu.href}>
          <DropdownMenuItem className="cursor-pointer">
            {menu.label}
          </DropdownMenuItem>
        </Link>
      ))}
      <DropdownMenuItem className="cursor-pointer" asChild>
        <LogoutButton className="w-full hover:bg-accent hover:text-accent-foreground" />
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

const MobileMenu = ({ user }: { user: DbUser | null }) => (
  <div className="md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex items-center justify-center p-2">
          <Menu className="cursor-pointer size-6 text-grayscale-500" />
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
            <SheetClose asChild>
              <Scale className="cursor-pointer w-6 h-6 text-secondary-100" />
            </SheetClose>
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
              <SheetClose asChild key={item.label}>
                <Link
                  href={item.href}
                  className="text-base font-medium text-grayscale-500"
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>

          {/* 모바일 사용자 영역 */}
          <div className="mt-8">
            {user ? (
              <div className="flex flex-col gap-4 border-t border-gray-200 pt-4">
                <div className="flex flex-col gap-2 pl-2">
                  {USER_MENUS(user.is_admin).map((menu) => (
                    <SheetClose asChild key={menu.label}>
                      <Link
                        href={menu.href}
                        className="py-2 text-base text-gray-600 hover:text-primary-100"
                      >
                        {menu.label}
                      </Link>
                    </SheetClose>
                  ))}
                  <SheetClose asChild>
                    <div>
                      <LogoutButton className="py-2 text-left text-base text-gray-600 hover:text-primary-100" />
                    </div>
                  </SheetClose>
                </div>
              </div>
            ) : (
              <SheetClose asChild>
                <Link href={ROUTES.LOGIN} className="block w-full">
                  <BaseButton label="로그인" />
                </Link>
              </SheetClose>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  </div>
);
