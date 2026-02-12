import Link from "next/link";
import { ROUTES } from "@/constants/url";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const LocationSection = () => {
  return (
    <section className="py-16 md:py-24 px-4 bg-primary-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
        {/* 지도 */}
        <div className="w-full md:flex-1 relative h-96 md:h-[388px] overflow-hidden rounded-lg">
          <Image
            src="/images/map.jpeg"
            alt="사무실 위치 지도"
            fill
            className="object-cover"
          />
          <div className="absolute bottom-5 left-0 bg-white/80 text-primary p-2 font-bold text-lg">
            예시 이미지 (가짜 주소)
          </div>
        </div>

        {/* 정보 */}
        <div className="w-full md:flex-1 flex flex-col justify-center">
          <div className="mb-3">
            <p className="italic text-secondary-100 font-semibold text-xl mb-1">
              Location
            </p>
            <p className="text-wh font-semibold mb-4 text-white text-4xl">
              오시는 길
            </p>
          </div>
          <div className="space-y-6 mb-8">
            <div>
              <p className="text-sm text-secondary-100 font-semibold uppercase mb-2">
                주소
              </p>
              <p className="text-lg text-grayscale-200">
                서울시 강남구 현온로 123, 현온 빌딩 5층
              </p>
            </div>
            <div>
              <p className="text-sm text-secondary-100 font-semibold uppercase mb-2">
                전화
              </p>
              <p className="text-lg text-grayscale-200">02-1234-5678</p>
            </div>
            <div>
              <p className="text-sm text-secondary-100 font-semibold uppercase mb-2">
                상담 시간
              </p>
              <p className="text-lg text-grayscale-200">
                평일 09:00 ~ 18:00 (점심 12:00 ~ 13:00)
              </p>
            </div>
          </div>

          <Link href={ROUTES.RESERVATION_NEW}>
            <Button
              size="lg"
              className="cursor-pointer hover:bg-secondary-100/80 text-white w-full md:w-auto bg-secondary-100"
            >
              상담 예약하기
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
