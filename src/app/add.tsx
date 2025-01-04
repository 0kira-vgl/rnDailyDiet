import { Button } from "@/components/button";
import { NoButton, YesButton } from "@/components/dietButton";
import { Input } from "@/components/input";
import { Label } from "@/components/label";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { View, Text, TouchableOpacity } from "react-native";

export default function Add() {
  return (
    <View className="flex-1">
      <View className="bg-GRAY-500 h-36 justify-center pt-10">
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="left-7 absolute"
          >
            <ArrowLeft size={30} color="#333638" />
          </TouchableOpacity>
          <Text className="font-bold text-xl">Nova Refeição</Text>
        </View>
      </View>

      <View className="px-7 pt-12">
        <View className="mb-8">
          <Label title="Nome" />
          <Input />
        </View>

        <View className="mb-8">
          <Label title="Descrição" />
          <Input
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
            <Input placeholder="dd/mm/aaaa" />
          </View>

          <View className="w-36 flex-1">
            <Label title="Hora" />
            <Input placeholder="hh:mm" keyboardType="numbers-and-punctuation" />
          </View>
        </View>

        <Label title="Está dentro da dieta?" />
        <View className="justify-between flex-row gap-7">
          <YesButton />
          <NoButton />
        </View>

        <Button className="mt-20">
          <Button.Title>Cadastrar refeição</Button.Title>
        </Button>
      </View>
    </View>
  );
}
