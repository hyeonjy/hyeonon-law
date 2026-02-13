import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
  {
    id: "01",
    question: "상담비용은 어떻게 되나요?",
    answer:
      '상담 비용은 사건의 유형(형사·민사·행정·기업), 현재 진행 단계, 상담 범위(단순 문의/서류 검토/대응 전략 수립 등)에 따라 달라질 수 있습니다. 예약 시 "내용"란에 사건 개요를 적어주시면 확인 후 상담 가능 범위와 비용을 안내드립니다. ※ 전화/채팅만으로는 정확한 판단이 어려울 수 있으며, 서류 검토가 포함되는 경우 비용이 달라질 수 있습니다.',
  },
  {
    id: "02",
    question: "수임료는 어떻게 문의하나요?",
    answer:
      "수임료는 사건의 난이도, 예상 소요 기간, 진행 방식(합의/소송/행정절차), 필요 인력 및 준비 범위에 따라 개별 산정됩니다. 상담 이후 사건을 검토한 뒤 수임 범위(업무 범위)와 예상 비용을 투명하게 안내드립니다. ※ 수임료 안내 전에도 진행 가능 여부 및 핵심 쟁점은 간단히 설명드리지만, 최종 금액은 자료 확인 후 확정됩니다.",
  },
  {
    id: "03",
    question: "사무실 위치는 어디인가요?",
    answer:
      "사무실 위치는 홈페이지 하단(푸터)의 주소 정보를 참고해 주세요. 방문 상담은 원활한 진행을 위해 사전 예약을 권장드립니다. ※ 방문 전 예약하시면 대기 시간을 줄이고, 사건 자료를 미리 확인해 더 정확한 상담이 가능합니다.",
  },
  {
    id: "04",
    question: "증거목록은 얼마나 준비해야 하나요?",
    answer:
      '"많이"보다 쟁점과 연결되는 핵심 증거를 정리하는 것이 중요합니다. 아래 자료가 있다면 우선 준비해 주세요.\n\n• 사건 경위가 드러나는 대화/문자/메일/녹취\n• 계약서, 영수증, 송금내역, 거래내역 등 객관 자료\n• 상대방 주장과 관련된 통지서, 내용증명, 공문\n• 사건 흐름을 정리한 시간순 메모(언제/어디서/무엇을)\n\n자료가 부족하더라도 상담이 불가능한 것은 아닙니다. 상담 후 사건에 맞춰 추가로 필요한 증거와 수집 방법을 안내해 드립니다. ※ 다만, 불법적으로 수집된 자료는 증거로 사용이 제한될 수 있으니 수집 전 주의가 필요합니다.',
  },
  {
    id: "05",
    question: "상담예약 방법을 알려주세요.",
    answer:
      '상단 메뉴의 상담예약 페이지에서 아래 정보를 입력하면 예약이 완료됩니다.\n\n• 성함 / 연락처 / 이메일 / 사건 내용 / 사건유형 / 상담 날짜·시간 / 개인정보 이용동의\n\n예약 접수 후, 입력하신 연락처 또는 이메일로 확인 안내를 드립니다. ※ 비로그인으로 예약하신 경우, 예약 변경/취소 시 본인 확인이 필요할 수 있습니다. 로그인 후 예약하시면 "내 예약 조회"에서 더 편리하게 관리할 수 있습니다.',
  },
];

export function FAQList() {
  return (
    <Accordion type="single" collapsible className="w-full space-y-4">
      {FAQS.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="border-b border-border"
        >
          <AccordionTrigger className="hover:no-underline py-6 group">
            <div className="flex items-start gap-4 text-left">
              <span className="text-lg font-bold text-secondary-100 shrink-0 pt-0.5">
                {faq.id}
              </span>
              <span className="text-lg font-semibold text-grayscale-500 group-hover:text-primary transition-colors">
                {faq.question}
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pb-6">
            <div className="ml-16 text-grayscale-400 whitespace-pre-line">
              {faq.answer}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
