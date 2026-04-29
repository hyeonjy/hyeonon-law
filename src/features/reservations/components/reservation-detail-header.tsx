"use client";

import { useActionState, startTransition } from "react";
import { useRouter } from "next/navigation";
import { Reservation } from "@/features/reservations/types";
import { ChevronLeft, Edit2, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "./status-badge";
import { ROUTES } from "@/constants/url";
import { deleteReservationAction } from "@/features/reservations/actions/delete-reservation";
import { ActionState } from "@/features/reservations/actions/delete-reservation/types";
import { ErrorMessage } from "@/components/ui/error-message";

interface IReservationDetailHeaderProps {
  reservation: Reservation;
  isAdmin: boolean;
}

export const ReservationDetailHeader = ({
  reservation,
  isAdmin,
}: IReservationDetailHeaderProps) => {
  const router = useRouter();
  const [state, dispatchAction, isPending] = useActionState(
    (
      _: ActionState | null,
      payload: { reservationId: string; isAdmin: boolean },
    ) => deleteReservationAction(payload.reservationId, payload.isAdmin),
    null,
  );

  const handleEdit = () => {
    const editRoute = isAdmin
      ? ROUTES.ADMIN.reservationEdit(reservation.id)
      : ROUTES.reservationEdit(reservation.id);
    router.push(editRoute);
  };

  const handleDelete = () => {
    startTransition(() => {
      dispatchAction({ reservationId: reservation.id, isAdmin });
    });
  };

  const handleBackClick = () => {
    const returnQuery =
      new URLSearchParams(window.location.search).get("returnQuery") ?? "";
    const normalizedQuery = new URLSearchParams(returnQuery).toString();

    if (normalizedQuery) {
      router.push(`${ROUTES.ADMIN.RESERVATIONS}?${normalizedQuery}`);
      return;
    }

    router.push(ROUTES.ADMIN.RESERVATIONS);
  };

  return (
    <>
      {/* 상단: 목록으로 돌아가기 링크 */}
      {isAdmin ? (
        <button
          type="button"
          onClick={handleBackClick}
          className="flex items-center gap-2 text-primary-100 hover:text-primary-100/80 mb-8 cursor-pointer"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-base">예약 목록으로 돌아가기</span>
        </button>
      ) : (
        <Link
          href={ROUTES.RESERVATIONS}
          className="flex items-center gap-2 text-primary-100 hover:text-primary-100/80 mb-8"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-base">예약 목록으로 돌아가기</span>
        </Link>
      )}

      {/* 에러 메시지 */}
      {state && !state.success && <ErrorMessage>{state.message}</ErrorMessage>}

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
            disabled={isPending}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};
