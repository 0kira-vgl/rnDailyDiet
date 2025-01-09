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
import { View, Text, TouchableOpacity, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { parse, format } from "date-fns";

export default function Edit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [hour, setHour] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedOption, setSelectedOption] = useState<"in" | "out" | null>(
    null
  ); // estado para controlar qual botão está selecionado

  const route = useRoute();
  const { id } = route.params as DietProps;

  // formatação
  const formattedDate = format(date, "dd/MM/yyyy");
  const formattedHour = format(hour, "HH:mm");

  // converte as strings para objetos Date usando o date-fns
  const parseDate = (dateString: string) =>
    parse(dateString, "dd/MM/yyyy", new Date());
  const parseTime = (timeString: string) =>
    parse(timeString, "HH:mm", new Date());

  async function getItem() {
    try {
      const response = await dietStorage.get();
      const item = response.find((item) => item.id === id);

      if (item) {
        setName(item.name);
        setDescription(item.description);
        setDate(parseDate(item.date)); // converte a string de data para Date
        setHour(parseTime(item.hour));
        setSelectedOption(item.inDiet ? "in" : "out"); // converte o booleano para o formato esperado
      } else {
        Alert.alert("Erro", "Refeição não encontrada!");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da refeição");
      console.log(error);
    }
  }

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

  async function handleSave() {
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

      await dietStorage.update(id, {
        id,
        name,
        description,
        date: format(date, "dd/MM/yyyy"), // formata a data
        hour: format(hour, "HH:mm"),
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
    <View className="flex-1 bg-GRAY-500">
      <View className="h-36 justify-center pt-10">
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
        className="px-7 pt-10 bg-GRAY-300 flex-1"
        style={{ borderTopEndRadius: 20, borderTopStartRadius: 20 }}
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
            style={{ textAlignVertical: "top", fontSize: 16 }}
          />
        </View>

        <View className="mb-8 justify-between flex-row gap-7">
          <View className="flex-1 w-36">
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
                locale="pt-BR"
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
                locale="pt-BR"
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

        <Button className="mt-8" onPress={handleSave}>
          <Button.Title>Salvar alterações</Button.Title>
        </Button>
      </View>
    </View>
  );
}
