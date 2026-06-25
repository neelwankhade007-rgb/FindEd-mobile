import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSpring,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "@/constants/colors";
import type { Lesson, LessonStatus } from "../courseData";
import type { LabelAnchor } from "../types/journeyLayout";
import { LAYOUT_CONSTANTS } from "../layout/layoutConfig";

interface JourneyNodeProps {
  lesson: Lesson;
  x: number;
  y: number;
  labelAnchor?: LabelAnchor;
  isSelected: boolean;
  onPress: (lesson: Lesson) => void;
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

  return <Ionicons name="book" size={size} color={color} />;
}

const GLOW_SIZE = 82;

const JourneyNode = React.memo(function JourneyNode({
  lesson,
  x,
  y,
  labelAnchor,
  isSelected,
  onPress,
}: JourneyNodeProps) {
  const { status, type, title } = lesson;
  const isCurrent = status === "current";
  const isCompleted = status === "completed";
  const isLocked = status === "locked";

  const { NODE_RADIUS } = LAYOUT_CONSTANTS;
  const nodeSize = NODE_RADIUS * 2;

  // Animation values
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.4);
  const scale = useSharedValue(1);

  // Pulse animation for current node
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
    } else {
      pulseScale.value = 1;
      pulseOpacity.value = 0.4;
    }
  }, [isCurrent]);

  // Spring scale-in animation for completed nodes
  useEffect(() => {
    if (isCompleted) {
      scale.value = 0;
      scale.value = withSpring(1, { damping: 12, stiffness: 90 });
    } else {
      scale.value = 1;
    }
  }, [isCompleted]);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
    opacity: pulseOpacity.value,
  }));

  const scaleStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  // Status badge
  const headerTag = isCompleted
    ? "COMPLETED"
    : isCurrent
    ? "CURRENT MODULE"
    : "LOCKED";

  const badgeStyle = isCompleted
    ? styles.completedBadge
    : isCurrent
    ? styles.currentBadge
    : styles.lockedBadge;

  const badgeTextStyle = isCompleted
    ? styles.completedBadgeText
    : isCurrent
    ? styles.currentBadgeText
    : styles.lockedBadgeText;

  const renderMilestoneCircle = () => {
    if (isCurrent) {
      return (
        <View style={styles.currentContainer}>
          <Animated.View style={[styles.glowRing, pulseStyle]} />
          <Pressable
            onPress={() => onPress(lesson)}
            style={({ pressed }) => [
              styles.circle,
              {
                width: nodeSize,
                height: nodeSize,
                borderRadius: NODE_RADIUS,
                backgroundColor: COLORS.primary,
                borderWidth: 4,
                borderColor: "#FFFFFF",
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            <Ionicons name="flash" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      );
    }

    if (isCompleted) {
      return (
        <Animated.View style={[styles.completedContainer, scaleStyle]}>
          <Pressable
            onPress={() => onPress(lesson)}
            style={({ pressed }) => [
              styles.circle,
              {
                width: nodeSize,
                height: nodeSize,
                borderRadius: NODE_RADIUS,
                backgroundColor: COLORS.accent,
                borderWidth: 3,
                borderColor: "#FFFFFF",
                transform: [{ scale: pressed ? 0.95 : 1 }],
              },
            ]}
          >
            {getLessonIcon(title, type, status)}
          </Pressable>
          <View style={styles.checkmarkBadge}>
            <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
          </View>
        </Animated.View>
      );
    }

    // Locked node state
    return (
      <Pressable
        onPress={() => onPress(lesson)}
        style={({ pressed }) => [
          styles.circle,
          {
            width: nodeSize,
            height: nodeSize,
            borderRadius: NODE_RADIUS,
            backgroundColor: "#F3F4F6",
            borderWidth: 2,
            borderColor: "#E5E7EB",
            transform: [{ scale: pressed ? 0.95 : 1 }],
          },
        ]}
      >
        {getLessonIcon(title, type, status)}
      </Pressable>
    );
  };

  return (
    <>
      {/* Milestone circle — absolutely positioned at node center */}
      <View
        style={[
          styles.absoluteNode,
          {
            left: x - NODE_RADIUS,
            top: y - NODE_RADIUS,
            width: nodeSize,
            height: nodeSize,
          },
        ]}
      >
        {renderMilestoneCircle()}
      </View>

      {/* Persistent inline label — title + status badge, always visible */}
      {labelAnchor && (
        <Pressable
          onPress={() => onPress(lesson)}
          style={[
            styles.inlineLabel,
            {
              left: labelAnchor.side === "right" ? labelAnchor.x : undefined,
              right: labelAnchor.side === "left" ? undefined : undefined,
              top: y - 18, // vertically center the ~36px label block on the node center
            },
            labelAnchor.side === "left" && {
              right: undefined,
              left: labelAnchor.x - 180, // position from left edge, label width ~180
              alignItems: "flex-end",
            },
          ]}
        >
          <Text
            style={[
              styles.inlineTitle,
              isLocked && { color: COLORS.inactive },
              isCurrent && { fontSize: 16, fontWeight: "900", color: COLORS.primary },
            ]}
            numberOfLines={1}
          >
            {title}
          </Text>
          <View style={badgeStyle}>
            <Text style={badgeTextStyle}>{headerTag}</Text>
          </View>
        </Pressable>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  absoluteNode: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  currentContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: GLOW_SIZE,
    height: GLOW_SIZE,
  },
  glowRing: {
    position: "absolute",
    width: GLOW_SIZE,
    height: GLOW_SIZE,
    borderRadius: GLOW_SIZE / 2,
    backgroundColor: "rgba(79, 70, 229, 0.18)",
  },
  completedContainer: {
    position: "relative",
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
    backgroundColor: "#10B981",
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

  // ── Persistent inline label styles ────────────────────────
  inlineLabel: {
    position: "absolute",
    zIndex: 50,
    maxWidth: 180,
  },
  inlineTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 18,
  },
  completedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#E6F4EA",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 3,
  },
  completedBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#137333",
    letterSpacing: 0.5,
  },
  currentBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 3,
  },
  currentBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#4F46E5",
    letterSpacing: 0.5,
  },
  lockedBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 3,
  },
  lockedBadgeText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#6B7280",
    letterSpacing: 0.5,
  },
});

export default JourneyNode;
