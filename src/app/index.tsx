import { View, Text } from "react-native";
import { Button } from "../components/button";
import { Plus } from "lucide-react-native";
import { colors } from "../styles/colors";
import { Header } from "@/components/header";

export default function App() {
  return (
    <View className="flex-1 p-6">
      <Header />

      <Button>
        <Plus size={24} color={colors.gray[300]} />
        <Button.Title>Nova refeição</Button.Title>
      </Button>
    </View>
  );
}
