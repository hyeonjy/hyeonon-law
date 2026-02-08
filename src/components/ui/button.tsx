import { cn } from "@/lib/utils";

interface IButtonProps {
  /** 버튼에 표시될 텍스트 */
  label: string;
  /** 버튼 스타일 종류 */
  variant?: "primary" | "outline";
  /** 비활성화 상태 */
  disabled?: boolean;
  /** 클릭 핸들러 */
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  label,
  variant = "primary",
  disabled = false,
  onClick,
}: IButtonProps) => {
  const buttonStyles = cn(
    // 기본 스타일
    "w-full h-9 rounded-lg py-2 text-sm font-medium flex items-center justify-center transition-colors",
    // Variant별 스타일
    variant === "primary" &&
      "bg-primary-100 text-white hover:bg-primary-200 active:bg-primary-300",
    variant === "outline" &&
      "bg-white/[0.002] border border-grayscale-300 text-primary-100 hover:bg-grayscale-100 active:bg-grayscale-200",
    // Disabled 스타일
    disabled &&
      "bg-grayscale-100 text-grayscale-300 cursor-not-allowed pointer-events-none",
  );

  return (
    <button className={buttonStyles} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};
