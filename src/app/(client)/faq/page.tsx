import { Metadata } from "next";
import { FAQSection } from "@/features/faq";

export const metadata: Metadata = {
  title: "법무법인 현온 | 자주 묻는 질문",
  description: "현온 법무법인에 대해 자주 문의되는 내용을 확인하세요.",
};

export default function FAQPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl leading-[48px] font-bold text-primary-100 mb-6">
          자주 묻는 질문
        </h1>
        <p className="text-lg leading-[28px] text-grayscale-400">
          현온 법무법인에 대해 자주 문의되는 내용을 정리했습니다.
        </p>
      </div>

      <FAQSection />
    </div>
  );
}
