import { ROUTES } from "@/constants/url";
import { ReservationTable } from "../reservation-table";
import { Reservation } from "../../types";

interface IAdminReservationListProps {
  data: Reservation[];
  returnQuery: string;
}

export const AdminReservationList = ({
  data,
  returnQuery,
}: IAdminReservationListProps) => {
  const returnQueryParam = returnQuery
    ? `?returnQuery=${encodeURIComponent(returnQuery)}`
    : "";

  const detailHref = (reservationId: string) =>
    `${ROUTES.ADMIN.reservationDetail(reservationId)}${returnQueryParam}`;

  return (
    <ReservationTable
      data={data ?? []}
      isAdmin={true}
      detailHref={detailHref}
    />
  );
};
