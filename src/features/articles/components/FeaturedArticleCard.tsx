import React from "react";
import { View, Text, Image, Pressable } from "react-native";
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
          backgroundColor: "#FFFFFF",

          borderRadius: 28,

          marginBottom: 24,

          opacity: pressed ? 0.96 : 1,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: 12,
          },

          shadowOpacity: 0.16,

          shadowRadius: 24,

          elevation: 12,
        },
      ]}
    >
      <Image
        source={require("../../../../assets/images/featured.png")}
        style={{
          width: "100%",
          height: 220,
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
        resizeMode="cover"
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