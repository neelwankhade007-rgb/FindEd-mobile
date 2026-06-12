import { COLORS } from "@/constants/colors";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function ProfileCard() {
  return (
    <View
      className="p-6 rounded-[32px] items-center shadow-md gap-4"
      style={{ backgroundColor: COLORS.primary }}
    >
      {/* Avatar Container with Edit Button */}
      <View className="relative">
        <Image
          source={require("../../../../assets/website/avatar.jpg")} // Relocated relative path: 4 levels up
          className="w-20 h-20 rounded-full border-2 border-white/20"
          resizeMode="cover"
        />
        <Pressable
          className="absolute bottom-0 right-0 bg-white w-7 h-7 rounded-full items-center justify-center shadow"
          style={{ elevation: 2 }}
        >
          <FontAwesome5 name="pencil-alt" size={10} color={COLORS.text} />
        </Pressable>
      </View>

      {/* User Name */}
      <Text className="text-white text-2xl font-bold tracking-wide text-center">
        John Doe
      </Text>

      {/* Stats Pills Row */}
      <View className="flex-row justify-between w-full gap-2 px-1">
        {/* XP Pill */}
        <View className="bg-white flex-row items-center justify-center py-2 px-4 rounded-full flex-1 gap-1.5 shadow-sm">
          <Ionicons name="star-outline" size={15} color={COLORS.text} />
          <Text className="font-bold text-sm" style={{ color: COLORS.text }}>320</Text>
        </View>

        {/* Streak Pill */}
        <View className="bg-white flex-row items-center justify-center py-2 px-4 rounded-full flex-1 gap-1.5 shadow-sm">
          <Ionicons name="flame-outline" size={15} color={COLORS.text} />
          <Text className="font-bold text-sm" style={{ color: COLORS.text }}>4</Text>
        </View>

        {/* Rank Pill */}
        <View className="bg-white flex-row items-center justify-center py-2 px-4 rounded-full flex-1 gap-1.5 shadow-sm">
          <Ionicons name="podium-outline" size={15} color={COLORS.text} />
          <Text className="font-bold text-sm" style={{ color: COLORS.text }}>203</Text>
        </View>
      </View>
    </View>
  );
}
