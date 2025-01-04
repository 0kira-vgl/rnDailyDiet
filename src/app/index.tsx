import { View, Text, FlatList } from "react-native";
import { Button } from "../components/button";
import { Plus } from "lucide-react-native";
import { colors } from "../styles/colors";
import { Header } from "@/components/header";
import { PercentCard } from "@/components/percentCard";
import { FoodCard } from "@/components/foodCard";
import { router } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 p-6 ">
      <Header />

      <PercentCard
        variant="green"
        title="90,86"
        subtitle="das refeições dentro da dieta"
      />

      <Text className="text-lg mt-10 mb-2">Refeições</Text>

      <Button onPress={() => router.navigate("/add")}>
        <Plus size={24} color={colors.gray[300]} />
        <Button.Title>Nova refeição</Button.Title>
      </Button>

      <Text className="text-lg font-bold mt-9 mb-1.5">12/08/22</Text>

      <FlatList
        data={["1", "2", "3"]}
        // keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        // contentContainerStyle={foods.length === 0 && { flex: 1 }} // "centraliza" o ListEmpty caso a lista estiver vazia
        renderItem={() => <FoodCard name="Frango" hour="12:30" />}
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
