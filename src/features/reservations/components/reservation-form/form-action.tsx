import Link from "next/link";
import { BaseButton } from "@/components/ui/base-button";
import { ROUTES } from "@/constants/url";

interface IFormActionProps {
  isSubmitting: boolean;
}

export function FormAction({ isSubmitting }: IFormActionProps) {
  return (
    <div className="space-y-6">
      {/* 버튼 그룹 */}
      <div className="flex items-center gap-3">
        <Link href={ROUTES.LOGIN} className="flex-1">
          <BaseButton label="로그인하기" variant="outline" />
        </Link>

        <div className="flex-1">
          <BaseButton
            label="예약하기"
            variant="primary"
            type="submit"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* 알림 메시지 */}
      <p className="text-sm leading-5 text-grayscale-400">
        <span className="font-bold">알림:</span> 비로그인으로 예약한 경우, 예약
        변경/취소가 어려울 수 있습니다. 로그인 후 이용하시면 &quot;내
        예약&quot;에서 간편하게 관리할 수 있습니다.
      </p>
    </div>
  );
}
