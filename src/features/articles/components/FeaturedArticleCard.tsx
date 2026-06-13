import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";
import { Article } from "../articleData";

interface FeaturedArticleCardProps {
  article: Article;
  onPress: () => void;
}

export default function FeaturedArticleCard({ article, onPress }: FeaturedArticleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="p-4 rounded-[28px] border shadow-sm mb-6"
      style={({ pressed }) => [
        {
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
          opacity: pressed ? 0.95 : 1,
          transform: [{ scale: pressed ? 0.99 : 1 }],
        },
      ]}
    >
      {/* Featured Image with Badge overlay */}
      <View className="rounded-2xl overflow-hidden mb-3 border relative" style={{ borderColor: COLORS.border }}>
        <Image
          source={require("../../../../assets/images/featured.png")}
          className="w-full h-48"
          resizeMode="cover"
        />
        {/* Category Badge overlay */}
        <View 
          className="absolute top-3 left-3 px-3 py-1 rounded-full shadow-sm"
          style={{ backgroundColor: COLORS.primary }}
        >
          <Text className="text-white text-xs font-bold uppercase tracking-wider">
            {article.category}
          </Text>
        </View>
      </View>

      {/* Date */}
      <Text className="text-xs font-semibold mb-1" style={{ color: COLORS.textSecondary }}>
        {article.date}
      </Text>

      {/* Title */}
      <Text 
        className="font-extrabold text-xl leading-6 mb-2" 
        style={{ color: COLORS.text }}
        numberOfLines={2}
      >
        {article.title}
      </Text>

      {/* Excerpt */}
      <Text 
        className="text-sm leading-5" 
        style={{ color: COLORS.textSecondary }}
        numberOfLines={2}
      >
        {article.excerpt}
      </Text>
    </Pressable>
  );
}
