import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { MOCK_ARTICLES } from "./articleData";

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  // Fallback to first article if not found
  const article = MOCK_ARTICLES.find((a) => a.id === id) || MOCK_ARTICLES[0];

  const renderBody = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      const trimmed = paragraph.trim();
      if (trimmed.startsWith("### ")) {
        return (
          <Text key={index} className="text-lg font-extrabold mt-5 mb-2" style={{ color: COLORS.text }}>
            {trimmed.replace("### ", "")}
          </Text>
        );
      }
      
      // Check for bullet lists
      if (trimmed.startsWith("- ")) {
        return (
          <View key={index} className="pl-4 mb-3">
            {trimmed.split("\n").map((item, itemIdx) => (
              <Text key={itemIdx} className="text-sm leading-6 mb-1" style={{ color: COLORS.textSecondary }}>
                • {item.replace("- ", "")}
              </Text>
            ))}
          </View>
        );
      }

      // Check for numbered lists
      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <View key={index} className="pl-4 mb-3">
            {trimmed.split("\n").map((item, itemIdx) => (
              <Text key={itemIdx} className="text-sm leading-6 mb-1" style={{ color: COLORS.textSecondary }}>
                {item}
              </Text>
            ))}
          </View>
        );
      }

      return (
        <Text key={index} className="text-sm leading-6 mb-4" style={{ color: COLORS.textSecondary }}>
          {trimmed}
        </Text>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Navigation Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b" style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}>
        <Pressable
          onPress={() => router.back()}
          className="flex-row items-center gap-1.5 p-1"
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.primary} />
          <Text className="text-base font-semibold" style={{ color: COLORS.primary }}>
            Back
          </Text>
        </Pressable>
        <Text className="text-sm font-bold uppercase tracking-wider" style={{ color: COLORS.textSecondary }}>
          {article.category}
        </Text>
        <View style={{ width: 60 }} /> {/* Spacer to balance header */}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <View className="border-b" style={{ borderColor: COLORS.border }}>
          <Image
            source={require("../../../assets/images/featured.png")}
            className="w-full h-56"
            resizeMode="cover"
          />
        </View>

        {/* Content Container */}
        <View className="p-6">
          {/* Category & Date Row */}
          <View className="flex-row items-center gap-2 mb-2">
            <Text className="text-xs font-bold uppercase tracking-wider" style={{ color: COLORS.primary }}>
              {article.category}
            </Text>
            <Text className="text-xs" style={{ color: COLORS.textSecondary }}>•</Text>
            <Text className="text-xs" style={{ color: COLORS.textSecondary }}>
              {article.date}
            </Text>
          </View>

          {/* Title */}
          <Text className="text-2xl font-extrabold leading-8 mb-4" style={{ color: COLORS.text }}>
            {article.title}
          </Text>

          {/* Metadata Chips Row */}
          <View className="flex-row flex-wrap gap-2 mb-6">
            <View className="px-3 py-1 rounded-md border" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
              <Text className="text-xs font-semibold" style={{ color: COLORS.textSecondary }}>
                📈 {article.level}
              </Text>
            </View>
            <View className="px-3 py-1 rounded-md border" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
              <Text className="text-xs font-semibold" style={{ color: COLORS.textSecondary }}>
                ⏱️ {article.readTime}
              </Text>
            </View>
            <View className="px-3 py-1 rounded-md border" style={{ backgroundColor: COLORS.surface, borderColor: COLORS.border }}>
              <Text className="text-xs font-semibold" style={{ color: COLORS.textSecondary }}>
                🏷️ {article.category}
              </Text>
            </View>
          </View>

          {/* Summary */}
          <View className="p-4 rounded-2xl border-l-4 mb-6" style={{ backgroundColor: COLORS.surface, borderLeftColor: COLORS.primary, borderColor: COLORS.border, borderWidth: 1 }}>
            <Text className="text-sm font-semibold italic leading-5" style={{ color: COLORS.text }}>
              {article.summary}
            </Text>
          </View>

          {/* Article Body */}
          <View className="mt-2">
            {renderBody(article.body)}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
});
