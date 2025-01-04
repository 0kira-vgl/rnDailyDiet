import { View, Text, Pressable, PressableProps } from "react-native";
import { tv } from "tailwind-variants";

type FoodCardProps = PressableProps & {
  name: string;
  hour: string;
  variant?: "green" | "red";
};

const status = tv({
  base: "size-4 rounded-full",
  variants: {
    color: {
      green: "bg-GREEN-500",
      red: "bg-RED-500",
    },
  },
});

export function FoodCard({
  name,
  hour,
  variant = "green",
  ...rest
}: FoodCardProps) {
  return (
    <Pressable
      className="flex-row border justify-between mb-2.5 items-center rounded-md h-14 border-GRAY-500 px-4"
      {...rest}
    >
      <View className="flex-row items-center justify-center">
        <Text className="font-bold">{hour}</Text>

        <View className="h-4 bg-gray-600 w-px mx-4" />

        <Text className="text-GRAY-800 flex-1" numberOfLines={1}>
          {name}
        </Text>

        <View className={status({ color: variant })} />
      </View>
    </Pressable>
  );
}
