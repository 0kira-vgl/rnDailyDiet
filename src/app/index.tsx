import { View, Text, FlatList, Alert } from "react-native";
import { Button } from "../components/button";
import { Plus } from "lucide-react-native";
import { colors } from "../styles/colors";
import { Header } from "@/components/header";
import { PercentCard } from "@/components/percentCard";
import { FoodCard } from "@/components/foodCard";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { DietProps, dietStorage } from "@/storage/dietStorage";

export default function App() {
  const [food, setFood] = useState<DietProps[]>([]);

  async function getLinks() {
    try {
      const response = await dietStorage.get();

      setFood(response);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível listar as refeições");
    }
  }

  useFocusEffect(
    useCallback(() => {
      getLinks();
    }, []) // sempre que mudar a categoria ele renderiza dnv
  );

  return (
    <View className="flex-1 p-6 ">
      <Header />

      <PercentCard
        variant="green"
        title="90,86"
        subtitle="das refeições dentro da dieta"
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
        // contentContainerStyle={food.length === 0 && { flex: 1 }} // "centraliza" o ListEmpty caso a lista estiver vazia
        renderItem={({ item }) => (
          <FoodCard
            variant={item.inDiet === true ? "green" : "red"}
            name={item.name}
            hour={item.hour}
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
