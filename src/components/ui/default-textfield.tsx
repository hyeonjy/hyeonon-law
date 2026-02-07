import { ErrorMessage } from "./error-message";

export interface DefaultTextFieldProps {
  /** 라벨과 input의 id를 연결할 값 */
  htmlFor: string;
  /** 입력 필드 위에 표시되는 라벨 텍스트 */
  label: string;
  /** 라벨 옆에 필수 아이콘(*) 표시 여부 */
  showIcon?: boolean;
  /** 에러 상태 */
  isError?: boolean;
  /** isError가 true일 때 표시할 에러 메시지 */
  errorMessage?: string;
  /** 입력 값 */
  value?: string;
  /** 변경 핸들러 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** 입력 타입 (text, password, email 등) */
  type?: string;
}

export const DefaultTextField = ({
  htmlFor,
  label,
  showIcon = false,
  isError = false,
  errorMessage = "",
  value = "",
  onChange,
  type = "text",
}: DefaultTextFieldProps) => {
  return (
    <div className="w-full relative text-field">
      {/* Label */}
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-center gap-2 select-none"
      >
        <span className="text-sm font-medium leading-[14px] text-grayscale-500">
          {label}
        </span>
        {showIcon && (
          <span className="text-sm font-medium leading-[14px] text-red-500">
            *
          </span>
        )}
      </label>

      <input
        id={htmlFor}
        type={type}
        value={value}
        onChange={onChange}
        className="h-9 w-full rounded-lg bg-white/[0.002] px-3 text-sm text-grayscale-500 border border-grayscale-200 outline-none shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] focus:shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]"
      />

      {/* Error Message */}
      {isError && errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </div>
  );
};
