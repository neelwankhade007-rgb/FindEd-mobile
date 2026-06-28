import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { COLORS } from "@/constants/colors";
import type { Lesson, LessonStatus } from "../courseData";
import type { CardAnchor } from "../types/journeyLayout";
import { LAYOUT_CONSTANTS } from "../layout/layoutConfig";

interface JourneyCardProps {
  lesson: Lesson;
  anchor: CardAnchor;
  onPress: (lesson: Lesson) => void;
}

function getCardIcon(
  title: string,
  type: Lesson["type"],
  status: LessonStatus
) {
  if (status === "locked") return "lock-closed";
  if (title.toLowerCase().includes("budget")) return "pie-chart";
  if (title.toLowerCase().includes("quiz") || type === "quiz") return "help-circle";
  if (type === "challenge") return "flash";
  return "book";
}

const JourneyCard = React.memo(function JourneyCard({
  lesson,
  anchor,
  onPress,
}: JourneyCardProps) {
  const { title, subtitle, xpReward, durationMins, status, type } = lesson;
  const isCompleted = status === "completed";
  const isCurrent = status === "current";

  const description = subtitle || "Learn simple ways to master this module and build a better future.";

  const iconName = getCardIcon(title, type, status) as any;
  const ctaText = isCompleted ? "Review Lesson" : isCurrent ? "Continue Learning" : "Locked Lesson";
  const ctaColor = isCompleted ? COLORS.accent : isCurrent ? COLORS.primary : COLORS.inactive;

  return (
    <Animated.View
      entering={FadeInUp.duration(250)}
      exiting={FadeOutDown.duration(200)}
      style={[
        styles.container,
        {
          left: anchor.x,
          top: anchor.y,
          width: LAYOUT_CONSTANTS.CARD_MAX_WIDTH,
        },
      ]}
    >
      {/* Tiny Connector Line & Dot */}
      <View
        style={[
          styles.connectorContainer,
          {
            left: anchor.nodeX - anchor.x,
            top: -24,
            height: 24,
          },
        ]}
      >
        <View style={styles.connectorLine} />
        <View style={styles.connectorDot} />
      </View>

      <Pressable onPress={() => {}} style={styles.cardContent}>
        {/* Title Row with Icon */}
        <View style={styles.headerRow}>
          <View style={[styles.iconContainer, { backgroundColor: ctaColor }]}>
            <Ionicons name={iconName} size={16} color="#FFF" />
          </View>
          <Text style={styles.titleText} numberOfLines={2}>
            {title}
          </Text>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>
            <Ionicons name="star" size={13} color={COLORS.accent} /> {xpReward} XP
          </Text>
          <Text style={styles.statDot}>•</Text>
          <Text style={styles.statText}>
            <Ionicons name="time" size={13} color="#64748B" /> {durationMins} min
          </Text>
        </View>

        {/* Description */}
        <Text style={styles.descriptionText} numberOfLines={3}>
          {description}
        </Text>

        {/* Primary CTA Button */}
        <Pressable
          onPress={() => onPress(lesson)}
          style={({ pressed }) => [
            styles.ctaButton,
            { backgroundColor: ctaColor },
            pressed && styles.ctaButtonPressed,
          ]}
        >
          <Text style={styles.ctaButtonText}>{ctaText}</Text>
        </Pressable>
      </Pressable>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    zIndex: 200,
  },
  connectorContainer: {
    position: "absolute",
    alignItems: "center",
    width: 2,
    marginLeft: -1, // center the 2px wide line exactly at nodeX
    zIndex: 1,
  },
  connectorLine: {
    flex: 1,
    width: 2,
    backgroundColor: COLORS.primary, // purple line
    opacity: 0.3,
  },
  connectorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.primary,
    position: "absolute",
    bottom: -3,
    left: -2, // Center 6px dot on 2px line
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  cardContent: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: "#E5DFFF", // subtle purple border
    padding: 24,
    shadowColor: COLORS.primaryDark,
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.12,
    shadowRadius: 32,
    elevation: 10,
    marginTop: 0, // Card starts right where connector ends
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 14,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  titleText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "900",
    color: "#0F172A",
    lineHeight: 22,
  },
  statsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
    gap: 10,
  },
  statText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#475569",
    alignItems: "center",
  },
  statDot: {
    fontSize: 14,
    color: "#CBD5E1",
    fontWeight: "900",
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#64748B",
    lineHeight: 20,
    marginBottom: 24,
  },
  ctaButton: {
    width: "100%",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  ctaButtonPressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
});

export default JourneyCard;
