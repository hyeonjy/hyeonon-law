import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Reservation } from "@/mocks/reservations";
import { caseTypes } from "@/mocks/case_types";

import { formatDate } from "date-fns";
import { ko } from "date-fns/locale";
import { ReservationDetailHeader } from "./reservation-detail-header";

interface ReservationDetailLayoutProps {
  reservation: Reservation;
  isAdmin?: boolean;
}

export const ReservationDetailLayout = ({
  reservation,
  isAdmin = false,
}: ReservationDetailLayoutProps) => {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <ReservationDetailHeader reservation={reservation} isAdmin={isAdmin} />

      <div className="space-y-6">
        <BasicInfoCard reservation={reservation} />
        <ConsultationInfoCard reservation={reservation} />

        {/* 관리자 전용 섹션: isAdmin이 true일 때만 렌더링 */}
        {isAdmin && (
          <>{/* TODO: StatusAdminCard currentStatus={reservation.status} */}</>
        )}
      </div>
    </div>
  );
};

// --- 하위 컴포넌트 ---
const BasicInfoCard = ({ reservation }: { reservation: Reservation }) => {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-primary-100 mb-6">기본 정보</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-grayscale-400 mb-1">성함</p>
            <p className="text-lg text-grayscale-500 font-semibold">
              {reservation.name}
            </p>
          </div>
          <div>
            <p className="text-sm text-grayscale-400 mb-1">연락처</p>
            <p className="text-lg text-grayscale-500 font-semibold">
              {reservation.phone}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-grayscale-400 mb-1">이메일</p>
          <p className="text-lg text-grayscale-500 font-semibold">
            {reservation.email}
          </p>
        </div>
      </div>
    </Card>
  );
};

const ConsultationInfoCard = ({
  reservation,
}: {
  reservation: Reservation;
}) => {
  // case_type_id로 caseType 이름 찾기
  const caseTypeName =
    caseTypes.find((ct) => ct.id === reservation.case_type_id)?.name || "기타";

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-primary-100 mb-6">상담 정보</h2>
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-grayscale-400 mb-1">사건유형</p>
            <p className="text-lg text-grayscale-500 font-semibold">
              {caseTypeName}
            </p>
          </div>
          <div>
            <p className="text-sm text-grayscale-400 mb-1">상담날짜</p>
            <p className="text-lg text-grayscale-500 font-semibold">
              {reservation.consult_at
                ? formatDate(new Date(reservation.consult_at), "PPP", {
                    locale: ko,
                  })
                : "-"}
            </p>
          </div>
        </div>
        <div>
          <p className="text-sm text-grayscale-400 mb-1">상담시간</p>
          <p className="text-lg text-grayscale-500 font-semibold">
            {reservation.consult_at
              ? formatDate(new Date(reservation.consult_at), "HH:mm", {
                  locale: ko,
                })
              : "-"}
          </p>
        </div>
        <div>
          <p className="text-sm text-grayscale-400 mb-1">상담 내용</p>
          <p className="text-lg text-grayscale-500 font-semibold whitespace-pre-wrap">
            {reservation.content}
          </p>
        </div>
      </div>
    </Card>
  );
};
