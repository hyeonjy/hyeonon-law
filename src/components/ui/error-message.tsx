export interface IErrorMessageProps {
  /** 에러 메시지 텍스트 */
  children: string;
}

/** 폼 필드를 위한 에러 메시지 컴포넌트 */
export const ErrorMessage = ({ children }: IErrorMessageProps) => {
  return (
    <p className="h-6 mt-1 text-xs font-normal text-red-500">{children}</p>
  );
};
