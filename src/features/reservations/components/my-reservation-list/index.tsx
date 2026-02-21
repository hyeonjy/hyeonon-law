import { Reservation } from "@/features/reservations/types";
import { ReservationTable } from "../reservation-table";

interface IMyReservationListProps {
  data: Reservation[];
}

export const MyReservationList = ({ data }: IMyReservationListProps) => {
  // TODO: 페이지네이션 구현
  return (
    <>
      <ReservationTable data={data} />
    </>
  );
};
