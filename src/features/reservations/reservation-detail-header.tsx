"use client";

import { Reservation } from "@/mocks/reservations";
import { ChevronLeft, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./components/status-badge";
import { ROUTES } from "@/constants/url";

interface IReservationDetailHeaderProps {
  reservation: Reservation;
  isAdmin: boolean;
}

export const ReservationDetailHeader = ({
  reservation,
  isAdmin,
}: IReservationDetailHeaderProps) => {
  const handleEdit = () => {
    console.log("Edit reservation:", reservation.id);
  };

  const handleDelete = () => {
    console.log("Delete reservation:", reservation.id);
  };

  return (
    <>
      {/* 상단: 목록으로 돌아가기 링크 */}
      <Link
        href={ROUTES.RESERVATIONS}
        className="flex items-center gap-2 text-primary-100 hover:text-primary-100/80 mb-8"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="text-base">예약 목록으로 돌아가기</span>
      </Link>

      {/* 하단: 타이틀 + 뱃지 + 액션 버튼 */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-primary-100">
            {reservation.name}
          </h1>
          <StatusBadge status={reservation.status} />
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="text-primary-100 hover:text-white hover:bg-primary-100 bg-transparent cursor-pointer"
            onClick={handleEdit}
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="text-primary-100 hover:text-white hover:bg-primary-100 bg-transparent cursor-pointer"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
