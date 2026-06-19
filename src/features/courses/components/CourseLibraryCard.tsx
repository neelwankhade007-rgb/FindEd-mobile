import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { COLORS } from "@/constants/colors";
import { Course } from "../courseData";

// Category badge color mapping
const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  Basics: { bg: "#FEF3C7", text: "#92400E" },
  Investing: { bg: "#EDE9FE", text: "#5B21B6" },
  Taxation: { bg: "#DBEAFE", text: "#1E40AF" },
  "Personal Finance": { bg: "#D1FAE5", text: "#065F46" },
  Retirement: { bg: "#FEE2E2", text: "#991B1B" },
};

interface CourseLibraryCardProps {
  course: Course;
  onPress?: () => void;
}

export default function CourseLibraryCard({
  course,
  onPress,
}: CourseLibraryCardProps) {
  const categoryColor = CATEGORY_COLORS[course.category] || {
    bg: "#F3F4F6",
    text: COLORS.textSecondary,
  };

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else {
      router.push(`/course-journey?courseId=${course.id}`);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed ? 0.97 : 1,
          transform: [{ scale: pressed ? 0.985 : 1 }],
        },
      ]}
    >
      {/* Cover Image */}
      <View style={styles.imageContainer}>
        <Image
          source={course.image}
          style={styles.image}
          contentFit="cover"
          transition={300}
        />

        {/* Category Badge */}
        <View
          style={[styles.categoryBadge, { backgroundColor: categoryColor.bg }]}
        >
          <Text
            style={[styles.categoryBadgeText, { color: categoryColor.text }]}
          >
            {course.category.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* Card Body */}
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>
          {course.title}
        </Text>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {course.description}
        </Text>

        {/* Progress Bar (if enrolled) */}
        {course.isEnrolled && course.progress !== undefined && (
          <View style={styles.progressSection}>
            <View style={styles.progressRow}>
              <Text style={styles.progressText}>
                {course.progress}% Completed
              </Text>
              <Text style={styles.lessonCount}>
                {course.lessons}/{course.totalLessons} Lessons
              </Text>
            </View>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${course.progress}%` },
                ]}
              />
            </View>
          </View>
        )}

        {/* CTA Button */}
        <Pressable
          style={({ pressed }) => [
            styles.ctaButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
          onPress={handlePress}
        >
          <Text style={styles.ctaText}>
            {course.isEnrolled ? "Continue Learning" : (course.ctaText || "Explore Course")}
          </Text>
          <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
        </Pressable>

        {/* Metadata Row */}
        <View style={styles.metadataRow}>
          <View style={styles.metaItem}>
            <Ionicons
              name="time-outline"
              size={14}
              color={COLORS.inactive}
            />
            <Text style={styles.metaText}>{course.duration}</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="book-outline"
              size={14}
              color={COLORS.inactive}
            />
            <Text style={styles.metaText}>{course.totalLessons} lessons</Text>
          </View>
          <View style={styles.metaItem}>
            <Ionicons
              name="people-outline"
              size={14}
              color={COLORS.inactive}
            />
            <Text style={styles.metaText}>+{course.learners} learners</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  imageContainer: {
    position: "relative",
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 8.5,
  },
  categoryBadge: {
    position: "absolute",
    top: 10,
    left: 10,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  categoryBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.6,
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
    lineHeight: 21,
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    fontWeight: "400",
    color: COLORS.textSecondary,
    lineHeight: 18,
    marginBottom: 10,
  },
  progressSection: {
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  progressText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accent,
  },
  lessonCount: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.textSecondary,
  },
  progressBarBg: {
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 2.5,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 2.5,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.accent,
    borderRadius: 10,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginBottom: 10,
    gap: 4,
  },
  ctaText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#FFFFFF",
  },
  metadataRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  metaText: {
    fontSize: 11,
    fontWeight: "500",
    color: COLORS.inactive,
  },
});
