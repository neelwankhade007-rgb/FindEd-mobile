import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "@/constants/colors";
import type { Lesson, LessonStatus } from "../courseData";
import { getNodeOffset } from "./JourneyConnector";

interface JourneyNodeProps {
  lesson: Lesson;
  index: number;
  onPress?: (lesson: Lesson) => void;
}

// Icon picker based on lesson title and type
function getLessonIcon(
  title: string,
  type: Lesson["type"],
  status: LessonStatus
) {
  if (status === "locked") {
    return <Ionicons name="lock-closed" size={20} color="#9CA3AF" />;
  }

  const color = "#FFFFFF";
  const size = 24;

  if (title.toLowerCase().includes("budget")) {
    return <Ionicons name="pie-chart" size={size} color={color} />;
  }
  if (title.toLowerCase().includes("quiz") || type === "quiz") {
    return <Ionicons name="help-circle" size={size + 2} color={color} />;
  }
  if (type === "challenge") {
    return <Ionicons name="flash" size={size} color={color} />;
  }
  
  // Default is a book icon
  return <Ionicons name="book" size={size} color={color} />;
}

const NODE_SIZE = 64;
const GLOW_SIZE = 82;

export default function JourneyNode({
  lesson,
  index,
  onPress,
}: JourneyNodeProps) {
  const { status, type, title, subtitle, xpReward, durationMins } = lesson;
  const isCurrent = status === "current";
  const isCompleted = status === "completed";

  // Pulse animation for current node
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.4);

  useEffect(() => {
    if (isCurrent) {
      pulseScale.value = withRepeat(
        withTiming(1.2, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
      pulseOpacity.value = withRepeat(
        withTiming(0, { duration: 1800, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      );
    }
  }, [isCurrent, pulseScale, pulseOpacity]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const offset = getNodeOffset(index);

  // Render Current Lesson (Adventure Map Landmark with Card and Star)
  if (isCurrent) {
    const description = subtitle || "Learn simple ways to master this module and build a better future.";

    return (
      <View style={[styles.currentWrapper, { transform: [{ translateX: offset }] }]}>
        {/* Glowing Milestone Circle on Left */}
        <View style={styles.nodeContainer}>
          <Animated.View
            style={[
              styles.glowRing,
              {
                width: GLOW_SIZE,
                height: GLOW_SIZE,
                borderRadius: GLOW_SIZE / 2,
              },
              pulseStyle,
            ]}
          />
          <Pressable
            onPress={() => onPress?.(lesson)}
            style={({ pressed }) => [
              styles.circle,
              {
                width: NODE_SIZE,
                height: NODE_SIZE,
                borderRadius: NODE_SIZE / 2,
                backgroundColor: COLORS.primary, // Purple
                borderWidth: 4,
                borderColor: "#FFFFFF",
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Ionicons name="flash" size={28} color="#FFFFFF" />
          </Pressable>
        </View>

        {/* Interactive Card on Right */}
        <Pressable
          onPress={() => onPress?.(lesson)}
          style={({ pressed }) => [
            styles.currentCard,
            {
              opacity: pressed ? 0.96 : 1,
            },
          ]}
        >
          {/* Card Arrow Pointer pointing to the node */}
          <View style={styles.cardArrow} />

          <View style={styles.cardHeaderTag}>
            <Text style={styles.cardHeaderTagText}>CURRENT MODULE</Text>
          </View>

          <Text style={styles.currentTitle} numberOfLines={1}>
            {title}
          </Text>

          <Text style={styles.currentDescription} numberOfLines={2}>
            {description}
          </Text>

          {/* Stats Row */}
          <View style={styles.statsContainer}>
            <View style={styles.statPill}>
              <Ionicons name="star" size={12} color={COLORS.primary} />
              <Text style={styles.statPillText}>{xpReward} XP</Text>
            </View>
            <View style={styles.statPill}>
              <Ionicons name="time" size={12} color={COLORS.textSecondary} />
              <Text style={styles.statPillText}>{durationMins} min</Text>
            </View>
          </View>

          {/* Chevron Navigation Indicator */}
          <View style={styles.chevronContainer}>
            <Ionicons name="chevron-forward" size={18} color={COLORS.primary} />
          </View>
        </Pressable>
      </View>
    );
  }

  // Render Completed Lesson (Gold milestone)
  if (isCompleted) {
    return (
      <View style={[styles.completedWrapper, { transform: [{ translateX: offset }] }]}>
        <View style={styles.completedCircleContainer}>
          <Pressable
            onPress={() => onPress?.(lesson)}
            style={({ pressed }) => [
              styles.circle,
              {
                width: NODE_SIZE,
                height: NODE_SIZE,
                borderRadius: NODE_SIZE / 2,
                backgroundColor: COLORS.accent, // Yellow/Orange
                borderWidth: 3,
                borderColor: "#FFFFFF",
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            {getLessonIcon(title, type, status)}
          </Pressable>

          {/* Overlapping green checkmark badge */}
          <View style={styles.checkmarkBadge}>
            <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.nodeTitle} numberOfLines={1}>
            {title}
          </Text>
          <View style={styles.completedBadge}>
            <Text style={styles.completedText}>COMPLETED</Text>
          </View>
        </View>
      </View>
    );
  }

  // Render Locked Lesson (Grey Milestone)
  return (
    <View style={[styles.lockedWrapper, { transform: [{ translateX: offset }] }]}>
      <View
        style={[
          styles.circle,
          {
            width: NODE_SIZE,
            height: NODE_SIZE,
            borderRadius: NODE_SIZE / 2,
            backgroundColor: "#F3F4F6",
            borderWidth: 2,
            borderColor: "#E5E7EB",
          },
        ]}
      >
        {getLessonIcon(title, type, status)}
      </View>

      <View style={styles.detailsContainer}>
        <Text style={[styles.nodeTitle, { color: COLORS.inactive }]} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.lockedBadge}>
          <Text style={styles.lockedText}>LOCKED</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  completedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 84,
    position: "relative",
  },
  lockedWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 84,
    position: "relative",
    opacity: 0.85,
  },
  currentWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: 140,
    position: "relative",
    zIndex: 10,
  },
  nodeContainer: {
    position: "absolute",
    left: 75 - GLOW_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    height: GLOW_SIZE,
    width: GLOW_SIZE,
    zIndex: 5,
  },
  completedCircleContainer: {
    position: "absolute",
    left: 75 - NODE_SIZE / 2,
    width: NODE_SIZE,
    height: NODE_SIZE,
  },
  glowRing: {
    position: "absolute",
    backgroundColor: "rgba(79, 70, 229, 0.18)", // Soft purple glow
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 4,
  },
  checkmarkBadge: {
    position: "absolute",
    bottom: -1,
    right: -1,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#10B981", // Green check badge
    borderWidth: 2,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  detailsContainer: {
    position: "absolute",
    left: 75 + NODE_SIZE / 2 + 16,
    right: 16,
    justifyContent: "center",
  },
  nodeTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 18,
  },
  completedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F4EA", // light green background
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  completedText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#137333", // dark green text
    letterSpacing: 0.5,
  },
  lockedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  lockedText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 0.5,
  },
  currentCard: {
    position: "absolute",
    left: 75 + NODE_SIZE / 2 + 12,
    right: 12,
    backgroundColor: "#FAF9FF", // Very light purple
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5DFFF", // Soft purple border
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    zIndex: 2,
  },
  cardArrow: {
    position: "absolute",
    left: -6,
    top: "50%",
    marginTop: -6,
    width: 12,
    height: 12,
    backgroundColor: "#FAF9FF",
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#E5DFFF",
    transform: [{ rotate: "45deg" }],
    zIndex: 1,
  },
  cardHeaderTag: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF", // light indigo badge
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 6,
    marginBottom: 6,
  },
  cardHeaderTagText: {
    fontSize: 9,
    fontWeight: "850",
    color: "#4F46E5",
    letterSpacing: 0.5,
  },
  currentTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#1F2937",
    marginBottom: 4,
  },
  currentDescription: {
    fontSize: 12,
    fontWeight: "400",
    color: "#6B7280",
    marginBottom: 10,
    lineHeight: 16,
  },
  statsContainer: {
    flexDirection: "row",
    gap: 8,
  },
  statPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEF2FF", // Light purple pill background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
  },
  statPillText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#4B5563",
  },
  chevronContainer: {
    position: "absolute",
    right: 14,
    top: "50%",
    marginTop: -9,
  },
});
