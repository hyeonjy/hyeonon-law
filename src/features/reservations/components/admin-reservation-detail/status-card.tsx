"use client";

import { useActionState, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReservationStatus } from "@/features/reservations/types";
import { updateReservationStatusAction } from "@/features/reservations/actions/update-reservation-status";
import { ErrorMessage } from "@/components/ui/error-message";

interface StatusCardProps {
  reservationId: string;
  currentStatus: ReservationStatus;
}

export const StatusCard = ({
  reservationId,
  currentStatus,
}: StatusCardProps) => {
  const [selectedStatus, setSelectedStatus] = useState<string>(currentStatus);
  const [state, formAction, isPending] = useActionState(
    updateReservationStatusAction,
    null,
  );

  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-primary-100 mb-6">상태 관리</h2>
      <form action={formAction}>
        <input type="hidden" name="id" value={reservationId} />
        <input type="hidden" name="status" value={selectedStatus} />
        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-grayscale-500 mb-2">
              상태 변경
            </p>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="상태 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="접수">접수</SelectItem>
                <SelectItem value="확인중">확인중</SelectItem>
                <SelectItem value="완료">완료</SelectItem>
                <SelectItem value="취소">취소</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-primary-100 hover:bg-primary-100/90 text-white font-medium h-9"
          >
            {isPending ? "저장 중..." : "상태 저장"}
          </Button>

          {/* 성공 메시지 */}
          {state && state.success && state.message && (
            <p className="text-sm text-green-600">{state.message}</p>
          )}

          {/* 서버 에러 메시지 */}
          {state && !state.success && state.message && (
            <ErrorMessage>{state.message}</ErrorMessage>
          )}
        </div>
      </form>
    </Card>
  );
};
