"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Label from "@/components/ui/label";
import { ErrorMessage } from "@/components/ui/error-message";

interface IDateFieldProps {
  label: string;
  value?: Date;
  onChange: (date: Date | undefined) => void;
  error?: string;
}

export function DateField({ label, value, onChange, error }: IDateFieldProps) {
  const [open, setOpen] = useState(false);

  const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6; // 일요일(0) 또는 토요일(6)
  };

  const isPastDate = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const handleDateSelect = (date: Date | undefined) => {
    onChange(date);
    setOpen(false); // 날짜 선택 시 Popover 닫기
  };

  return (
    <div className="w-full relative">
      <Label htmlFor={label} showIcon>
        {label}
      </Label>

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="h-9 w-full rounded-lg border border-grayscale-200 bg-white/[0.002] px-3 text-left text-sm text-grayscale-500 shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] outline-none focus:shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]"
          >
            {value ? (
              format(value, "PPP", { locale: ko })
            ) : (
              <span className="text-grayscale-400">날짜를 선택해주세요</span>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={handleDateSelect}
            disabled={(date) => isPastDate(date) || isWeekend(date)}
            locale={ko}
          />
        </PopoverContent>
      </Popover>

      {error && (
        <div className="absolute">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}
    </div>
  );
}
