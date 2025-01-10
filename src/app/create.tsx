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
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Create() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"in" | "out" | null>(
    null
  );
  const [isInputFocused, setIsInputFocused] = useState(false);

  const navigation = useNavigation();

  const formattedDate = date.toLocaleDateString("pt-BR");
  const formattedHour = hour.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

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
        id: new Date().getTime().toString(),
        name,
        description,
        date: formattedDate,
        hour: formattedHour,
        inDiet: selectedOption === "in",
      });

      // resetando os estados para limpar os campos
      setName("");
      setDescription("");
      setDate(new Date());
      setHour(new Date());
      setSelectedOption(null);

      // Navegando para a tela de feedback
      navigation.navigate("feedback", {
        inDiet: selectedOption === "in",
      });
    } catch (error) {
      Alert.alert("Erro", "Ocorreu um erro ao adicionar a refeição");
      console.error(error);
    }
  }

  return (
    <KeyboardAwareScrollView
      className="flex-1 bg-GRAY-500"
      extraHeight={20} // adiciona espaço extra quando o teclado aparece
      enableOnAndroid={true} // habilita para Android
      keyboardShouldPersistTaps="handled" // fecha o teclado ao tocar fora
      scrollEnabled={isInputFocused} // habilita o scroll apenas quando algum input estiver focado
    >
      <View className="h-36 justify-center pt-10">
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.replace("/")}
            className="left-7 absolute"
          >
            <ArrowLeft size={30} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text className="font-bold text-xl">Nova Refeição</Text>
        </View>
      </View>

      <View
        className="px-7 pt-10 bg-GRAY-300 flex-1 h-screen"
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        <View className="mb-8">
          <Label title="Nome" />
          <Input
            onChangeText={setName}
            value={name}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
          />
        </View>

        <View className="mb-8">
          <Label title="Descrição" />
          <Input
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            onChangeText={setDescription}
            value={description}
            multiline
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
              onPress={() => setShowDatePicker(true)}
              className="border border-GRAY-500 rounded-md p-4 h-16 justify-center mb-2.5"
            >
              <Text className="text-xl">{formattedDate}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={date}
                mode="date"
                locale="pt-br"
                themeVariant="light"
                onChange={handleDateChange}
              />
            )}
          </View>

          <View className="w-36 flex-1">
            <Label title="Hora" />
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              className="border border-GRAY-500 rounded-md p-4 h-16 justify-center mb-2.5"
            >
              <Text className="text-xl">{formattedHour}</Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={hour}
                mode="time"
                themeVariant="light"
                is24Hour={true}
                onChange={handleTimeChange}
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
    </KeyboardAwareScrollView>
  );
}
