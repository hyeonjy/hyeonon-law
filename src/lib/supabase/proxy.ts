import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // 세션 갱신 — getUser() 대신 getClaims()로 JWT 검증
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  // 현재 로그인 상태이면서 경로가 /login 인 경우 홈화면으로 리다이렉트.
  if (user && request.nextUrl.pathname.startsWith("/login")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 로그인하지 않은 상태에서 /reservations/* 접근 시 홈으로 리다이렉트.
  // 단, /reservations/new 페이지는 비로그인 접근 허용.
  const pathname = request.nextUrl.pathname;
  if (
    !user &&
    pathname.startsWith("/reservations") &&
    !pathname.startsWith("/reservations/new")
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 로그인하지 않은 상태에서 /admin/* 경로 접근 시 홈으로 리다이렉트.
  if (!user && request.nextUrl.pathname.startsWith("/admin")) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
