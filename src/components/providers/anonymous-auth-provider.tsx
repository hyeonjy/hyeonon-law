"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useMemo } from "react";

export function AnonymousAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;

    const ensureUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        return;
      }

      const { data, error: signInError } =
        await supabase.auth.signInAnonymously();

      if (signInError) {
        console.error("익명 로그인 실패:", signInError);
        return;
      }

      if (isMounted) {
        // 서버 컴포넌트가 새 세션 쿠키를 반영하도록 갱신
        router.refresh();
      }
    };

    ensureUser();
    return () => {
      isMounted = false;
    };
  }, [router, supabase.auth]);

  return <>{children}</>;
}
