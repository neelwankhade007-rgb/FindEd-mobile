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
  if (status === "locked") return { name: "lock-closed", size: 16 };
  if (status === "completed") return { name: "book", size: 20 };
  return { name: "star", size: 24 }; // Current lesson always uses a star
}

const SMALL_NODE_SIZE = 44;
const COMPLETED_NODE_SIZE = 50;
const CURRENT_NODE_SIZE = 56;
const GLOW_SIZE = 72;

export default function JourneyNode({
  lesson,
  index,
  onPress,
}: JourneyNodeProps) {
  const { status, type, title, subtitle, xpReward } = lesson;
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

  const align = getNodeOffset(index);
  const icon = getLessonIcon(type, status);

  // Render Current Lesson (Adventure Map Landmark with Card and Star)
  if (isCurrent) {
    // Determine card positioning based on horizontal alignment to avoid screen edge clipping
    const isLeft = align === "flex-start";
    const isRight = align === "flex-end";

    return (
      <View style={[styles.currentWrapper, { alignSelf: align }]}>
        {/* Speech Bubble Callout */}
        <View style={styles.bubbleCallout}>
          <Text style={styles.bubbleText}>Ready for the next challenge?</Text>
          <View style={styles.bubbleArrow} />
        </View>

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
            {/* Thumbnail Box */}
            <View style={styles.thumbnailBox}>
              <Ionicons
                name={type === "quiz" ? "help-circle" : type === "challenge" ? "flash" : "book"}
                size={22}
                color={COLORS.primary}
              />
            </View>
            <View style={styles.cardInfo}>
              <Text style={styles.currentTitle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.currentXP}>{xpReward} XP</Text>
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
                  width: CURRENT_NODE_SIZE,
                  height: CURRENT_NODE_SIZE,
                  borderRadius: CURRENT_NODE_SIZE / 2,
                  backgroundColor: COLORS.accent,
                  borderWidth: 3,
                  borderColor: "#FFFFFF",
                  transform: [{ scale: pressed ? 0.95 : 1 }],
                },
              ]}
            >
              <Ionicons name="star" size={26} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  // Render Completed Lesson (Gold milestone)
  if (isCompleted) {
    return (
      <View style={[styles.wrapper, { alignSelf: align }]}>
        <Pressable
          onPress={() => onPress?.(lesson)}
          style={({ pressed }) => [
            styles.circle,
            {
              width: COMPLETED_NODE_SIZE,
              height: COMPLETED_NODE_SIZE,
              borderRadius: COMPLETED_NODE_SIZE / 2,
              backgroundColor: COLORS.accent,
              borderWidth: 2,
              borderColor: "#FFFFFF",
              transform: [{ scale: pressed ? 0.95 : 1 }],
            },
          ]}
        >
          <Ionicons name={icon.name} size={icon.size} color="#FFFFFF" />
        </Pressable>

        <Text style={styles.nodeTitle} numberOfLines={1}>
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
    <View style={[styles.wrapper, { alignSelf: align }]}>
      <View
        style={[
          styles.circle,
          {
            width: SMALL_NODE_SIZE,
            height: SMALL_NODE_SIZE,
            borderRadius: SMALL_NODE_SIZE / 2,
            backgroundColor: "#E5E7EB",
            borderWidth: 1.5,
            borderColor: COLORS.border,
          },
        ]}
      >
        <Ionicons name="lock-closed" size={icon.size} color={COLORS.inactive} />
      </View>

      <Text style={[styles.nodeTitle, { color: COLORS.inactive }]} numberOfLines={1}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    width: 140,
    paddingVertical: 4,
  },
  currentWrapper: {
    alignItems: "center",
    paddingVertical: 8,
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  landmarkRow: {
    alignItems: "center",
    justifyContent: "center",
  },
  currentCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: 10,
    width: 190,
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
    zIndex: 2,
  },
  thumbnailBox: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: `${COLORS.primary}10`,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  cardInfo: {
    flex: 1,
  },
  currentTitle: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.text,
  },
  currentXP: {
    fontSize: 10,
    fontWeight: "700",
    color: COLORS.accent,
    marginTop: 2,
  },
  bubbleCallout: {
    backgroundColor: COLORS.text,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginBottom: 6,
    position: "relative",
    alignItems: "center",
    shadowColor: COLORS.text,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 2,
  },
  bubbleText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "800",
  },
  bubbleArrow: {
    position: "absolute",
    bottom: -5,
    width: 0,
    height: 0,
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 5,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: COLORS.text,
  },
  nodeTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textSecondary,
    textAlign: "center",
    marginTop: 6,
    maxWidth: 120,
  },
  completedBadge: {
    backgroundColor: "rgba(79, 70, 229, 0.08)",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
  },
  completedText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.primary,
    letterSpacing: 0.5,
  },
});
