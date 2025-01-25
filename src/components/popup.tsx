import { Modal, ModalProps, View, Text } from "react-native";
import { Button } from "./button";

type PopupProps = ModalProps & {
  title: string;
  description: string;
  showModal: boolean;
  onClose: () => void;
};

export function Popup({ title, description, showModal, onClose }: PopupProps) {
  return (
    <Modal transparent visible={showModal}>
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // deixa o fundo "meio escuro"
        }}
        className="flex-1 justify-center items-center px-12"
      >
        <View className="bg-GRAY-300 rounded-lg py-8 px-8">
          <Text className="text-GRAY-800 font-bold text-xl text-center">
            {title}
          </Text>

          <Text className="text-GRAY-700 font-bold text-sm text-center mt-1.5">
            {description}
          </Text>

          <View className="flex-row justify-between w-full mt-7 gap-4">
            <Button
              onPress={onClose}
              className="border border-bg-GRAY-800 bg-transparent flex-1"
            >
              <Button.Title className="text-GRAY-800">Ok</Button.Title>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
