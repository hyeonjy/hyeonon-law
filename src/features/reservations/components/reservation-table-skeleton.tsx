import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SKELETON_ROWS = [1, 2, 3, 4, 5];

export function ReservationTableSkeleton() {
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
        {SKELETON_ROWS.map((row) => (
          <TableRow key={row} className="border-grayscale-300">
            <TableCell>
              <div className="h-[23px] w-[63px] rounded bg-grayscale-300 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-[23px] w-[120px] rounded bg-grayscale-300 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-[23px] w-[65px] rounded bg-grayscale-300 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-[23px] w-[134px] rounded bg-grayscale-300 animate-pulse" />
            </TableCell>
            <TableCell>
              <div className="h-[23px] w-[61px] rounded-full bg-grayscale-300 animate-pulse" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
