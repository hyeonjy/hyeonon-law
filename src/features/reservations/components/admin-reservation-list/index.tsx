import { reservations } from "@/mocks/reservations";
import { ReservationTable } from "../reservation-table";

export const AdminReservationList = () => {
  // TODO: 페이지네이션 구현
  return (
    <>
      <ReservationTable data={reservations} />
    </>
  );
};
