import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { COLORS } from "@/constants/colors";
import { Article } from "../articleData";

interface ArticleListItemProps {
  article: Article;
  onPress: () => void;
}

export default function ArticleListItem({
  article,
  onPress,
}: ArticleListItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        {
          backgroundColor: "#FFFFFF",

          marginBottom: 16,

          borderRadius: 24,

          opacity: pressed ? 0.96 : 1,

          shadowColor: "#000",

          shadowOffset: {
            width: 0,
            height: 10,
          },

          shadowOpacity: 0.14,

          shadowRadius: 20,

          elevation: 10,
        },
      ]}
    >
      <View className="flex-row p-4">
        <Image
          source={require("../../../../assets/images/course_1.png")}
          style={{
            width: 110,
            height: 110,
            borderRadius: 18,
          }}
          resizeMode="cover"
        />

        <View className="flex-1 ml-4 justify-center">
          <View className="flex-row items-center mb-2">
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 12,
                fontWeight: "700",
              }}
            >
              {article.category}
            </Text>

            <Text
              style={{
                marginHorizontal: 8,
                color: "#9CA3AF",
              }}
            >
              •
            </Text>

            <Text
              style={{
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
              fontSize: 20,
              fontWeight: "800",
              lineHeight: 26,
              marginBottom: 6,
            }}
          >
            {article.title}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: COLORS.textSecondary,
              fontSize: 14,
              lineHeight: 20,
            }}
          >
            {article.excerpt}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}