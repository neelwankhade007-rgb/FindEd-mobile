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
  const { title, progress } = journey;

  return (
    <View style={styles.headerContainer}>
      <View style={styles.headerTopRow}>
        {/* Back button on left without border */}
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Ionicons name="arrow-back" size={24} color="#0B0F19" />
        </Pressable>

        {/* Course Info text column */}
        <View style={styles.infoColumn}>
          <Text style={styles.courseTitle} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.progressText}>
            {progress}% Complete
          </Text>
        </View>
      </View>

      {/* Progress Bar below title */}
      <View style={styles.progressBarWrapper}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  infoColumn: {
    flex: 1,
    justifyContent: "center",
    gap: 2,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  progressText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#4F46E5",
  },
  progressBarWrapper: {
    marginTop: 14,
    paddingHorizontal: 4,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 3,
  },
});
