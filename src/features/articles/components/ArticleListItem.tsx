import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "expo-image";
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
          backgroundColor: COLORS.surface,
          borderColor: COLORS.border,
          borderWidth: 1,

          marginBottom: 12,

          borderRadius: 12,

          opacity: pressed ? 0.96 : 1,
        },
      ]}
    >
      <View className="flex-row p-4 items-center justify-between">
        <View className="flex-1 mr-4 justify-center">
          <View className="flex-row items-center mb-1.5">
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 11,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {article.category}
            </Text>

            <Text
              style={{
                marginHorizontal: 6,
                color: "#9CA3AF",
              }}
            >
              •
            </Text>

            <Text
              style={{
                color: "#9CA3AF",
                fontSize: 11,
              }}
            >
              {article.date}
            </Text>
          </View>

          <Text
            numberOfLines={2}
            style={{
              color: COLORS.text,
              fontSize: 17,
              fontWeight: "800",
              lineHeight: 22,
              marginBottom: 4,
            }}
          >
            {article.title}
          </Text>

          <Text
            numberOfLines={2}
            style={{
              color: COLORS.textSecondary,
              fontSize: 13,
              lineHeight: 18,
            }}
          >
            {article.excerpt}
          </Text>
        </View>

        <Image
          source={article.image || require("../../../../assets/images/course_1.png")}
          style={{
            width: 96,
            height: 72,
            borderRadius: 6,
          }}
          contentFit="cover"
          contentPosition={(article.focalPoint as any) || "center"}
        />
      </View>
    </Pressable>
  );
}