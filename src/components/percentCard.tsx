import { colors } from "@/styles/colors";
import { ArrowUpRight } from "lucide-react-native";
import { View, Text, Pressable, PressableProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

type PercentCardProps = PressableProps & {
  title: string;
  subtitle: string;
  variant?: "green" | "red";
};

const card = tv({
  base: "w-full h-36 rounded-lg flex-col items-center justify-center",
  variants: {
    bg: {
      green: "bg-GREEN-300",
      red: "bg-RED-300",
    },
  },
});

export function PercentCard({
  title,
  subtitle,
  variant = "green",
  ...rest
}: PercentCardProps) {
  return (
    <Pressable className={twMerge(card({ bg: variant }))} {...rest}>
      <View className="absolute top-4 right-4">
        <ArrowUpRight
          color={colors.green[900]}
          // color={colors.red[900]}
          size={25}
        />
      </View>
      <Text className="font-bold text-3xl">{title}%</Text>
      <Text className="text-lg text-gray-800">{subtitle}</Text>
    </Pressable>
  );
}
