"use client";

import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReservationStatus } from "@/mocks/reservations";

interface StatusCardProps {
  currentStatus: ReservationStatus;
}

export const StatusCard = ({ currentStatus }: StatusCardProps) => {
  return (
    <Card className="p-8">
      <h2 className="text-2xl font-bold text-primary-100 mb-6">상태 관리</h2>
      <div className="space-y-4">
        <div>
          <p className="text-sm font-semibold text-grayscale-500 mb-2">
            상태 변경
          </p>
          <Select defaultValue={currentStatus}>
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
        <Button className="w-full bg-primary-100 hover:bg-primary-100/90 text-white font-medium h-9">
          상태 저장
        </Button>
      </div>
    </Card>
  );
};
