import React, { useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from "react-native-reanimated";

interface CinematicOpenerCardProps {
  line1: string;
  line2: string;
  line3: string;
  tagline: string;
  xpTeaser?: string;
  ctaText?: string;
  onComplete: () => void;
}

export default function CinematicOpenerCard({
  line1,
  line2,
  line3,
  tagline,
  xpTeaser = "Earn up to 30 FinStars",
  ctaText = "See what happened →",
  onComplete,
}: CinematicOpenerCardProps) {
  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  const opacityTagline = useSharedValue(0);
  const opacityCTA = useSharedValue(0);

  const translateY1 = useSharedValue(15);
  const translateY2 = useSharedValue(15);
  const translateY3 = useSharedValue(15);
  const translateYTagline = useSharedValue(15);
  const translateYCTA = useSharedValue(15);

  useEffect(() => {
    // Reset values first
    opacity1.value = 0;
    opacity2.value = 0;
    opacity3.value = 0;
    opacityTagline.value = 0;
    opacityCTA.value = 0;

    translateY1.value = 15;
    translateY2.value = 15;
    translateY3.value = 15;
    translateYTagline.value = 15;
    translateYCTA.value = 15;

    // Start staggered animations
    opacity1.value = withTiming(1, { duration: 600 });
    translateY1.value = withTiming(0, { duration: 600 });

    opacity2.value = withDelay(700, withTiming(1, { duration: 600 }));
    translateY2.value = withDelay(700, withTiming(0, { duration: 600 }));

    opacity3.value = withDelay(1400, withTiming(1, { duration: 600 }));
    translateY3.value = withDelay(1400, withTiming(0, { duration: 600 }));

    opacityTagline.value = withDelay(2100, withTiming(1, { duration: 600 }));
    translateYTagline.value = withDelay(2100, withTiming(0, { duration: 600 }));

    opacityCTA.value = withDelay(2800, withTiming(1, { duration: 600 }));
    translateYCTA.value = withDelay(2800, withTiming(0, { duration: 600 }));
  }, [line1, line2, line3, opacity1, opacity2, opacity3, opacityCTA, opacityTagline, translateY1, translateY2, translateY3, translateYCTA, translateYTagline]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: opacity1.value,
    transform: [{ translateY: translateY1.value }],
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacity2.value,
    transform: [{ translateY: translateY2.value }],
  }));

  const animatedStyle3 = useAnimatedStyle(() => ({
    opacity: opacity3.value,
    transform: [{ translateY: translateY3.value }],
  }));

  const animatedStyleTagline = useAnimatedStyle(() => ({
    opacity: opacityTagline.value,
    transform: [{ translateY: translateYTagline.value }],
  }));

  const animatedStyleCTA = useAnimatedStyle(() => ({
    opacity: opacityCTA.value,
    transform: [{ translateY: translateYCTA.value }],
  }));

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#0B0F19", "#1E1B4B", "#0B0F19"]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />
      
      {/* Subtle top-right glow */}
      <View style={styles.glowTopRight} />
      {/* Subtle bottom-left glow */}
      <View style={styles.glowBottomLeft} />

      <View style={styles.content}>
        <View style={styles.linesContainer}>
          <Animated.Text style={[styles.line, styles.lineWhite, animatedStyle1]}>
            {line1}
          </Animated.Text>
          <Animated.Text style={[styles.line, styles.lineAmber, animatedStyle2]}>
            {line2}
          </Animated.Text>
          <Animated.Text style={[styles.line, styles.lineAccent, animatedStyle3]}>
            {line3}
          </Animated.Text>
        </View>

        <Animated.Text style={[styles.tagline, animatedStyleTagline]}>
          {tagline}
        </Animated.Text>

        <Animated.View style={animatedStyleCTA}>
          <Pressable
            onPress={onComplete}
            style={({ pressed }) => [
              styles.ctaButton,
              { opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={styles.ctaText}>{ctaText}</Text>
          </Pressable>
          {xpTeaser ? (
            <Text style={styles.teaserText}>
              ⭐ Earn up to <Text style={styles.teaserAccent}>{xpTeaser}</Text>
            </Text>
          ) : null}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: 450,
    borderRadius: 24,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    position: "relative",
  },
  glowTopRight: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(99, 102, 241, 0.15)", // Indigo glow
    blurRadius: 50,
  },
  glowBottomLeft: {
    position: "absolute",
    bottom: -50,
    left: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "rgba(16, 185, 129, 0.1)", // Emerald glow
    blurRadius: 50,
  },
  content: {
    alignItems: "center",
    width: "100%",
    paddingVertical: 32,
  },
  linesContainer: {
    alignItems: "center",
    marginBottom: 24,
    gap: 8,
  },
  line: {
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  lineWhite: {
    color: "#FFFFFF",
  },
  lineAmber: {
    color: "#FBBF24", // Amber
  },
  lineAccent: {
    color: "#10B981", // Emerald Accent
  },
  tagline: {
    fontSize: 14,
    fontWeight: "500",
    color: "#9CA3AF",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 40,
    maxWidth: "90%",
  },
  ctaButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 16,
  },
  ctaText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "750",
  },
  teaserText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    textAlign: "center",
  },
  teaserAccent: {
    color: "#10B981",
    fontWeight: "700",
  },
});
