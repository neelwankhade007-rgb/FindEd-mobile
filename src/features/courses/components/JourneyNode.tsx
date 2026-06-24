import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
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

// Icon picker based on lesson type and status
function getLessonIcon(
  type: Lesson["type"],
  status: LessonStatus
): { name: keyof typeof Ionicons.glyphMap; size: number } {
  if (status === "locked") return { name: "lock-closed", size: 24 };
  if (status === "completed") return { name: "checkmark-done", size: 28 };
  return { name: "star", size: 28 }; // Current lesson always uses a star
}

const NODE_SIZE = 72;
const GLOW_SIZE = 90;

export default function JourneyNode({
  lesson,
  index,
  onPress,
}: JourneyNodeProps) {
  const { status, type, title, xpReward } = lesson;
  const isCurrent = status === "current";
  const isCompleted = status === "completed";
  const isLocked = status === "locked";

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
  }, [isCurrent]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const offset = getNodeOffset(index);
  const icon = getLessonIcon(type, status);

  // Render Current Lesson (Adventure Map Landmark with Card and Star)
  if (isCurrent) {
    const isLeft = offset < 0;
    const isRight = offset > 0;

    return (
      <View style={[styles.currentWrapper, { transform: [{ translateX: offset }] }]}>
        {/* Dynamic Card & Milestone Row */}
        <View
          style={[
            styles.landmarkRow,
            {
              flexDirection: isLeft ? "row" : isRight ? "row-reverse" : "column",
            },
          ]}
        >
          {/* Interactive Card */}
          <Pressable
            onPress={() => onPress?.(lesson)}
            style={({ pressed }) => [
              styles.currentCard,
              {
                opacity: pressed ? 0.95 : 1,
                marginRight: isLeft ? -12 : 0,
                marginLeft: isRight ? -12 : 0,
                marginTop: isLeft || isRight ? 0 : 8,
              },
            ]}
          >
            <View style={styles.thumbnailBox}>
              <Ionicons
                name={type === "quiz" ? "help-circle" : type === "challenge" ? "flash" : "play"}
                size={22}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.currentTitle} numberOfLines={2}>
                {title}
              </Text>
              <Text style={styles.currentXP}>{xpReward} XP • 5 min</Text>
            </View>
          </Pressable>

          {/* Glowing Milestone Circle */}
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
                  backgroundColor: COLORS.accent,
                  borderWidth: 4,
                  borderColor: "#FFFFFF",
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Ionicons name="star" size={32} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  // Render Completed Lesson (Gold milestone)
  if (isCompleted) {
    return (
      <View style={[styles.wrapper, { transform: [{ translateX: offset }] }]}>
        <Pressable
          onPress={() => onPress?.(lesson)}
          style={({ pressed }) => [
            styles.circle,
            {
              width: NODE_SIZE,
              height: NODE_SIZE,
              borderRadius: NODE_SIZE / 2,
              backgroundColor: COLORS.accent,
              borderWidth: 3,
              borderColor: "#FFFFFF",
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <Ionicons name={icon.name} size={icon.size} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.nodeTitle} numberOfLines={2}>
          {title}
        </Text>

        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>COMPLETED</Text>
        </View>
      </View>
    );
  }

  // Render Locked Lesson (Grey Milestone)
  return (
    <View style={[styles.wrapper, { transform: [{ translateX: offset }], opacity: 0.5 }]}>
      <View
        style={[
          styles.circle,
          {
            width: NODE_SIZE,
            height: NODE_SIZE,
            borderRadius: NODE_SIZE / 2,
            backgroundColor: "#E5E7EB",
            borderWidth: 2,
            borderColor: COLORS.border,
          },
        ]}
      >
        <Ionicons name="lock-closed" size={icon.size} color={COLORS.inactive} />
      </View>

      <Text style={[styles.nodeTitle, { color: COLORS.inactive }]} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    alignSelf: "center",
    width: 140,
    paddingVertical: 2,
  },
  currentWrapper: {
    alignItems: "center",
    alignSelf: "center",
    paddingVertical: 4,
    zIndex: 10,
  },
  nodeContainer: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    height: GLOW_SIZE,
    width: GLOW_SIZE,
    zIndex: 5,
  },
  glowRing: {
    position: "absolute",
    backgroundColor: "rgba(245, 158, 11, 0.18)",
  },
  circle: {
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  landmarkRow: {
    alignItems: "center",
    justifyContent: "center",
  },
  currentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 12,
    width: 200,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 2,
  },
  thumbnailBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: `${COLORS.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  cardInfo: {
    flex: 1,
  },
  currentTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
    lineHeight: 18,
  },
  currentXP: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.accent,
    marginTop: 4,
  },
  nodeTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 8,
    maxWidth: 130,
    lineHeight: 16,
  },
  completedBadge: {
    backgroundColor: "rgba(245, 158, 11, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
    marginTop: 6,
  },
  completedText: {
    fontSize: 10,
    fontWeight: "800",
    color: COLORS.accent,
    letterSpacing: 0.5,
  },
});

