"use client";

import { useEffect, useState } from "react";
import { Check, Trash } from "lucide-react";
import {
  getToastMessageFromValue,
  TOAST,
  TOAST_CODE,
} from "@/constants/flash-toast";

interface FlashToastProps {
  toastValue: string | null;
}

const TOAST_DURATION_MS = 2500;

export function FlashToast({ toastValue }: FlashToastProps) {
  // 사용자가 닫았거나 시간이 지나 숨긴 토스트 값 기억
  const [dismissedToastValue, setDismissedToastValue] = useState<string | null>(
    null,
  );
  // 쿠키 값에서 바로 노출 문구를 얻음
  const message = getToastMessageFromValue(toastValue);
  const toastCode = toastValue?.split(":")[0] ?? null;
  const isDeleteToast = toastCode === TOAST_CODE.RESERVATION_DELETED;
  const isVisible =
    !!toastValue && !!message && toastValue !== dismissedToastValue;

  useEffect(() => {
    if (!isVisible || !toastValue) return;

    // 1회성 토스트를 보장하기 위해, 렌더링 즉시 쿠키 제거
    document.cookie = `${TOAST.COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;

    // 일정 시간 뒤 자동으로 토스트 닫기
    const timer = window.setTimeout(() => {
      setDismissedToastValue(toastValue);
    }, TOAST_DURATION_MS);

    return () => {
      window.clearTimeout(timer);
    };
  }, [isVisible, toastValue]);

  if (!isVisible || !message || !toastValue) return null;

  return (
    <div className="pointer-events-none fixed right-4 top-24 z-100 w-full max-w-sm px-4 sm:right-6">
      <div
        className="pointer-events-auto flex w-full items-start justify-between gap-3 rounded-xl border border-primary-100 bg-white px-4 py-3.5 shadow-[0_14px_30px_rgba(2,8,13,0.2)] animate-in slide-in-from-right-20 fade-in-0 duration-700 ease-out"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
              isDeleteToast
                ? "bg-red-100 text-red-600"
                : "bg-emerald-100 text-emerald-600"
            }`}
            aria-hidden="true"
          >
            {isDeleteToast ? (
              <Trash className="h-3.5 w-3.5" strokeWidth={2.25} />
            ) : (
              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
            )}
          </span>
          <p className="text-sm font-semibold text-primary-100">{message}</p>
        </div>
        <button
          type="button"
          className="shrink-0 text-sm text-grayscale-400 hover:text-primary-100"
          onClick={() => setDismissedToastValue(toastValue)}
          aria-label="토스트 닫기"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
