import { Button } from "@/components/button";
import { DietProps } from "@/storage/dietStorage";
import { colors } from "@/styles/colors";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Preview() {
  const route = useRoute();
  const { id, name, description, date, hour, inDiet } =
    route.params as DietProps;

  console.log(id);

  return (
    <View>
      <View
        className={twMerge(
          inDiet === true
            ? "h-36 justify-center pt-10 bg-GRAY-500"
            : "h-36 justify-center pt-10 bg-RED-500"
        )}
      >
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="left-7 absolute"
          >
            <ArrowLeft size={30} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text className="font-bold text-xl">Refeição</Text>
        </View>
      </View>

      <View className="px-7 pt-12">
        <View className="mb-7">
          <Text className="text-xl font-bold">{name}</Text>
          <Text className="text-lg">{description}</Text>
        </View>

        <Text className="text-xl font-bold mb-1.5">Data e hora</Text>
        <View className="flex-row mb-7">
          <Text className="text-xl">{date} </Text>
          <Text className="text-xl">ás </Text>
          <Text className="text-xl">{hour}</Text>
        </View>

        <View className="flex-row items-center gap-2.5 bg-GRAY-400 rounded-full w-44 h-10 justify-center">
          {inDiet ? (
            <View className="size-2.5 bg-GREEN-900 rounded-full" />
          ) : (
            <View className="size-2.5 bg-RED-900 rounded-full" />
          )}
          <Text className="text-lg">dentro da dieta</Text>
        </View>
      </View>

      <View className="px-7 gap-2.5">
        <Button>
          <Edit3 size={20} color={colors.gray[300]} />
          <Button.Title>Editar refeição</Button.Title>
        </Button>

        <Button className="border border-bg-GRAY-800 bg-transparent">
          <Trash2 size={20} color={colors.gray[800]} />
          <Button.Title className="text-GRAY-800">
            Excluir refeição
          </Button.Title>
        </Button>
      </View>
    </View>
  );
}
