export function InquiryBanner() {
  return (
    <div className="flex flex-col gap-6 mt-12 w-full bg-grayscale-200 border border-grayscale-300 p-8 rounded-xl shadow-sm">
      <h3 className="text-2xl font-bold text-primary-100 mb-4">
        더 궁금한 사항이 있으신가요?
      </h3>
      <p className="text-grayscale-400 text-base leading-[24px] mb-6">
        위 내용 외에 추가 질문이 있으시면 상단의 &quot;상담예약&quot; 메뉴에서
        문의사항을 남겨주시거나, 우측 하단의 채팅 버튼을 통해 실시간으로
        문의하실 수 있습니다.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <div>
          <p className="text-base leading-[24px] text-primary-100 font-semibold mb-1">
            전화
          </p>
          <p className="text-base leading-[24px] text-grayscale-400">
            02-1234-5678
          </p>
        </div>
        <div>
          <p className="text-base leading-[24px] text-primary-100 font-semibold mb-1">
            상담시간
          </p>
          <p className="text-base leading-[24px] text-grayscale-400">
            평일 10:00~18:00 (점심 12:00~13:00)
          </p>
        </div>
      </div>
    </div>
  );
}
