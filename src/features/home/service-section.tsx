import {
  BriefcaseIcon,
  FileTextIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

const SERVICES_DATA = [
  {
    number: "01",
    title: "형사",
    description:
      "범죄에 대해 국가가 수사·기소·재판을 통해\n처벌 여부를 판단하는 절차와 관련된 일",
    icon: BriefcaseIcon,
  },
  {
    number: "02",
    title: "민사",
    description:
      "개인(또는 법인) 사이의 권리·의무 관계를\n둘러싼 분쟁과 관련된 일",
    icon: FileTextIcon,
  },
  {
    number: "03",
    title: "행정",
    description:
      "국가·지자체 등 행정기관의 처분이나 부작\n위로 인해 발생한 분쟁과 관련된 일",
    icon: ShieldCheckIcon,
  },
  {
    number: "04",
    title: "기업",
    description:
      "회사 운영 과정에서 발생하는 법률 이슈를\n예방·관리·해결하는 업무",
    icon: UsersIcon,
  },
];

export const ServiceSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="italic text-3xl font-medium text-secondary-100 mb-2.5">
            Service
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-100 mb-4">
            업무분야
          </h2>

          <div className="hidden md:block text-lg font-medium text-grayscale-400">
            <p>
              초기 상담부터 전략 수립, 서면 작성과 절차 대응까지 전 과정에서
              의뢰인과 함께합니다.
            </p>
            <p>사건의 성격에 맞춘 맞춤형 법률 솔루션을 제공합니다.</p>
          </div>
        </div>

        {/* 업무 분야 카드  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.number}
              className="bg-white border border-grayscale-300 rounded-xl px-8 py-10 flex flex-col gap-6 items-center text-center shadow-sm hover:shadow-lg transition-shadow"
            >
              <service.icon className="w-[90px] h-full text-secondary-100 md:mb-5" />
              <h3 className="text-xl font-bold text-primary-100">
                {service.number}. {service.title}
              </h3>
              <p className="text-xs font-medium text-grayscale-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
