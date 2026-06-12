import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

export default function ContinueLearningCard() {
  return (
    <View 
      className="p-4 rounded-[28px] border shadow-sm"
      style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}
    >
      {/* Header Row */}
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-extrabold text-lg" style={{ color: COLORS.text }}>
          My Learning
        </Text>
        <Pressable className="flex-row items-center gap-1">
          <Text className="text-xs font-bold" style={{ color: COLORS.primary }}>
            View More
          </Text>
          <Ionicons name="arrow-forward" size={13} color={COLORS.primary} />
        </Pressable>
      </View>

      {/* Course Info Row */}
      <View className="flex-row gap-4 items-center">
        {/* Course Icon/Thumbnail (Proper Rectangular Rounded Image) */}
        <Image
          source={require("../../../../assets/images/course_1.png")} // Relocated relative path: 4 levels up
          className="w-28 h-20 rounded-2xl"
          resizeMode="stretch"
        />

        {/* Info Section */}
        <View className="flex-1 justify-center">
          <Text className="font-extrabold text-base text-slate-800" numberOfLines={1}>
            Budgeting and Saving
          </Text>

          {/* Progress Bar Row */}
          <View className="w-full h-1.5 bg-slate-100 rounded-full mt-2 mb-2 overflow-hidden">
            <View className="h-full rounded-full" style={{ width: "60%", backgroundColor: COLORS.primary }} />
          </View>

          {/* Continue Learning Button (Orange) */}
          <Pressable 
            className="py-2 px-3.5 rounded-xl flex-row items-center justify-center gap-1 shadow-sm self-start"
            style={{ backgroundColor: COLORS.accent }} // Orange button matching screenshot
          >
            <Text className="text-white font-bold text-xs">Continue Learning</Text>
            <Ionicons name="arrow-forward" size={13} color="white" />
          </Pressable>
        </View>
      </View>
    </View>
  );
}
