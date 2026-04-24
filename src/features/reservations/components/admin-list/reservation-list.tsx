import { ReservationTable } from "../reservation-table";
import { Reservation } from "../../types";

interface IAdminReservationListProps {
  data: Reservation[];
}

export const AdminReservationList = ({ data }: IAdminReservationListProps) => {
  return <ReservationTable data={data ?? []} isAdmin={true} />;
};
