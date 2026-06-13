import React from "react";
import { ScrollView, Pressable, Text, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

interface CategoryChipsProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryChips({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryChipsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      className="py-4"
    >
      {categories.map((category) => {
        const isActive = category === selectedCategory;

        return (
          <Pressable
            key={category}
            onPress={() => onSelectCategory(category)}
            className="px-4 py-2.5 rounded-full"
            style={{
              backgroundColor: isActive
                ? COLORS.primary
                : "#F4F4F5",
            }}
          >
            <Text
              className="text-sm font-semibold"
              style={{
                color: isActive
                  ? "#FFFFFF"
                  : COLORS.textSecondary,
              }}
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
    gap: 10,
  },
});