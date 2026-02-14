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

interface ReservationTableProps {
  data: Reservation[];
}

export const ReservationTable = ({ data }: ReservationTableProps) => {
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
              {reservation.name}
            </TableCell>
            <TableCell className="text-grayscale-500">
              {reservation.phone}
            </TableCell>
            <TableCell className="text-grayscale-500">
              {getCaseTypeName(reservation.case_type_id)}
            </TableCell>
            <TableCell className="text-grayscale-500" suppressHydrationWarning>
              {formatDate(reservation.consult_at)}
            </TableCell>
            <TableCell>
              <StatusBadge status={reservation.status} />
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
