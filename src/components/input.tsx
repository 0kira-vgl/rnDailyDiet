import { TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";

export function Input({
  className,
  ...rest
}: TextInputProps & { className?: string }) {
  return (
    <TextInput
      className={twMerge(
        "h-16 p-4 border border-[#DDDEDF] rounded-md",
        className
      )}
      style={{
        fontSize: 16,
      }}
      placeholderTextColor="#9CA3AF"
      {...rest}
    />
  );
}
