import { ArrowUpRight } from "lucide-react-native";
import { View, Text, Pressable, PressableProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

export type PercentCardProps = PressableProps & {
  title: string;
  subtitle: string;
  variant?: "gray" | "green" | "red";
  titleSize?: `text-${
    | "xs"
    | "sm"
    | "base"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl"
    | "8xl"
    | "9xl"}`;
};

export const card = tv({
  base: "w-full h-36 bg-[#E5F0DB] rounded-lg flex-col items-center justify-center",
  variants: {
    bg: {
      gray: "bg-gray-6",
      green: "bg-green-light",
      red: "bg-red-light",
    },
  },

  defaultVariants: {
    bg: "gray",
  },
});

export function PercentCard({
  title,
  subtitle,
  variant,
  className,
  titleSize = "text-3xl",
  ...rest
}: PercentCardProps & { className?: string }) {
  return (
    <Pressable {...rest} className={twMerge(card({ bg: variant }), className)}>
      <View className="absolute top-4 right-4">
        <ArrowUpRight color="#639339" size={25} />
      </View>
      <Text className={twMerge("font-bold", titleSize)}>{title}%</Text>
      <Text className="text-lg text-[#333638]">{subtitle}</Text>
    </Pressable>
  );
}
