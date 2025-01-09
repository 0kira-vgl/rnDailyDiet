import { View, Text, Image } from "react-native";
import InPeopleImg from "@/assets/peopleDiet/withinDiet/people.png";
import OutPeopleImg from "@/assets/peopleDiet/offDiet/people.png";
import { Button } from "../components/button";
import { useRoute } from "@react-navigation/native";
import { DietProps } from "@/storage/dietStorage";
import React from "react";
import { router } from "expo-router";

export default function Feedback() {
  const route = useRoute();
  const { inDiet } = route.params as DietProps;

  return (
    <View className="flex-1 justify-center items-center">
      <View className="justify-center items-center px-10">
        {inDiet ? (
          <>
            <Text className="text-GREEN-900 font-bold text-3xl mb-3">
              Continue assim!
            </Text>
            <Text className="text-GRAY-900 text-lg">
              Você continua {""}
              <Text className="font-bold">dentro da dieta.</Text> {""}
              Muito bem!
            </Text>

            <Image source={InPeopleImg} className="mt-10" />
          </>
        ) : (
          <>
            <Text className="text-RED-900 font-bold text-3xl mb-3">
              Que pena!
            </Text>
            <Text className="text-GRAY-900 text-lg text-center">
              Você{""}
              <Text className="font-bold"> saiu da dieta</Text> {""}
              dessa vez, mas continue se esforçando e não desista!
            </Text>

            <Image source={OutPeopleImg} className="mt-10" />
          </>
        )}

        <Button
          className="mt-10 gap-0 flex-col px-10"
          onPress={() => router.replace("/")} // Alterado para router.replace
        >
          <Button.Title>Ir para a página inicial</Button.Title>
        </Button>
      </View>
    </View>
  );
}
