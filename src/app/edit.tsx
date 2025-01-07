import { Button } from "@/components/button";
import { DietButton } from "@/components/dietButton";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { DietProps, dietStorage } from "@/storage/dietStorage";
import { colors } from "@/styles/colors";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";

export default function Edit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [selectedOption, setSelectedOption] = useState<"in" | "out" | null>(
    null
  ); // estado para controlar qual botão está selecionado

  const route = useRoute();
  const { id } = route.params as DietProps;

  async function getItem() {
    try {
      const response = await dietStorage.get();
      const item = response.find((item) => item.id === id);

      if (item) {
        setName(item.name); // preenche os estados com os valores da refeição
        setDescription(item.description);
        setDate(item.date);
        setHour(item.hour);
        setSelectedOption(item.inDiet ? "in" : "out"); // converte o booleano para o formato esperado
      } else {
        Alert.alert("Erro", "Refeição não encontrada!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da refeição");
      console.log(error);
    }
  }

  async function handleSave() {
    try {
      if (!name.trim()) {
        return Alert.alert("Nome", "Preencha o nome");
      }

      // "trim()" remove o caracter "espaço"
      if (!description.trim()) {
        return Alert.alert("Descrição", "Preencha a descrição");
      }

      if (!date.trim()) {
        return Alert.alert("Data", "Preencha a data");
      }

      if (!hour.trim()) {
        return Alert.alert("Hora", "Preencha a hora");
      }

      if (!selectedOption) {
        return Alert.alert(
          "Dieta",
          "Selecione se está dentro ou fora da dieta"
        );
      }

      // atualiza a refeição no armazenamento
      await dietStorage.update(id, {
        id,
        name,
        description,
        date,
        hour,
        inDiet: selectedOption === "in",
      });

      Alert.alert("Sucesso", "Refeição atualizada com sucesso!", [
        {
          text: "Ok",
          onPress: () => router.navigate("/"),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao salvar as alterações");
      console.error(error);
    }
  }

  useEffect(() => {
    getItem();
  }, []);

  return (
    <View>
      <View className="bg-GRAY-500 h-36 justify-center pt-10">
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="left-7 absolute"
          >
            <ArrowLeft size={30} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text className="font-bold text-xl">Editar refeição</Text>
        </View>
      </View>

      <View
        className="px-7 pt-12"
        style={{
          borderTopEndRadius: 15,
          borderTopStartRadius: 15,
        }}
      >
        <View className="mb-8">
          <Label title="Nome" />
          <Input value={name} onChangeText={setName} />
        </View>

        <View className="mb-8">
          <Label title="Descrição" />
          <Input
            value={description}
            onChangeText={setDescription}
            multiline // transforma em uma "textarea"
            className="h-36"
            style={{
              textAlignVertical: "top",
            }}
          />
        </View>

        <View className="mb-8 justify-between flex-row gap-7">
          <View className="flex-1">
            <Label title="Data" />
            <Input
              value={date}
              placeholder="dd/mm/aaaa"
              onChangeText={setDate}
            />
          </View>

          <View className="w-36 flex-1">
            <Label title="Hora" />
            <Input
              value={hour}
              onChangeText={setHour}
              placeholder="hh:mm"
              keyboardType="numbers-and-punctuation"
            />
          </View>
        </View>

        <Label title="Está dentro da dieta?" />
        <View className="justify-between flex-row gap-7">
          <DietButton
            title="Sim"
            variant="in"
            variantCircle="in"
            isSelected={selectedOption === "in"}
            onPress={() => setSelectedOption("in")}
          />
          <DietButton
            title="Não"
            variant="out"
            variantCircle="out"
            isSelected={selectedOption === "out"}
            onPress={() => setSelectedOption("out")}
          />
        </View>

        <Button className="mt-8" onPress={handleSave}>
          <Button.Title>Salvar alterações</Button.Title>
        </Button>
      </View>
    </View>
  );
}
