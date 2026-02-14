import { Badge } from "@/components/ui/badge";
import { ReservationStatus } from "@/mocks/reservations";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ReservationStatus;
}

const STATUS_COLOR: Record<ReservationStatus, string> = {
  접수: "bg-blue-100 text-blue-800",
  확인중: "bg-yellow-100 text-yellow-800",
  완료: "bg-green-100 text-green-800",
  취소: "bg-grayscale-100 text-grayscale-400",
};

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return (
    <Badge
      className={cn("rounded-md font-medium text-xs", STATUS_COLOR[status])}
    >
      {status}
    </Badge>
  );
};
