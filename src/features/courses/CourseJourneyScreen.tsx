import React, { useRef, useEffect } from "react";
import { ScrollView, View, Text, StyleSheet, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "@/constants/colors";
import { getCourseJourney } from "./courseData";
import type { Lesson } from "./courseData";

import JourneyHeader from "./components/JourneyHeader";
import JourneyNode from "./components/JourneyNode";
import JourneyConnector, { getNodeOffset } from "./components/JourneyConnector";
import JourneyTrophy from "./components/JourneyTrophy";

function getCenter(align: "flex-start" | "center" | "flex-end", width: number): number {
  if (align === "flex-start") return 70;
  if (align === "flex-end") return width - 70;
  return width / 2;
}

export default function CourseJourneyScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const journey = getCourseJourney(courseId ?? "");
  const scrollViewRef = useRef<ScrollView>(null);

  // Auto-scroll to current lesson on mount
  useEffect(() => {
    if (!journey) return;
    const currentIndex = journey.lessons.findIndex((l) => l.status === "current");
    if (currentIndex > 2) {
      // Rough estimate: each node+connector pair ≈ 120px (node height + 64px connector + margins)
      const scrollTarget = currentIndex * 120 - 100;
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: scrollTarget, animated: true });
      }, 400);
    }
  }, [journey]);

  const handleLessonPress = (lesson: Lesson) => {
    // TODO: Navigate to lesson content screen
    console.log("Lesson pressed:", lesson.id, lesson.title);
  };

  // ── Error state ───────────────────────────────────────────
  if (!journey) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={56} color={COLORS.inactive} />
          <Text style={styles.errorTitle}>Course not found</Text>
          <Text style={styles.errorSubtitle}>
            We couldn't load this course journey. Please go back and try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const allCompleted = journey.lessons.every((l) => l.status === "completed");
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40; // 20px padding on each side

  // Calculate coordinates for final trophy curve
  const lastIndex = journey.lessons.length - 1;
  const lastAlign = getNodeOffset(lastIndex);
  const lastCenter = getCenter(lastAlign, containerWidth);
  const trophyCenter = containerWidth / 2;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      {/* Header */}
      <JourneyHeader journey={journey} />

      {/* Journey Path */}
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* "Your Journey" label */}
        <View style={styles.journeyLabel}>
          <View style={styles.journeyLabelLine} />
          <Text style={styles.journeyLabelText}>YOUR JOURNEY</Text>
          <View style={styles.journeyLabelLine} />
        </View>

        {/* Path: interleaved nodes and connectors */}
        <View style={styles.pathContainer}>
          {journey.lessons.map((lesson, index) => (
            <React.Fragment key={lesson.id}>
              <JourneyNode
                lesson={lesson}
                index={index}
                onPress={handleLessonPress}
              />
              {index < journey.lessons.length - 1 && (
                <JourneyConnector
                  nextStatus={journey.lessons[index + 1].status}
                  fromIndex={index}
                />
              )}
            </React.Fragment>
          ))}
        </View>

        {/* Final connector to trophy */}
        <View style={styles.trophyConnector}>
          <Svg width={containerWidth} height={48}>
            <Path
              d={`M ${lastCenter} 0 C ${lastCenter} 24, ${trophyCenter} 24, ${trophyCenter} 48`}
              fill="none"
              stroke={allCompleted ? COLORS.primary : COLORS.border}
              strokeWidth={4.5}
              strokeDasharray={allCompleted ? undefined : "6, 6"}
              strokeLinecap="round"
            />
          </Svg>
        </View>

        {/* Trophy */}
        <JourneyTrophy
          courseTitle={journey.title}
          isCompleted={allCompleted}
        />
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
  journeyLabel: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    paddingVertical: 14,
    paddingHorizontal: 32,
  },
  journeyLabelLine: {
    flex: 1,
    height: 1,
    backgroundColor: COLORS.border,
  },
  journeyLabelText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    color: COLORS.inactive,
  },
  pathContainer: {
    paddingHorizontal: 20,
  },
  trophyConnector: {
    alignItems: "center",
    height: 30,
    justifyContent: "center",
  },
  trophyDash: {
    width: 0,
    height: 30,
    borderLeftWidth: 3,
    borderStyle: "solid",
  },
  errorContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 16,
  },
  errorSubtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
});
