import { Image, Pressable, View } from "react-native";
import LogoImg from "@/assets/logo/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import { dietStorage } from "@/storage/dietStorage";
import { Popup } from "./popup";
import * as FileSystem from "expo-file-system";

export function Header() {
  const [avatarUri, setAvatarUri] = useState<string | null>(null);
  const [popup, setPopup] = useState({
    visible: false,
    title: "",
    description: "",
  });

  useEffect(() => {
    const loadAvatar = async () => {
      try {
        const savedUri = await dietStorage.getAvatar();
        if (savedUri) {
          setAvatarUri(savedUri);
        }
      } catch (error) {
        console.error(error);
        return setPopup({
          visible: true,
          title: "Erro ao carregar o avatar",
          description: "",
        });
      }
    };

    loadAvatar();
  }, []); // O array vazio [] garante que o efeito será executado apenas uma vez, quando o componente for montado

  async function handleSelectAvatar() {
    try {
      // solicita permissão para acessar a galeria de fotos do dispositivo
      const permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      // se a permissão for negada, exibe um alerta e retorna
      if (!permissionResult.granted) {
        return setPopup({
          visible: true,
          title: "Permissão Negada",
          description: "É necessário permitir o acesso à galeria.",
        });
      }

      // caso a permissão tenha sido concedida, abre a galeria para selecionar uma imagem
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        quality: 1,
        aspect: [4, 4], // formato da imagem
        allowsEditing: true, // editar imagem
      });

      // se o usuário não cancelar a seleção de imagem
      if (!result.canceled) {
        // obtém o URI da imagem selecionada
        const selectedImageUri = result.assets[0].uri;

        // verifica o tamanho do arquivo selecionado
        const fileInfo = await FileSystem.getInfoAsync(selectedImageUri);

        if (
          fileInfo.exists &&
          fileInfo.size &&
          fileInfo.size / 1024 / 1024 > 5
        ) {
          return setPopup({
            visible: true,
            title: "Imagem muito grande!",
            description: "Escolha uma imagem de até 5MB.",
          });
        }

        // salva o URI da imagem no armazenamento
        await dietStorage.saveAvatar(selectedImageUri);

        // atualiza o estado com o URI da imagem selecionada
        setAvatarUri(selectedImageUri);
      }
    } catch (error) {
      console.error(error);
      return setPopup({
        visible: true,
        title: "Erro ao selecionar o avatar",
        description: "Por favor, tente novamente mais tarde...",
      });
    }
  }

  return (
    <View className="flex-row items-center justify-between pt-10 pb-10">
      <Image source={LogoImg} className="w-24 h-10" />

      <Pressable onPress={handleSelectAvatar}>
        <Avatar className="size-11 border">
          {avatarUri ? (
            // caso o usuário tenha escolhido um avatar
            <AvatarImage source={{ uri: avatarUri }} />
          ) : avatarUri === null ? (
            // caso o avatar seja nulo ou inexistente, mostra a imagem padrão (externa)
            <AvatarImage source={{ uri: "https://github.com/0kira-vgl.png" }} />
          ) : (
            <AvatarFallback>A</AvatarFallback>
          )}
        </Avatar>
      </Pressable>

      <Popup
        title={popup.title}
        description={popup.description}
        showModal={popup.visible}
        onClose={() => setPopup({ ...popup, visible: false })} // "...popup" atualiza o estado
      />
    </View>
  );
}
