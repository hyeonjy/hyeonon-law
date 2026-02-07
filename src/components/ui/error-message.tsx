export interface ErrorMessageProps {
  /** 에러 메시지 텍스트 */
  children: string;
}

/** 폼 필드를 위한 에러 메시지 컴포넌트 */
export const ErrorMessage = ({ children }: ErrorMessageProps) => {
  return <p className="mt-1 text-xs font-normal text-red-500">{children}</p>;
};
