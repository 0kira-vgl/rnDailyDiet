import { Image, View } from "react-native";
import LogoImg from "@/assets/logo/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";

export function Header() {
  return (
    <View className="flex-row items-center justify-between pt-3 pb-12">
      <Image source={LogoImg} className="w-24 h-10" />

      <Avatar className="size-11 border">
        <AvatarImage source={{ uri: "https://github.com/0kira-vgl.png" }} />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </View>
  );
}
