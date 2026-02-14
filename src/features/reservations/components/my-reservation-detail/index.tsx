import { Reservation } from "@/mocks/reservations";
import { ReservationDetailLayout } from "../reservation-detail-layout";

interface MyReservationDetailProps {
  reservation: Reservation;
}

export const MyReservationDetail = ({
  reservation,
}: MyReservationDetailProps) => {
  return <ReservationDetailLayout reservation={reservation} isAdmin={false} />;
};
