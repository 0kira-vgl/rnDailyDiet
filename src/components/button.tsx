import {
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
  TextProps,
} from "react-native";
import { twMerge } from "tailwind-merge";

function Button({ children, className, ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className={twMerge(
        "w-full bg-GRAY-800 h-16 rounded-md justify-center items-center flex-row gap-2",
        className
      )}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
}
function Title({ children, className, ...rest }: TextProps) {
  return (
    <Text className={twMerge("text-zinc-50 text-lg font-bold", className)}>
      {children}
    </Text>
  );
}

Button.Title = Title;

export { Button };
