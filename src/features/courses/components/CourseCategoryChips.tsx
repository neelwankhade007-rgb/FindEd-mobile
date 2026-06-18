import React from "react";
import { ScrollView, Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

interface CourseCategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CourseCategoryChips({
  categories,
  selectedCategory,
  onSelectCategory,
}: CourseCategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {categories.map((category) => {
        const isActive = category === selectedCategory;

        return (
          <Pressable
            key={category}
            onPress={() => onSelectCategory(category)}
            style={({ pressed }) => [
              styles.chip,
              {
                backgroundColor: isActive ? COLORS.primary : "#F4F4F5",
                borderColor: isActive ? COLORS.primary : COLORS.border,
                opacity: pressed ? 0.85 : 1,
                transform: [{ scale: pressed ? 0.96 : 1 }],
              },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                {
                  color: isActive ? "#FFFFFF" : COLORS.textSecondary,
                },
              ]}
            >
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  chipText: {
    fontSize: 13,
    fontWeight: "600",
  },
});
