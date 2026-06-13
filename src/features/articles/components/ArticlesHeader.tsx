import React from "react";
import { View, Text } from "react-native";
import { COLORS } from "@/constants/colors";

export default function ArticlesHeader() {
  return (
    <View className="px-6 pt-6 pb-2">
      <Text className="text-3xl font-extrabold" style={{ color: COLORS.text }}>
        Articles
      </Text>
    </View>
  );
}
