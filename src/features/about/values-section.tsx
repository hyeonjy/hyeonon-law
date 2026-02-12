import { CheckCircle, FileText, Heart, Shield, Users, Zap } from "lucide-react";

const VALUES = [
  {
    title: "원칙 준수",
    items: [
      "법치주의와 윤리 기반의 서비스 제공",
      "어떤 상황에서도 원칙 타협 없음",
      "정직과 진실을 최우선",
    ],
    icon: Shield,
  },
  {
    title: "증거 기반 전략",
    items: [
      "철저한 사실 조사와 증거 분석",
      "설득력 있는 법적 전략 수립",
      "감정이 아닌 증거 중심 대응",
    ],
    icon: FileText,
  },
  {
    title: "투명한 소통",
    items: [
      "법적 상황 명확한 설명",
      "예상 결과와 리스크 솔직 안내",
      "모든 과정을 함께 진행",
    ],
    icon: Users,
  },
  {
    title: "신속한 대응",
    items: [
      "사건 초기 신속한 초기 대응",
      "골든타임을 놓치지 않는 대응",
      "의뢰인 권리 신속한 보호",
    ],
    icon: Zap,
  },
  {
    title: "의뢰인 중심",
    items: [
      "의뢰인의 이익 최우선",
      "개인의 상황 충분히 이해",
      "최상의 결과 도출 노력",
    ],
    icon: Heart,
  },
  {
    title: "끝까지의 책임",
    items: [
      "사건 시작부터 종료까지 책임",
      "모든 절차 성실하게 진행",
      "책임감 있는 최종 완성",
    ],
    icon: CheckCircle,
  },
];

export function ValuesSection() {
  return (
    <section className="py-24 px-4 bg-grayscale-100">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-16 gap-2.5">
          <span className="italic text-3xl font-normal text-secondary-100">
            Values
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-100">
            현온의 핵심가치
          </h2>
        </div>

        {/* 가치관 - 그리드 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((value) => (
            <div
              key={value.title}
              className="flex flex-col gap-6 bg-white rounded-[14px] border border-grayscale-300 p-8 shadow-sm hover:shadow-lg transition-shadow"
            >
              <value.icon className="w-12 h-12 mb-2 text-secondary-100" />

              <h3 className="text-2xl font-bold text-primary-100 mb-1">
                {value.title}
              </h3>

              <ul className="space-y-3 text-muted-foreground text-sm">
                {value.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-[14px] font-bold text-secondary-100">
                      •
                    </span>
                    <span className="text-[14px] font-normal text-grayscale-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
