import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
import { COLORS } from "@/constants/colors";
import { Article } from "../articleData";

interface FeaturedArticleCardProps {
  article: Article;
  onPress: () => void;
}

export default function FeaturedArticleCard({
  article,
  onPress,
}: FeaturedArticleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
          borderWidth: 1,

          borderRadius: 16,

          marginBottom: 20,

          opacity: pressed ? 0.96 : 1,
        },
      ]}
    >
      <Image
        source={article.image || require("../../../../assets/images/featured.png")}
        style={{
          width: "100%",
          aspectRatio: 16 / 9,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
        }}
        contentFit="cover"
        contentPosition={(article.focalPoint as any) || "center"}
      />

      <View className="p-5">
        <View className="flex-row items-center mb-3">
          <View
            style={{
              backgroundColor: COLORS.primary,
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 999,
            }}
          >
            <Text
              style={{
                color: "#FFFFFF",
                fontSize: 11,
                fontWeight: "700",
              }}
            >
              {article.category}
            </Text>
          </View>

          <Text
            style={{
              marginLeft: 10,
              color: "#9CA3AF",
              fontSize: 12,
            }}
          >
            {article.date}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={{
            color: COLORS.text,
            fontSize: 26,
            fontWeight: "800",
            lineHeight: 34,
            marginBottom: 10,
          }}
        >
          {article.title}
        </Text>

        <Text
          numberOfLines={3}
          style={{
            color: COLORS.textSecondary,
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          {article.excerpt}
        </Text>
      </View>
    </Pressable>
  );
}