import { View, Text, FlatList, Alert } from "react-native";
import { Button } from "../components/button";
import { Plus } from "lucide-react-native";
import { colors } from "../styles/colors";
import { Header } from "@/components/header";
import { PercentCard } from "@/components/percentCard";
import { FoodCard } from "@/components/foodCard";
import { router, useFocusEffect, useNavigation } from "expo-router";
import { useCallback, useState } from "react";
import { DietProps, dietStorage } from "@/storage/dietStorage";

export default function App() {
  const [food, setFood] = useState<DietProps[]>([]);
  const [totals, setTotals] = useState({
    total: 0,
    inDiet: 0,
    percentageInDiet: 0, // porcentagem geral dentro da dieta
  });

  const navigation = useNavigation();

  async function getItems() {
    try {
      const response = await dietStorage.get();
      setFood(response);

      const total = response.length; // total
      const inDiet = response.filter((item) => item.inDiet === true).length; // dentro da dieta

      // calcula a porcentagem geral dentro da dieta (evita divisão por zero)
      const percentageInDiet =
        total > 0 ? Math.round((inDiet / total) * 100) : 0;

      setTotals({
        total,
        inDiet,
        percentageInDiet,
      });
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar as refeições");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getItems();
    }, []) // sempre que mudar ele renderiza dnv
  );

  return (
    <View className="flex-1 p-6 ">
      <Header />

      <PercentCard
        variant={
          totals.total === 0
            ? "defult"
            : totals.percentageInDiet >= 50
            ? "green"
            : "red"
        }
        title={totals.percentageInDiet}
        iconColor={
          totals.total === 0
            ? colors.gray[800]
            : totals.percentageInDiet >= 50
            ? colors.green[900]
            : colors.red[900]
        }
        subtitle={
          totals.total === 0
            ? "nehuma refeição cadastrada"
            : "das refeições dentro da dieta"
        }
        onPress={() => router.navigate("/status")}
      />

      <Text className="text-lg mt-10 mb-2">Refeições</Text>

      <Button onPress={() => router.navigate("/add")}>
        <Plus size={24} color={colors.gray[300]} />
        <Button.Title>Nova refeição</Button.Title>
      </Button>

      <Text className="text-lg font-bold mt-9 mb-1.5">12/08/22</Text>

      <FlatList
        data={food}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <FoodCard
            variant={item.inDiet === true ? "green" : "red"}
            name={item.name}
            hour={item.hour}
            onPress={() =>
              navigation.navigate("details", {
                id: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={() => {
          return (
            <View className="items-center mt-8">
              <Text>Sem refeições cadastradas</Text>
            </View>
          );
        }}
      />
    </View>
  );
}
