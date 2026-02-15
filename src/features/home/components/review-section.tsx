const REVIEWS_DATA = [
  {
    id: 1,
    category: "형사 사건",
    content:
      "형사 사건으로 어려움을 겪고 있었는데, 현온 법무법인의 신속한 초기대응과 전문적인 조언으로 좋은 결과를 얻을 수 있었습니다.",
    author: "이OO",
    lawyer: "변호사 김현온",
  },
  {
    id: 2,
    category: "민사 분쟁",
    content:
      "민사 분쟁에서 의뢰인의 입장을 충분히 이해하고, 증거에 기반한 명확한 전략을 제시해 주셨습니다. 매우 만족합니다.",
    author: "박OO",
    lawyer: "변호사 김현온",
  },
  {
    id: 3,
    category: "기업 법무",
    content:
      "기업 법무 자문을 받으면서 투명한 소통과 신뢰할 수 있는 조언이 얼마나 중요한지 알게 되었습니다. 감사합니다.",
    author: "최OO",
    lawyer: "변호사 이채원",
  },
  {
    id: 4,
    category: "행정 소송",
    content:
      "행정 소송에서 어려운 상황이었지만, 현온 팀의 성실한 대응으로 긍정적인 결과를 얻었습니다. 정말 감사합니다.",
    author: "김OO",
    lawyer: "변호사 이채원",
  },
];

export const ReviewSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-grayscale-200">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="italic text-3xl font-semibold text-secondary-100 mb-4">
            Review
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-100">
            의뢰인들의 신뢰와 평가
          </h2>
        </div>

        {/* 의뢰인 리뷰 카드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {REVIEWS_DATA.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-grayscale-300 rounded-[14px] p-6 flex flex-col gap-6 shadow-sm"
            >
              <div>
                <p className="text-base font-semibold text-secondary-100 mb-4">
                  {review.category}
                </p>
                <p className="text-base font-medium text-grayscale-400 leading-[26px] mb-6">
                  {review.content}
                </p>
              </div>

              <div>
                <p className="text-base font-semibold text-primary-100">
                  {review.author}
                </p>
                <p className="text-sm font-medium text-secondary-100">
                  {review.lawyer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
