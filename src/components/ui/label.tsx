interface ILabelProps {
  htmlFor: string;
  children: string;
  showIcon?: boolean;
}

export default function Label({
  htmlFor,
  children,
  showIcon = false,
}: ILabelProps) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-2 flex items-center gap-2 select-none"
    >
      <span className="text-sm font-medium leading-[14px] text-grayscale-500">
        {children}
      </span>
      {showIcon && (
        <span className="text-sm font-medium leading-[14px] text-red-500">
          *
        </span>
      )}
    </label>
  );
}
