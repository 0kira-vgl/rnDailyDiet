import { colors } from "@/styles/colors";
import { ArrowUpRight } from "lucide-react-native";
import { View, Text, Pressable, PressableProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type PercentCardProps = PressableProps & {
  title: number;
  subtitle: string;
  variant?: "defult" | "green" | "red";
  iconColor: string;
};

const card = tv({
  base: "w-full h-36 rounded-lg flex-col items-center justify-center",
  variants: {
    bg: {
      defult: "bg-GRAY-500",
      green: "bg-GREEN-300",
      red: "bg-RED-300",
    },
  },
});

export function PercentCard({
  title,
  subtitle,
  variant = "defult",
  iconColor,
  ...rest
}: PercentCardProps) {
  return (
    <Pressable className={twMerge(card({ bg: variant }))} {...rest}>
      <View className="absolute top-4 right-4">
        <ArrowUpRight color={iconColor} size={25} />
      </View>
      <Text className="font-bold text-3xl">{title}%</Text>
      <Text className="text-lg text-gray-800">{subtitle}</Text>
    </Pressable>
  );
}
