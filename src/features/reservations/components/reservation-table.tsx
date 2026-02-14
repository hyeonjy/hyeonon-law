import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Reservation } from "@/mocks/reservations";
import { caseTypes } from "@/mocks/case_types";
import { StatusBadge } from "./status-badge";
import Link from "next/link";
import { ROUTES } from "@/constants/url";

interface IReservationTableProps {
  data: Reservation[];
}

export const ReservationTable = ({ data }: IReservationTableProps) => {
  const getCaseTypeName = (id: string) => {
    return caseTypes.find((type) => type.id === id)?.name || "미정";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    // Format: 2024. 2. 15. 14:00
    return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}. ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <Table>
      <TableHeader className="bg-grayscale-200">
        <TableRow className="hover:bg-grayscale-200 border-grayscale-300">
          <TableHead className="text-grayscale-500 font-bold">
            예약자명
          </TableHead>
          <TableHead className="text-grayscale-500 font-bold">연락처</TableHead>
          <TableHead className="text-grayscale-500 font-bold">
            사건유형
          </TableHead>
          <TableHead className="text-grayscale-500 font-bold">
            상담일시
          </TableHead>
          <TableHead className="text-grayscale-500 font-bold">상태</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((reservation) => (
          <TableRow
            key={reservation.id}
            className="border-grayscale-300 hover:bg-grayscale-200/50"
          >
            <TableCell className="font-semibold text-primary-100">
              <Link
                href={ROUTES.reservationDetail(reservation.id)}
                className="block w-full"
              >
                {reservation.name}
              </Link>
            </TableCell>
            <TableCell className="text-grayscale-500">
              <Link
                href={ROUTES.reservationDetail(reservation.id)}
                className="block w-full"
              >
                {reservation.phone}
              </Link>
            </TableCell>
            <TableCell className="text-grayscale-500">
              <Link
                href={ROUTES.reservationDetail(reservation.id)}
                className="block w-full"
              >
                {getCaseTypeName(reservation.case_type_id)}
              </Link>
            </TableCell>
            <TableCell className="text-grayscale-500" suppressHydrationWarning>
              <Link
                href={ROUTES.reservationDetail(reservation.id)}
                className="block w-full"
              >
                {formatDate(reservation.consult_at)}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={ROUTES.reservationDetail(reservation.id)}
                className="block w-full"
              >
                <StatusBadge status={reservation.status} />
              </Link>
            </TableCell>
          </TableRow>
        ))}
        {data.length === 0 && (
          <TableRow>
            <TableCell
              colSpan={5}
              className="h-24 text-center text-grayscale-400"
            >
              예약 내역이 없습니다.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
