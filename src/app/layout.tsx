import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.className} antialiased`}>
        <Header />
        <main className="pt-[65px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
