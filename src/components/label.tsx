import { Text, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";

type LabelProps = TextInputProps & {
  title: string;
};

export function Label({
  title,
  className,
  ...rest
}: LabelProps & { className?: string }) {
  return (
    <Text
      {...rest}
      className={twMerge("text-lg font-bold text-[#333638] mb-1", className)}
    >
      {title}
    </Text>
  );
}
