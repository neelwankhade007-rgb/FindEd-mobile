import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { COLORS } from "@/constants/colors";

interface JourneyTrophyProps {
  courseTitle: string;
  isCompleted?: boolean;
  x: number;
  y: number;
}

const JourneyTrophy = React.memo(function JourneyTrophy({
  courseTitle,
  isCompleted = false,
  x,
  y,
}: JourneyTrophyProps) {
  const scale = useSharedValue(1);

  useEffect(() => {
    if (isCompleted) {
      scale.value = withSpring(1.15, { damping: 8, stiffness: 80 });
    } else {
      scale.value = 1;
    }
  }, [isCompleted]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        {
          left: x - 130, // Centered horizontally at x (width is 260)
          top: y - 55,  // Centered vertically on the trophy glow circle (glow height is 110)
        },
      ]}
    >
      {/* Trophy icon with glow */}
      <Animated.View
        style={[
          styles.trophyGlow,
          {
            backgroundColor: isCompleted
              ? "rgba(245, 158, 11, 0.15)"
              : "rgba(209, 213, 219, 0.2)",
          },
          animatedStyle,
        ]}
      >
        <View
          style={[
            styles.trophyCircle,
            {
              backgroundColor: isCompleted ? COLORS.accent : "#E5E7EB",
            },
          ]}
        >
          <Ionicons
            name="trophy"
            size={36}
            color={isCompleted ? "#FFF" : COLORS.inactive}
          />
        </View>
      </Animated.View>

      {/* Title */}
      <Text
        style={[
          styles.title,
          { color: isCompleted ? COLORS.accent : COLORS.text },
        ]}
      >
        {courseTitle} Trophy
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        {isCompleted
          ? "🎉 Congratulations! You've mastered this course!"
          : "Complete all modules to unlock your certification and the master chest!"}
      </Text>

      {/* Decorative stars */}
      {isCompleted && (
        <View style={styles.starsRow}>
          <Ionicons name="star" size={16} color={COLORS.accent} />
          <Ionicons name="star" size={22} color={COLORS.accent} />
          <Ionicons name="star" size={16} color={COLORS.accent} />
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    width: 260,
    zIndex: 100,
  },
  trophyGlow: {
    width: 110,
    height: 110,
    borderRadius: 55,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  trophyCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#F59E0B",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    fontWeight: "500",
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 19,
    maxWidth: 240,
  },
  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 12,
  },
});

export default JourneyTrophy;
