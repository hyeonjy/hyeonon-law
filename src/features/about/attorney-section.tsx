import Image from "next/image";

const ATTORNEYS = [
  {
    name: "김현온",
    position: "수석 변호사",
    image: "/images/about-attorney1.jpg",
    career: "한국대학교 법학과 졸업, 사법시험 합격(38회)",
    expertise: "형사사건, 민사사건, 기업법무",
    description:
      "20년 이상의 법무 경험으로 신뢰감 있고 신속한 초기 대응이 특징입니다. 증거 중심의 전략으로 최선의 결과를 도출하며, 의뢰인과의 투명한 소통을 최우선으로 생각합니다.",
  },
  {
    name: "이채원",
    position: "변호사",
    image: "/images/about-attorney2.jpg",
    career: "한국대학교 법학과 졸업, 사법시험 합격(42회)",
    expertise: "기업법무, 행정소송, 계약법",
    description:
      "기업의 법적 리스크 관리와 행정절차에 대한 전문 지식으로 체계적이고 창의적인 해결책을 제시합니다. 의뢰인의 비즈니스 목표를 이해하고 이를 달성하기 위한 최적의 법적 전략을 수립합니다.",
  },
];

export function AttorneySection() {
  return (
    <section className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 gap-2.5">
          <span className="italic text-3xl font-normal text-secondary-100">
            Attorney
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-100">
            변호사 소개
          </h2>
        </div>

        {/* 변호사 소개 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {ATTORNEYS.map((attorney) => (
            <div key={attorney.name} className="flex flex-col">
              <div className="relative h-96 overflow-hidden rounded-lg mb-6">
                <Image
                  src={attorney.image}
                  alt={`${attorney.name} 변호사 프로필`}
                  fill
                  className="object-cover object-[50%_10%] md:object-[50%_5%]"
                />
              </div>

              {/* 이름 및 직책 */}
              <h3 className="text-2xl font-bold text-primary-100 mb-2">
                {attorney.name}
              </h3>
              <p className="text-secondary-100 font-semibold mb-4">
                {attorney.position}
              </p>

              {/* 약력 및 전문분야 */}
              <div className="space-y-4 text-grayscale-400">
                <p>
                  <span className="font-semibold text-primary-100">약력:</span>{" "}
                  {attorney.career}
                </p>
                <p>
                  <span className="font-semibold text-primary-100">
                    전문분야:
                  </span>{" "}
                  {attorney.expertise}
                </p>
                <p>{attorney.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
