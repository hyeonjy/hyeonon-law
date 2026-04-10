import type { Metadata } from "next";
import localFont from "next/font/local";
import { cookies } from "next/headers";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FloatingChatButton } from "@/components/layout/floating-chat-button";
import { FlashToast } from "@/components/ui/flash-toast";
import { TOAST } from "@/constants/flash-toast";

const pretendard = localFont({
  src: "../fonts/PretendardVariable.woff2",
  display: "swap",
  weight: "100 900",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "법무법인 현온",
  description:
    "현명한 길로 이끄는 법무법인 현온. 각 분야별 전문 변호사들이 깊이 있는 통찰력으로 최적의 법률 솔루션을 제시합니다.",
  icons: {
    icon: "/icons/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 쿠키를 읽어, redirect 직후의 1회성 토스트 값 전달.
  const cookieStore = await cookies();
  const toastValue = cookieStore.get(TOAST.COOKIE_NAME)?.value ?? null;

  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <Header />
        <FlashToast toastValue={toastValue} />
        <main className="pt-[65px]">{children}</main>
        <Footer />
        <FloatingChatButton />
      </body>
    </html>
  );
}
