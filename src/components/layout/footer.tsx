import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-black text-white">
      <div className="mx-auto flex w-full max-w-[1216px] flex-col justify-between px-4 py-12 md:flex-row md:items-end xl:px-0">
        {/* 좌측: 회사 정보 */}
        <div className="flex flex-col gap-6">
          {/* 로고 영역 */}
          <div className="flex items-center gap-2">
            <Scale className="h-6 w-6 text-white" />
            <span className="text-lg font-semibold leading-7">
              법무법인 현온
            </span>
          </div>

          {/* 정보 텍스트 */}
          <div className="flex flex-col gap-2 text-sm font-normal leading-5">
            <p>서울시 강남구 현온로 123</p>
            <p>TEL: 02-1234-5678</p>
            <p>대표 변호사: 김현온</p>
          </div>
        </div>

        {/* 우측: 저작권 */}
        <div className="mt-8 md:mt-0">
          <p className="text-sm font-normal leading-5">
            © 현온 법무법인. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
