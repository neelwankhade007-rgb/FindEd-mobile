import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "@/constants/colors";

export default function ProfileScreen() {
  return (
    <View className="flex-1 items-center justify-center" style={{ backgroundColor: COLORS.background }}>
      <Text className="text-xl font-bold" style={{ color: COLORS.text }}>
        Coming Soon
      </Text>
    </View>
  );
}
