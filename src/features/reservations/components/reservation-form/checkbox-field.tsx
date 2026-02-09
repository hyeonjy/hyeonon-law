import { Checkbox } from "@/components/ui/checkbox";
import { ErrorMessage } from "@/components/ui/error-message";

interface ICheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
}

export function CheckboxField({
  label,
  checked,
  onChange,
  error,
}: ICheckboxFieldProps) {
  return (
    <div className="w-full relative">
      <div className="rounded-[10px] bg-grayscale-200 px-4 py-4 flex items-center gap-3">
        <Checkbox
          id="privacy-checkbox"
          checked={checked}
          onCheckedChange={onChange}
          className="cursor-pointer border-white"
        />
        <label
          htmlFor="privacy-checkbox"
          className="cursor-pointer text-sm leading-5 text-grayscale-500"
        >
          {label}
          <span className="text-red-500">*</span>
        </label>
      </div>

      {error && (
        <div className="absolute">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}
    </div>
  );
}
