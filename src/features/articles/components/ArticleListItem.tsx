import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";
import { Article } from "../articleData";

interface ArticleListItemProps {
  article: Article;
  onPress: () => void;
}

export default function ArticleListItem({ article, onPress }: ArticleListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      className="p-3.5 rounded-[20px] border shadow-sm flex-row gap-3.5 mb-3"
      style={({ pressed }) => [
        {
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
          opacity: pressed ? 0.95 : 1,
        },
      ]}
    >
      {/* Thumbnail Left */}
      <View className="rounded-xl overflow-hidden border" style={{ borderColor: COLORS.border }}>
        <Image
          source={require("../../../../assets/images/course_1.png")}
          className="w-20 h-20"
          resizeMode="cover"
        />
      </View>

      {/* Content Right */}
      <View className="flex-1 justify-center">
        {/* Category & Date Row */}
        <View className="flex-row items-center gap-1.5 mb-1">
          <Text className="text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.primary }}>
            {article.category}
          </Text>
          <Text className="text-xs" style={{ color: COLORS.textSecondary }}>•</Text>
          <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
            {article.date}
          </Text>
        </View>

        {/* Title */}
        <Text 
          className="font-extrabold text-sm leading-4 mb-1" 
          style={{ color: COLORS.text }}
          numberOfLines={2}
        >
          {article.title}
        </Text>

        {/* Excerpt */}
        <Text 
          className="text-xs leading-4" 
          style={{ color: COLORS.textSecondary }}
          numberOfLines={1}
        >
          {article.excerpt}
        </Text>
      </View>
    </Pressable>
  );
}
