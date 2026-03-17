"use client";

import { createSupabaseClient } from "@/lib/supabase/client";
import { useEffect, useMemo, useState } from "react";

export function AdminAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const bootstrapSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session?.access_token) {
        if (isMounted) setIsReady(true);
        return;
      }

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase.auth.refreshSession();
        if (data.session?.access_token) {
          if (isMounted) setIsReady(true);
          return;
        }
      }

      if (isMounted) {
        // 비정상 상태에서 UI 영구 블로킹을 피하기 위해 fail-open
        setIsReady(true);
      }
    };

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      if (!isMounted) return;
      setIsReady(!!session?.access_token);
    });

    void bootstrapSession();

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [supabase]);

  if (!isReady) return null;

  return <>{children}</>;
}
