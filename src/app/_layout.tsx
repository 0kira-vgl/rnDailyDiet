import "../styles/global.css";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack } from "expo-router";
import { colors } from "../styles/colors";

export default function Layout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="transparent" translucent />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.gray[300] }, // cor de fundo do app
        }}
      />
    </>
  );
}
