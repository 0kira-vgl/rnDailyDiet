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
import DateTimePicker from "@react-native-community/datetimepicker";

export default function Add() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false); // controle de visibilidade do DatePicker para data
  const [showTimePicker, setShowTimePicker] = useState(false); // controle de visibilidade do DatePicker para hora
  const [selectedOption, setSelectedOption] = useState<"in" | "out" | null>(
    null
  ); // estado para controlar a seleção de "dentro" ou "fora" da dieta

  const navigation = useNavigation();

  // formata a data para "dd/mm/aaaa"
  const formattedDate = date.toLocaleDateString("pt-BR");

  // formata a hora para "hh:mm"
  const formattedHour = hour.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // callback acionado quando o usuário seleciona uma data
  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false); // fecha o DatePicker após a seleção
    if (selectedDate) {
      setDate(selectedDate); // atualiza o estado com a data selecionada
    }
  };

  // callback acionado quando o usuário seleciona uma hora
  const handleTimeChange = (event: any, selectedTime: Date | undefined) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setHour(selectedTime);
    }
  };

  async function handleAdd() {
    try {
      if (!name.trim()) {
        return Alert.alert("Nome", "Preencha o nome");
      }

      if (!description.trim()) {
        return Alert.alert("Descrição", "Preencha a descrição");
      }

      if (!selectedOption) {
        return Alert.alert(
          "Dieta",
          "Selecione se está dentro ou fora da dieta"
        );
      }

      await dietStorage.save({
        id: new Date().getTime().toString(), // gera um ID único com base no timestamp atual
        name,
        description,
        date: formattedDate, // usa a data formatada
        hour: formattedHour,
        inDiet: selectedOption === "in", // define se está dentro da dieta como booleano
      });

      Alert.alert("Sucesso", "Nova refeição adicionada!", [
        {
          text: "Ok",
          onPress: () =>
            navigation.navigate("feedback", {
              inDiet: selectedOption === "in",
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
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)} // mostra o DatePicker
              className="border border-GRAY-500 rounded-md p-4 h-16 justify-center mb-2.5"
            >
              <Text className="text-xl">{formattedDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date} // data atual
                mode="date"
                locale="pt-br"
                themeVariant="light"
                onChange={handleDateChange} // callback para atualizar o estado
              />
            )}
          </View>

          <View className="w-36 flex-1">
            <Label title="Hora" />
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)} // Mostra o TimePicker
              className="border border-GRAY-500 rounded-md p-4 h-16 justify-center mb-2.5"
            >
              <Text className="text-xl">{formattedHour}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={hour} // hora atual
                mode="time"
                themeVariant="light"
                is24Hour={true}
                onChange={handleTimeChange} // callback para atualizar o estado
              />
            )}
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
