import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Status() {
  return (
    <View>
      <View className="bg-GRAY-500 h-48 justify-center pt-10">
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="left-7 bottom-12 absolute"
          >
            <ArrowLeft size={30} color={colors.gray[800]} />
          </TouchableOpacity>
          <View className="items-center justify-center">
            <Text className="font-bold text-4xl">89%</Text>
            <Text className="text-lg text-gray-800">
              das refeições dentro da dieta
            </Text>
          </View>
        </View>
      </View>

      <View className="px-7 pt-12 items-center justify-center bg-GRAY-300">
        <Text className="text-lg font-bold text-GRAY-800">
          Estatísticas gerais
        </Text>

        <View className="w-full">
          <View className="items-center justify-center bg-GRAY-400 rounded-lg h-28 mb-5">
            <Text className="font-bold text-2xl pb-1.5">22</Text>
            <Text className="text-lg text-text-GRAY-800">
              das refeições dentro da dieta
            </Text>
          </View>

          <View className="items-center justify-center bg-GRAY-400 rounded-lg h-28 mb-5">
            <Text className="font-bold text-2xl pb-1.5">109</Text>
            <Text className="text-lg text-text-GRAY-800">
              refeições registradas
            </Text>
          </View>

          <View className="justify-between items-center flex-row gap-5">
            <View className="items-center justify-center bg-GREEN-300 rounded-lg h-28 w-40 py-9 px-5 flex-1">
              <Text className="font-bold text-2xl pb-1.5">99</Text>
              <Text className="text-lg text-text-GRAY-800">
                refeições dentro da dieta
              </Text>
            </View>

            <View className="items-center justify-center bg-RED-300 rounded-lg h-28 w-40 py-9 px-5 flex-1">
              <Text className="font-bold text-2xl pb-1.5">10</Text>
              <Text className="text-lg text-text-GRAY-800">
                refeições fora da dieta
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
