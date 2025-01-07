import { Button } from "@/components/button";
import { DietButton } from "@/components/dietButton";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { dietStorage } from "@/storage/dietStorage";
import { colors } from "@/styles/colors";
import { router, useNavigation } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";

export default function Add() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [selectedOption, setSelectedOption] = useState<"in" | "out" | null>(
    null
  ); // estado para controlar qual botão está selecionado

  const navigation = useNavigation();

  async function handleAdd() {
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

      await dietStorage.save({
        id: new Date().getTime().toString(), // gerando id
        name,
        description,
        date,
        hour,
        inDiet: selectedOption === "in", // salva como booleano
      });

      Alert.alert("Sucesso", "Nova refeição adicionada!", [
        // { text: "Ok", onPress: () => router.back() },
        {
          text: "Ok",
          onPress: () =>
            navigation.navigate("feedback", {
              inDiet: selectedOption === "in", // passa o valor booleano para feedback
            }),
        },
      ]);
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar a refeição");
      console.error(error);
    }
  }

  return (
    <View className="flex-1 bg-GRAY-500">
      <View className="h-36 justify-center pt-10">
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="left-7 absolute"
          >
            <ArrowLeft size={30} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text className="font-bold text-xl">Nova Refeição</Text>
        </View>
      </View>

      <View
        className="px-7 pt-10 bg-GRAY-300 flex-1"
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        <View className="mb-8">
          <Label title="Nome" />
          <Input onChangeText={setName} />
        </View>

        <View className="mb-8">
          <Label title="Descrição" />
          <Input
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
            <Input placeholder="dd/mm/aaaa" onChangeText={setDate} />
          </View>

          <View className="w-36 flex-1">
            <Label title="Hora" />
            <Input
              placeholder="hh:mm"
              keyboardType="numbers-and-punctuation"
              onChangeText={setHour}
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

        <Button className="mt-8" onPress={handleAdd}>
          <Button.Title>Cadastrar refeição</Button.Title>
        </Button>
      </View>
    </View>
  );
}
