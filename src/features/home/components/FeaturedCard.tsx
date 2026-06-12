import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export default function FeaturedCard() {
  return (
    <View 
      className="p-5 rounded-[28px] border shadow-sm"
      style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}
    >
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-3">
        <Text className="font-extrabold text-lg" style={{ color: COLORS.text }}>
          Featured
        </Text>
        <Pressable className="flex-row items-center gap-1">
          <Text className="text-xs font-semibold" style={{ color: COLORS.textSecondary }}>
            View More
          </Text>
          <Ionicons name="arrow-forward" size={12} color={COLORS.textSecondary} />
        </Pressable>
      </View>

      {/* Featured Thumbnail (Full Image Stacked) */}
      <View className="rounded-2xl overflow-hidden mb-3 border" style={{ borderColor: COLORS.border }}>
        <Image
          source={require("../../../../assets/images/featured.png")} // Relocated relative path: 4 levels up
          className="w-full h-48"
          resizeMode="cover"
        />
      </View>

      {/* Article Title */}
      <Text className="font-extrabold text-base leading-5 text-slate-800" numberOfLines={2}>
        Asylum And Extradition: Meaning And Purpose
      </Text>
    </View>
  );
}
