import { View, Text, SectionList, Alert } from "react-native";
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
  const [sections, setSections] = useState<
    { title: string; data: DietProps[] }[]
  >([]);

  const [totals, setTotals] = useState({
    total: 0,
    inDiet: 0,
    percentageInDiet: 0, // porcentagem geral dentro da dieta
  });

  const navigation = useNavigation();

  async function getItems() {
    try {
      const response = await dietStorage.get();

      // agrupa as refeições por data
      const groupedByDate = response.reduce(
        (acc: Record<string, DietProps[]>, item) => {
          const date = item.date;
          if (!acc[date]) acc[date] = [];
          acc[date].push(item);
          return acc;
        },
        {}
      );

      // Ordena as datas em ordem decrescente
      const sectionsData = Object.keys(groupedByDate)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime()) // mais recente primeiro
        .map((date) => ({
          title: date.replace(/(\d{4})$/, (match) => match.slice(-2)), // abrevia o ano
          data: groupedByDate[date],
        }));

      setSections(sectionsData);

      const total = response.length; // total de refeições cadastradas
      const inDiet = response.filter((item) => item.inDiet === true).length; // total dentro da dieta

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
    }, [])
  );

  return (
    <View className="flex-1 p-6">
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
            ? "Nenhuma refeição cadastrada"
            : "das refeições dentro da dieta"
        }
        onPress={() => router.navigate("/status")}
      />

      <Text className="text-lg mt-10 mb-2">Refeições</Text>

      <Button onPress={() => router.navigate("/add")}>
        <Plus size={24} color={colors.gray[300]} />
        <Button.Title>Nova refeição</Button.Title>
      </Button>

      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderSectionHeader={({ section: { title } }) => (
          <View className="bg-GRAY-300">
            <Text className="text-lg font-bold mt-8 mb-1.5">{title}</Text>
          </View>
        )}
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
        ListEmptyComponent={() => (
          <View className="items-center mt-8">
            <Text>Sem refeições cadastradas</Text>
          </View>
        )}
      />
    </View>
  );
}
