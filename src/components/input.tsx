import { TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";

export function Input({
  className,
  ...rest
}: TextInputProps & { className?: string }) {
  return (
    <TextInput
      {...rest}
      className={twMerge(
        "h-16 p-4 text-xl border border-[#DDDEDF] rounded-md",
        className
      )}
      placeholderTextColor="#9CA3AF"
    />
  );
}
