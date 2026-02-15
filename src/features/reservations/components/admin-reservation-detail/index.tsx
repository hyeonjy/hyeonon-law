import { Reservation } from "@/mocks/reservations";
import { ReservationDetailLayout } from "../reservation-detail-layout";

interface IAdminReservationDetailProps {
  reservation: Reservation;
}

export const AdminReservationDetail = ({
  reservation,
}: IAdminReservationDetailProps) => {
  return <ReservationDetailLayout reservation={reservation} isAdmin={true} />;
};
