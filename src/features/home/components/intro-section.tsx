import Image from "next/image";
import { ShieldCheckIcon, FileTextIcon, UsersIcon } from "lucide-react";

const INTRO_DATA = [
  {
    id: 1,
    title: "신속한 초기 대응",
    description:
      "사건 발생 초기부터 신속하게 대응하여 의뢰인의 권리를 보호합니다.",
    icon: ShieldCheckIcon,
    image: "/images/home-intro1.jpg",
  },
  {
    id: 2,
    title: "증거 중심 전략",
    description:
      "철저한 증거 수집과 분석으로 설득력 있는 법적 전략을 수립합니다.",
    icon: FileTextIcon,
    image: "/images/home-intro2.jpg",
  },
  {
    id: 3,
    title: "의뢰인 중심 소통",
    description: "투명하고 신뢰할 수 있는 소통으로 의뢰인과 함께 나아갑니다.",
    icon: UsersIcon,
    image: "/images/home-intro3.jpg",
  },
];

export const IntroSection = () => {
  return (
    <section className="px-4 py-16 md:py-24 bg-grayscale-100">
      <div className="mx-auto max-w-4xl md:h-[540px]">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="italic text-3xl font-medium text-primary-100 mb-2.5 block">
            Introduction
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-100 mb-4">
            현명한 길로 이끄는 현온
          </h2>
          <div className="hidden md:block text-lg font-medium text-grayscale-400 leading-relaxed">
            <p>
              의뢰인의 이익을 최우선으로 하며, 원칙과 증거에 기반한 전략으로
              최선의 결과를 도출합니다.
            </p>
            <p>법무법인 현온은 신뢰감 있는 법무 서비스를 제공합니다.</p>
          </div>
        </div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-8 md:justify-center">
          {INTRO_DATA.map((item) => (
            <div key={item.id} className="flex flex-col">
              <Image
                src={item.image}
                alt={item.title}
                width={277.33}
                height={224}
                className="w-full h-[224px] md:w-[277.33px] mb-6 rounded-sm object-cover"
              />
              {/* Content */}
              <div className="w-full">
                <div className="flex items-center gap-2 mb-2.5">
                  <item.icon className="w-5 h-5 text-secondary-100" />
                  <h3 className="text-xl font-semibold text-black">
                    {item.title}
                  </h3>
                </div>
                <p className="text-base font-medium text-grayscale-400">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
