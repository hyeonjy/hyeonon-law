import { Button } from "@/components/ui/button";
import {
  clearFiltersAction,
  saveFiltersAction,
} from "@/features/reservations/actions/set-reservation-filters";
import { RESERVATION_STATUS_OPTIONS } from "@/features/reservations/constants/admin-list";
import { ReservationListFilters } from "@/features/reservations/services/admin/get-reservations";
import { caseTypes } from "@/mocks/case_types";
import { RotateCcw, Search } from "lucide-react";

interface ReservationFilterFormProps {
  filters: ReservationListFilters;
  idPrefix: string;
  className?: string;
}

function createFieldId(idPrefix: string, fieldName: string) {
  return `${idPrefix}-${fieldName}`;
}

export function ReservationFilterForm({
  filters,
  idPrefix,
  className,
}: ReservationFilterFormProps) {
  const nameId = createFieldId(idPrefix, "name");
  const phoneId = createFieldId(idPrefix, "phone");
  const caseTypeId = createFieldId(idPrefix, "caseTypeId");
  const consultDateId = createFieldId(idPrefix, "consultDate");
  const statusId = createFieldId(idPrefix, "status");

  return (
    <form action={saveFiltersAction} className={className}>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div className="space-y-1">
          <label htmlFor={nameId} className="text-xs font-semibold text-grayscale-400">
            예약자명
          </label>
          <input
            id={nameId}
            name="name"
            type="text"
            defaultValue={filters.name}
            placeholder="예약자명 검색"
            className="h-11 w-full rounded-xl border border-grayscale-200 bg-grayscale-100 px-3 text-sm font-medium text-grayscale-500 outline-none transition-colors placeholder:text-grayscale-400 focus:border-primary-100 focus:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={phoneId} className="text-xs font-semibold text-grayscale-400">
            전화번호
          </label>
          <input
            id={phoneId}
            name="phone"
            defaultValue={filters.phone}
            placeholder="전화번호 검색"
            className="h-11 w-full rounded-xl border border-grayscale-200 bg-grayscale-100 px-3 text-sm font-medium text-grayscale-500 outline-none transition-colors placeholder:text-grayscale-400 focus:border-primary-100 focus:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={caseTypeId} className="text-xs font-semibold text-grayscale-400">
            사건유형
          </label>
          <select
            id={caseTypeId}
            name="caseTypeId"
            defaultValue={filters.caseTypeId ?? ""}
            className="h-11 w-full rounded-xl border border-grayscale-200 bg-grayscale-100 px-3 text-sm font-medium text-grayscale-500 outline-none transition-colors focus:border-primary-100 focus:bg-white"
          >
            <option value="">전체</option>
            {caseTypes.map((caseType) => (
              <option key={caseType.id} value={caseType.id}>
                {caseType.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor={consultDateId}
            className="text-xs font-semibold text-grayscale-400"
          >
            상담날짜
          </label>
          <input
            id={consultDateId}
            name="consultDate"
            type="date"
            defaultValue={filters.consultDate}
            className="h-11 w-full rounded-xl border border-grayscale-200 bg-grayscale-100 px-3 text-sm font-medium text-grayscale-500 outline-none transition-colors focus:border-primary-100 focus:bg-white"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={statusId} className="text-xs font-semibold text-grayscale-400">
            상태
          </label>
          <select
            id={statusId}
            name="status"
            defaultValue={filters.status ?? ""}
            className="h-11 w-full rounded-xl border border-grayscale-200 bg-grayscale-100 px-3 text-sm font-medium text-grayscale-500 outline-none transition-colors focus:border-primary-100 focus:bg-white"
          >
            <option value="">전체</option>
            {RESERVATION_STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5 flex justify-end gap-2">
        <Button
          type="submit"
          size="sm"
          className="h-10 cursor-pointer rounded-xl bg-primary-100 px-4 text-white hover:bg-primary-200"
        >
          <Search className="h-4 w-4" />
          검색
        </Button>
        <Button
          type="submit"
          formAction={clearFiltersAction}
          variant="ghost"
          size="sm"
          className="h-10 cursor-pointer rounded-xl border border-grayscale-200 bg-white px-4 text-grayscale-500 hover:bg-grayscale-100 hover:text-primary-100"
        >
          <RotateCcw className="h-4 w-4" />
          초기화
        </Button>
      </div>
    </form>
  );
}
