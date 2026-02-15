import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-96 md:h-[600px] overflow-hidden">
      <Image
        src="/images/about-banner.jpg"
        alt="법무법인 현온 배너"
        fill
        className="object-cover object-[50%_57%]"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative flex flex-col items-center justify-center h-full text-white px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
          현온, 현명한 판단으로 평정을 세웁니다.
        </h1>
        <p className="text-lg md:text-xl font-normal text-center opacity-90">
          원칙과 증거에 기반해 흔들림 없는 해답을 제시합니다.
        </p>
      </div>
    </section>
  );
}
