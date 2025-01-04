import {
  View,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
} from "react-native";

const YesButton = ({ ...rest }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      className="h-16 flex-1 rounded-md bg-GRAY-400 flex-row items-center justify-center gap-2"
      {...rest}
    >
      <View className="size-2 bg-GREEN-900 rounded-full" />

      <Text className="font-bold">Sim</Text>
    </TouchableOpacity>
  );
};

const NoButton = ({ ...rest }: TouchableOpacityProps) => {
  return (
    <TouchableOpacity
      className="h-16 flex-1 rounded-md bg-GRAY-400 flex-row items-center justify-center gap-2"
      {...rest}
    >
      <View className="size-2 bg-RED-900 rounded-full" />

      <Text className="font-bold">Não</Text>
    </TouchableOpacity>
  );
};

export { YesButton, NoButton };
