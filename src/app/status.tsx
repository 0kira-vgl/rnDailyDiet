import { DietProps, dietStorage } from "@/storage/dietStorage";
import { colors } from "@/styles/colors";
import { router, useFocusEffect } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useCallback, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Status() {
  const [bestSequence, setBestSequence] = useState(0);
  const [totals, setTotals] = useState({
    total: 0,
    inDiet: 0,
    outDiet: 0,
    percentageInDiet: 0, // porcentagem geral dentro da dieta
  });

  async function getItems() {
    try {
      const response = await dietStorage.get();

      const total = response.length; // total
      const inDiet = response.filter((item) => item.inDiet === true).length; // dentro da dieta
      const outDiet = response.filter((item) => item.inDiet === false).length; // fora da dieta

      // calcula a porcentagem geral dentro da dieta (evita divisão por zero)
      const percentageInDiet =
        total > 0 ? Math.round((inDiet / total) * 100) : 0;

      setTotals({
        total,
        inDiet,
        outDiet,
        percentageInDiet,
      });

      // Calcular a melhor sequência dentro da dieta
      const bestSeq = calculateBestSequence(response);
      setBestSequence(bestSeq); // atualiza a melhor sequência
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível carregar os status", [
        { text: "Ok", onPress: () => router.navigate("/") },
      ]);
    }
  }

  function calculateBestSequence(meals: DietProps[]) {
    let maxSeq = 0;
    let currentSeq = 0;

    for (const meal of meals) {
      if (meal.inDiet) {
        currentSeq++; // incrementa a sequência
        maxSeq = Math.max(maxSeq, currentSeq); // Atualiza a melhor sequência
      } else {
        currentSeq = 0; // reseta a sequência quando não está na dieta
      }
    }

    return maxSeq; // retorna a maior sequência
  }

  useFocusEffect(
    useCallback(() => {
      getItems();
    }, []) // sempre que mudar ele renderiza dnv
  );

  return (
    <View
      className={twMerge(
        "flex-1",
        totals.total === 0
          ? "bg-GRAY-500"
          : totals.percentageInDiet >= 50
          ? "bg-GREEN-300"
          : "bg-RED-300"
      )}
    >
      <View className="h-48 justify-center pt-10">
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.navigate("/")}
            className="left-7 bottom-12 absolute"
          >
            <ArrowLeft
              size={30}
              color={
                totals.total === 0
                  ? colors.gray[800]
                  : totals.percentageInDiet >= 50
                  ? colors.green[900]
                  : colors.red[900]
              }
            />
          </TouchableOpacity>
          <View className="items-center justify-center">
            <Text className="font-bold text-4xl">
              {totals.percentageInDiet}%
            </Text>
            <Text className="text-lg text-gray-800">
              {totals.total === 0
                ? "nenhuma refeição cadastrada"
                : "das refeições dentro da dieta"}
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
            <Text className="font-bold text-3xl pb-1.5">{bestSequence}</Text>
            <Text className="text-lg text-text-GRAY-800">
              melhor sequência dentro da dieta
            </Text>
          </View>

          <View className="items-center justify-center bg-GRAY-400 rounded-lg h-32 mb-4">
            <Text className="font-bold text-3xl pb-1.5">{totals.total}</Text>
            <Text className="text-lg text-text-GRAY-800">
              refeições registradas
            </Text>
          </View>

          <View className="justify-between items-center flex-row gap-4">
            <View className="items-center justify-center bg-GREEN-300 rounded-lg h-32 flex-1 py-4 px-2">
              <Text className="font-bold text-3xl pb-1.5" numberOfLines={1}>
                {totals.inDiet}
              </Text>
              <Text className="text-lg text-text-GRAY-800 text-center">
                refeições dentro da dieta
              </Text>
            </View>

            <View className="items-center justify-center bg-RED-300 rounded-lg h-32 flex-1 py-4 px-2">
              <Text className="font-bold text-3xl pb-1.5" numberOfLines={1}>
                {totals.outDiet}
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
