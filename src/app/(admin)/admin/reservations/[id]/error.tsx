"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { BaseButton } from "@/components/ui/base-button";
import { ROUTES } from "@/constants/url";

interface IReservationErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ReservationErrorPage({
  error,
  reset,
}: IReservationErrorPageProps) {
  useEffect(() => {
    console.error("reservations page error:", error);
  }, [error]);

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 sm:px-6 lg:px-8 flex items-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <AlertTriangle
          className="h-30 w-30 text-primary-100"
          aria-hidden="true"
        />
        <h1 className="mt-6 text-2xl text-grayscale-500">
          예약 상세 정보를 불러오지 못했습니다
        </h1>

        <div className="mt-8 flex w-full max-w-sm gap-3">
          <div className="w-full">
            <BaseButton label="새로 고침하기" onClick={reset} />
          </div>
          <Link href={ROUTES.HOME} className="w-full">
            <BaseButton label="홈으로 이동하기" variant="outline" />
          </Link>
        </div>
      </div>
    </div>
  );
}
