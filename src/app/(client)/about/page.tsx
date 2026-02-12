import About from "@/features/about";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "법무법인 현온 | 변호사 소개",
  description:
    "현온, 현명한 판단으로 평정을 세웁니다. 원칙과 증거에 기반해 흔들림 없는 해답을 제시합니다.",
};

export default function AboutPage() {
  return <About />;
}
