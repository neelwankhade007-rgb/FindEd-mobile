import React, { useRef, useEffect, useState, useMemo } from "react";
import { ScrollView, View, Text, StyleSheet, BackHandler, useWindowDimensions, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { getCourseJourney } from "./courseData";
import type { Lesson } from "./courseData";

import JourneyHeader from "./components/JourneyHeader";
import JourneyNode from "./components/JourneyNode";
import JourneyCard from "./components/JourneyCard";
import JourneyTrophy from "./components/JourneyTrophy";
import JourneyPath from "./components/JourneyPath";
import { calculateJourneyLayout } from "./layout/calculateJourneyLayout";
import { LAYOUT_CONSTANTS } from "./layout/layoutConfig";

export default function CourseJourneyScreen() {
  const { courseId } = useLocalSearchParams<{ courseId: string }>();
  const journey = getCourseJourney(courseId ?? "");
  const scrollViewRef = useRef<ScrollView>(null);
  const { width: windowWidth } = useWindowDimensions();

  // State to track which lesson is currently selected to display its description card
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // 1. Calculate deterministic layout using centralized config and current screen width
  const layout = useMemo(() => {
    if (!journey) return null;
    return calculateJourneyLayout(journey.lessons, windowWidth);
  }, [journey, windowWidth]);

  // Auto-scroll to current lesson on mount
  useEffect(() => {
    if (!journey) return;
    const currentIndex = journey.lessons.findIndex((l) => l.status === "current");

    if (currentIndex > 2) {
      const scrollTarget = currentIndex * LAYOUT_CONSTANTS.NODE_SPACING - 100;
      setTimeout(() => {
        scrollViewRef.current?.scrollTo({ y: scrollTarget, animated: true });
      }, 400);
    }
  }, [journey]);

  // Handle hardware back button to close selected details card first
  useEffect(() => {
    const onBackPress = () => {
      if (selectedLesson !== null) {
        setSelectedLesson(null);
        return true;
      }
      return false;
    };

    const subscription = BackHandler.addEventListener("hardwareBackPress", onBackPress);
    return () => subscription.remove();
  }, [selectedLesson]);

  const handleLessonPress = (lesson: Lesson) => {
    if (selectedLesson?.id === lesson.id) {
      setSelectedLesson(null);
    } else {
      setSelectedLesson(lesson);
    }
    console.log("Lesson pressed:", lesson.id, lesson.title);
  };

  // ── Error state ───────────────────────────────────────────
  if (!journey || !layout) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={56} color={COLORS.inactive} />
          <Text style={styles.errorTitle}>Course not found</Text>
          <Text style={styles.errorSubtitle}>
            We couldn&apos;t load this course journey. Please go back and try again.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const allCompleted = journey.lessons.every((l) => l.status === "completed");
  const activeCardAnchor = selectedLesson ? layout.cardAnchors[selectedLesson.id] : null;

  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
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

        {/* Path absolute coordinate workspace container */}
        <Pressable
          onPress={() => setSelectedLesson(null)}
          style={[styles.pathContainer, { height: layout.totalHeight }]}
        >
          {/* 1. Background and active path lines — z-index lowest */}
          <JourneyPath
            svgPath={layout.svgPath}
            svgProgressPath={layout.svgProgressPath}
            screenWidth={windowWidth}
            totalHeight={layout.totalHeight}
          />


          {/* 2. Lesson nodes with persistent inline labels */}
          {layout.nodes.map((node) => (
            <JourneyNode
              key={node.id}
              lesson={node.lesson!}
              x={node.x}
              y={node.y}
              labelAnchor={layout.labelAnchors[node.id]}
              isSelected={selectedLesson?.id === node.id}
              onPress={handleLessonPress}
            />
          ))}

          {/* 3. Trophy */}
          <JourneyTrophy
            courseTitle={journey.title}
            isCompleted={allCompleted}
            x={layout.trophy.x}
            y={layout.trophy.y}
          />

          {/* 4. Detail card overlay for selected lesson */}
          {selectedLesson && activeCardAnchor && (
            <JourneyCard
              key={selectedLesson.id}
              lesson={selectedLesson}
              anchor={activeCardAnchor}
              onPress={handleLessonPress}
            />
          )}
        </Pressable>
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
    position: "relative",
    width: "100%",
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
