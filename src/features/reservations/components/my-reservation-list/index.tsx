import { Reservation } from "@/features/reservations/types";
import { ReservationTable } from "../reservation-table";

interface IMyReservationListProps {
  data: Reservation[];
}

export const MyReservationList = ({ data }: IMyReservationListProps) => {
  return (
    <>
      <ReservationTable data={data} />
    </>
  );
};
