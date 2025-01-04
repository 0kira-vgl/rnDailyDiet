import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type ButtonsProps = TouchableOpacityProps & {
  title: string;
  isSelected?: boolean;
  variant: "default" | "in" | "out";
  variantCircle: "in" | "out";
};

const inOrOut = tv({
  base: "h-16 flex-1 rounded-md flex-row items-center justify-center gap-2.5",
  variants: {
    colors: {
      default: "bg-GRAY-400",
      in: "bg-GREEN-300 border border-GREEN-900",
      out: "bg-RED-300 border border-RED-900",
    },
  },
});

const circle = tv({
  base: "size-2 rounded-full",
  variants: {
    color: {
      in: "bg-GREEN-900",
      out: "bg-RED-900",
    },
  },
});

export const DietButton = ({
  title,
  isSelected,
  variant,
  variantCircle,
  ...rest
}: ButtonsProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      className={twMerge(
        inOrOut({
          colors: isSelected ? variant : "default", // aplica a variante com base no estado de seleção
        })
      )}
      {...rest}
    >
      <View className={circle({ color: variantCircle })} />

      <Text className="font-bold">{title}</Text>
    </TouchableOpacity>
  );
};
