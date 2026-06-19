import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "@/constants/colors";
import type { CourseJourney } from "../courseData";

interface JourneyHeaderProps {
  journey: CourseJourney;
}

export default function JourneyHeader({ journey }: JourneyHeaderProps) {
  const { title, description, progress, completedLessons, totalLessons, category } =
    journey;

  return (
    <View style={styles.container}>
      {/* Top bar: back button + category */}
      <View style={styles.topBar}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Ionicons name="arrow-back" size={20} color="#FFF" />
        </Pressable>

        <View style={styles.categoryBadge}>
          <Ionicons name="school-outline" size={12} color={COLORS.accent} />
          <Text style={styles.categoryText}>{category}</Text>
        </View>

        {/* Progress percentage */}
        <View style={styles.progressBadge}>
          <Text style={styles.progressBadgeText}>{progress}%</Text>
        </View>
      </View>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Description */}
      <Text style={styles.description}>{description}</Text>

      {/* Progress bar */}
      <View style={styles.progressSection}>
        <View style={styles.progressBarBg}>
          <View
            style={[styles.progressBarFill, { width: `${progress}%` }]}
          />
        </View>
        <Text style={styles.lessonCount}>
          {completedLessons} of {totalLessons} completed
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.12)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryText: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.accent,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  progressBadge: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  progressBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#FFF",
  },
  title: {
    fontSize: 20,
    fontWeight: "800",
    color: "#FFF",
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontWeight: "500",
    color: "rgba(255,255,255,0.75)",
    lineHeight: 16,
    marginBottom: 10,
  },
  progressSection: {
    gap: 6,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 2.5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 2.5,
  },
  lessonCount: {
    fontSize: 10,
    fontWeight: "600",
    color: "rgba(255,255,255,0.65)",
  },
});
