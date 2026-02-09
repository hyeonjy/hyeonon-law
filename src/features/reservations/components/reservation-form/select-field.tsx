import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Label from "@/components/ui/label";
import { ErrorMessage } from "@/components/ui/error-message";

interface ISelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface ISelectFieldProps {
  label: string;
  options: ISelectOption[];
  value?: string;
  onChange: (value: string) => void;
  error?: string;
  disabled?: boolean;
}

export function SelectField({
  label,
  options,
  value,
  onChange,
  error,
  disabled = false,
}: ISelectFieldProps) {
  return (
    <div className="w-full relative">
      <Label htmlFor={label} showIcon>
        {label}
      </Label>

      <Select value={value} onValueChange={onChange} disabled={disabled}>
        <SelectTrigger
          id={label}
          className="h-9 w-full rounded-lg border-grayscale-200 bg-white/[0.002] text-sm shadow-[0_1px_2px_0_rgba(0,0,0,0.05)] focus:shadow-[0_1px_3px_0_rgba(0,0,0,0.1)]"
        >
          <SelectValue
            placeholder={
              disabled ? "날짜를 먼저 선택해주세요" : `${label}을 선택해주세요`
            }
          />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {error && (
        <div className="absolute">
          <ErrorMessage>{error}</ErrorMessage>
        </div>
      )}
    </div>
  );
}
