import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  withRepeat,
  Easing,
} from "react-native-reanimated";
import { COLORS } from "@/constants/colors";

export interface CompletionCardProps {
  badge: string; // Emoji, e.g. "🗺️" or "🏆"
  title: string;
  subtitle: string;
  starsEarned: number;
  learnings: string[];
  nextModuleTitle: string;
  nextModuleDesc: string;
  onNextModule: () => void;
  onReplay: () => void;
}

interface Particle {
  id: number;
  x: number;
  color: string;
  size: number;
  delay: number;
  duration: number;
}

export default function CompletionCard({
  badge,
  title,
  subtitle,
  starsEarned,
  learnings,
  nextModuleTitle,
  nextModuleDesc,
  onNextModule,
  onReplay,
}: CompletionCardProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const screenWidth = Dimensions.get("window").width;

  // Initialize confetti particles
  useEffect(() => {
    const colors = ["#EF4444", "#3B82F6", "#10B981", "#FBBF24", "#A855F7", "#F97316"];
    const tempParticles: Particle[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: Math.random() * (screenWidth - 40),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 8 + 6,
      delay: Math.random() * 800,
      duration: Math.random() * 2000 + 1500,
    }));
    setParticles(tempParticles);
  }, []);

  return (
    <View style={styles.cardContainer}>
      {/* Confetti overlay */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((p) => (
          <ConfettiParticle key={p.id} particle={p} />
        ))}
      </View>

      <View style={styles.scrollContent}>
        {/* Celebration Header */}
        <View style={styles.headerSection}>
          <View style={styles.badgeWrapper}>
            <Text style={styles.badgeEmoji}>{badge}</Text>
          </View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>

        {/* Stars Earned */}
        <View style={styles.starsBox}>
          <Text style={styles.starsCount}>{starsEarned}</Text>
          <Text style={styles.starsLabel}>FinStars Earned ⭐</Text>
        </View>

        {/* Learnings checklist */}
        <View style={styles.learningsBox}>
          <Text style={styles.learningsTitle}>WHAT YOU LEARNED</Text>
          {learnings.map((item, idx) => (
            <View key={idx} style={styles.learningItem}>
              <Text style={styles.checkIcon}>✓</Text>
              <Text style={styles.learningText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Next Module Teaser */}
        <View style={styles.nextTeaserCard}>
          <Text style={styles.nextTeaserLabel}>UP NEXT</Text>
          <Text style={styles.nextTeaserTitle}>{nextModuleTitle}</Text>
          <Text style={styles.nextTeaserDesc}>{nextModuleDesc}</Text>
        </View>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <Pressable
          onPress={onNextModule}
          style={({ pressed }) => [
            styles.primaryButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.primaryText}>Start Next Module →</Text>
        </Pressable>
        
        <Pressable
          onPress={onReplay}
          style={({ pressed }) => [
            styles.secondaryButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.secondaryText}>↩ Replay</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Confetti Particle Sub-component
function ConfettiParticle({ particle }: { particle: Particle }) {
  const fallY = useSharedValue(-20);
  const driftX = useSharedValue(particle.x);
  const rotateAngle = useSharedValue(0);
  const opacity = useSharedValue(1);

  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    // Falling animation
    fallY.value = withDelay(
      particle.delay,
      withTiming(screenHeight * 0.6, {
        duration: particle.duration,
        easing: Easing.linear,
      })
    );

    // Drifting side-to-side
    driftX.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(particle.x + (Math.random() * 40 - 20), {
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
        }),
        -1,
        true
      )
    );

    // Rotation
    rotateAngle.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(360, {
          duration: particle.duration * 0.5,
          easing: Easing.linear,
        }),
        -1,
        false
      )
    );

    // Fade out near the end
    opacity.value = withDelay(
      particle.delay + particle.duration * 0.7,
      withTiming(0, { duration: particle.duration * 0.3 })
    );
  }, []);

  const particleStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: fallY.value,
    left: driftX.value,
    opacity: opacity.value,
    transform: [{ rotate: `${rotateAngle.value}deg` }],
  }));

  return (
    <Animated.View
      style={[
        particleStyle,
        {
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
          borderRadius: Math.random() > 0.5 ? particle.size / 2 : 2, // Mix circle/squares
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#1F2937",
    borderRadius: 24,
    padding: 18,
    borderWidth: 1,
    borderColor: "#374151",
    minHeight: 520,
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
  },
  scrollContent: {
    flex: 1,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 16,
  },
  badgeWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(79, 70, 229, 0.15)", // Indigo glow tint
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: "rgba(79, 70, 229, 0.3)",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
  },
  badgeEmoji: {
    fontSize: 32,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 6,
    lineHeight: 22,
  },
  subtitleText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  starsBox: {
    backgroundColor: "rgba(16, 185, 129, 0.08)", // Emerald backdrop
    borderWidth: 1,
    borderColor: "rgba(16, 185, 129, 0.2)",
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 18,
    marginHorizontal: 16,
  },
  starsCount: {
    color: "#10B981", // green highlight
    fontSize: 32,
    fontWeight: "900",
  },
  starsLabel: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "750",
    marginTop: 2,
  },
  learningsBox: {
    marginBottom: 20,
    paddingHorizontal: 6,
  },
  learningsTitle: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 10,
  },
  learningItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
    gap: 8,
  },
  checkIcon: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "900",
    marginTop: -1,
  },
  learningText: {
    color: "#D1D5DB",
    fontSize: 12.5,
    fontWeight: "550",
    lineHeight: 17,
    flex: 1,
  },
  nextTeaserCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 10,
  },
  nextTeaserLabel: {
    color: "#3B82F6", // Blue label
    fontSize: 8.5,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  nextTeaserTitle: {
    color: "#FFFFFF",
    fontSize: 13.5,
    fontWeight: "850",
    marginBottom: 3,
  },
  nextTeaserDesc: {
    color: "#9CA3AF",
    fontSize: 11.5,
    fontWeight: "500",
    lineHeight: 15,
  },
  buttonRow: {
    gap: 10,
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "750",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#374151",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#9CA3AF",
    fontSize: 14,
    fontWeight: "650",
  },
});
