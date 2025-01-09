import { Button } from "@/components/button";
import { DietProps, dietStorage } from "@/storage/dietStorage";
import { colors } from "@/styles/colors";
import { useRoute } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import { ArrowLeft, Edit3, Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Modal } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Details() {
  const [item, setItem] = useState<DietProps | null>(null);
  const [showModal, setShowModal] = useState(false);

  const route = useRoute();
  const { id } = route.params as DietProps;

  const navigation = useNavigation();

  async function getItem() {
    try {
      const response = await dietStorage.get();
      const items = response.find((item) => item.id === id);

      setItem(items || null);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar os detalhes da refeição");
      console.log(error);
    }
  }

  async function itemRemove() {
    try {
      await dietStorage.remove(id);
      getItem();
      router.replace("/");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a refeição");
      console.log(error);
    }
  }

  function handleRemove() {
    itemRemove();
  }

  useEffect(() => {
    getItem();
  }, [id]);

  return (
    <View
      className={twMerge(
        "flex-1",
        item?.inDiet === true ? "bg-GREEN-300" : "bg-RED-300"
      )}
    >
      <View className="h-36 justify-center pt-10">
        <View className="flex-row items-center justify-center relative">
          <TouchableOpacity
            onPress={() => router.back()}
            className="left-7 absolute"
          >
            <ArrowLeft size={30} color={colors.gray[800]} />
          </TouchableOpacity>
          <Text className="font-bold text-xl">Refeição</Text>
        </View>
      </View>

      <View
        className="px-7 pt-10 bg-GRAY-300 flex-1"
        style={{
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
        }}
      >
        <View className="mb-7">
          <Text className="text-xl font-bold mb-4">{item?.name}</Text>
          <Text className="text-lg">{item?.description}</Text>
        </View>

        <Text className="text-xl font-bold mb-1.5">Data e hora</Text>
        <View className="flex-row mb-7">
          <Text className="text-xl">{item?.date} </Text>
          <Text className="text-xl">ás </Text>
          <Text className="text-xl">{item?.hour}</Text>
        </View>

        <View className="flex-row items-center gap-2.5 bg-GRAY-400 rounded-full w-44 h-10 justify-center">
          {item?.inDiet ? (
            <>
              <View className="size-2.5 bg-GREEN-900 rounded-full" />
              <Text className="text-lg">dentro da dieta</Text>
            </>
          ) : (
            <>
              <View className="size-2.5 bg-RED-900 rounded-full" />
              <Text className="text-lg">fora da dieta</Text>
            </>
          )}
        </View>

        <View className="gap-2.5 flex-1 justify-end pb-20">
          <Button onPress={() => navigation.navigate("edit", { id })}>
            <Edit3 size={20} color={colors.gray[300]} />
            <Button.Title>Editar refeição</Button.Title>
          </Button>

          <Button
            className="border border-bg-GRAY-800 bg-transparent"
            onPress={() => setShowModal(true)}
          >
            <Trash2 size={20} color={colors.gray[800]} />
            <Button.Title className="text-GRAY-800">
              Excluir refeição
            </Button.Title>
          </Button>
        </View>
      </View>

      <Modal transparent visible={showModal}>
        <View
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)", // deixa o fundo "meio escuro"
          }}
          className="flex-1 justify-center items-center px-12"
        >
          <View className="bg-GRAY-300 rounded-lg py-8 px-8">
            <Text className="text-GRAY-800 font-bold text-xl text-center">
              Deseja realmente excluir o registro da refeição?
            </Text>

            <View className="flex-row justify-between w-full mt-8 gap-4">
              <Button
                onPress={() => setShowModal(false)}
                className="border border-bg-GRAY-800 bg-transparent flex-1"
              >
                <Button.Title className="text-GRAY-800">Cancelar</Button.Title>
              </Button>

              <Button onPress={handleRemove} className="flex-1">
                <Button.Title>Sim, exluir</Button.Title>
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
