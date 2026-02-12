import Image from "next/image";
import React from "react";

export const HeroSection = () => {
  return (
    <section className="relative w-full h-[600px] overflow-hidden">
      {/* 법무법인 배경 이미지 */}
      <Image
        src="/images/home-banner.jpg"
        alt="법무법인 현온 메인 배너"
        fill
        className="object-cover object-[50%_30%]"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* Container */}
      <div className="relative h-full container mx-auto flex flex-col items-center justify-center text-white px-4">
        {/* Heading 1 */}
        <h1 className="mb-4 text-3xl md:text-5xl font-bold leading-tight text-center">
          현온의 법무 법인 홈페이지 샘플 입니다.
        </h1>

        {/* Subtext */}
        <p className="text-md md:text-xl font-medium leading-relaxed text-center opacity-90">
          형사·민사·행정·기업 사건, 원칙과 증거로 답합니다.
        </p>
      </div>
    </section>
  );
};
