export default function ReservationDetailLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4">
      <div
        className="flex flex-col items-center justify-center"
        role="status"
        aria-busy="true"
        aria-live="polite"
      >
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-grayscale-300 border-t-primary-100" />
        <p className="mt-4 text-sm font-medium text-grayscale-400">
          예약 상세 정보를 불러오는 중입니다.
        </p>
      </div>
    </div>
  );
}
