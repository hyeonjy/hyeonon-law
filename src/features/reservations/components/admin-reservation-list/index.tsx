import { ReservationTable } from "../reservation-table";
import { Reservation } from "../../types";

interface IAdminReservationListProps {
  data: Reservation[];
}

export const AdminReservationList = ({ data }: IAdminReservationListProps) => {
  // TODO: 페이지네이션 구현
  return (
    <>
      <ReservationTable data={data ?? []} isAdmin={true} />
    </>
  );
};
