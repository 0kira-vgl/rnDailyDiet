import { colors } from "@/styles/colors";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Text, TouchableOpacity, View } from "react-native";

export default function Status() {
  return (
    <View className="flex-1 bg-GREEN-300">
      <View className="h-48 justify-center pt-10">
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

      <View
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
        className="px-7 pt-10 items-center bg-GRAY-300 flex-1"
      >
        <Text className="text-lg font-bold text-GRAY-800 pb-8">
          Estatísticas gerais
        </Text>

        <View className="w-full">
          <View className="items-center justify-center bg-GRAY-400 rounded-lg h-32 mb-4">
            <Text className="font-bold text-3xl pb-1.5">22</Text>
            <Text className="text-lg text-text-GRAY-800">
              das refeições dentro da dieta
            </Text>
          </View>

          <View className="items-center justify-center bg-GRAY-400 rounded-lg h-32 mb-4">
            <Text className="font-bold text-3xl pb-1.5">109</Text>
            <Text className="text-lg text-text-GRAY-800">
              refeições registradas
            </Text>
          </View>

          <View className="justify-between items-center flex-row gap-4">
            <View className="items-center justify-center bg-GREEN-300 rounded-lg h-32 flex-1 py-4 px-2">
              <Text className="font-bold text-3xl pb-1.5" numberOfLines={1}>
                100
              </Text>
              <Text className="text-lg text-text-GRAY-800 text-center">
                refeições dentro da dieta
              </Text>
            </View>

            <View className="items-center justify-center bg-RED-300 rounded-lg h-32 flex-1 py-4 px-2">
              <Text className="font-bold text-3xl pb-1.5" numberOfLines={1}>
                100
              </Text>
              <Text className="text-lg text-text-GRAY-800 text-center">
                refeições fora da dieta
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
