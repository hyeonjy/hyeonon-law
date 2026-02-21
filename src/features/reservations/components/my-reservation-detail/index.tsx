import { Reservation } from "@/features/reservations/types";
import { ReservationDetailLayout } from "../reservation-detail-layout";

interface MyReservationDetailProps {
  reservation: Reservation;
}

export const MyReservationDetail = ({
  reservation,
}: MyReservationDetailProps) => {
  return <ReservationDetailLayout reservation={reservation} isAdmin={false} />;
};
