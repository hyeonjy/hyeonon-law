import { createSupabaseServer } from "@/lib/supabase/server";
import { getAuth } from "@/features/users/services/get-auth";
import { getUserById } from "@/features/users/services/get-user-by-id";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createSupabaseServer();

  // 로그인 여부 체크 및 userId를 가져오기 위해 호출
  const user = await getAuth(supabase);
  if (!user) {
    redirect("/");
  }

  // users 테이블에서 is_admin 확인
  const userInfo = await getUserById(supabase, user.id);
  if (!userInfo?.is_admin) {
    redirect("/");
  }

  return <>{children}</>;
}
