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
import { Ionicons } from "@expo/vector-icons";
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
      {/* Top Border Accent Line */}
      <View style={styles.topAccentBar} />

      {/* Confetti overlay */}
      <View style={StyleSheet.absoluteFill} pointerEvents="none">
        {particles.map((p) => (
          <ConfettiParticle key={p.id} particle={p} />
        ))}
      </View>

      <View style={styles.scrollContent}>
        {/* Celebration Trophy Header */}
        <View style={styles.headerSection}>
          <View style={styles.trophyOuterCircle}>
            <View style={styles.trophyInnerCircle}>
              <Ionicons name="trophy" size={36} color="#FFFFFF" />
            </View>
            {/* Green overlapping check circle */}
            <View style={styles.checkBadge}>
              <Ionicons name="checkmark-sharp" size={12} color="#FFFFFF" />
            </View>
          </View>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={styles.subtitleText}>{subtitle}</Text>
        </View>

        {/* Side-by-side stats chips */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={styles.statHeadingRow}>
              <Ionicons name="star" size={16} color="#FBBF24" />
              <Text style={styles.statValue}>{starsEarned}</Text>
            </View>
            <Text style={styles.statLabel}>FinStars Earned</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statHeadingRow}>
              <Ionicons name="time" size={16} color="#8B5CF6" />
              <Text style={styles.statValue}>15m</Text>
            </View>
            <Text style={styles.statLabel}>Time Spent</Text>
          </View>
        </View>

        {/* Learnings checklist */}
        <View style={styles.learningsBox}>
          <Text style={styles.learningsTitle}>KEY LEARNINGS</Text>
          {learnings.map((item, idx) => (
            <View key={idx} style={styles.learningItem}>
              <Ionicons name="checkmark-circle" size={18} color="#10B981" style={styles.checkIcon} />
              <Text style={styles.learningText}>{item}</Text>
            </View>
          ))}
        </View>

        {/* Next Module Teaser Card */}
        <Pressable onPress={onNextModule} style={styles.nextTeaserCard}>
          <View style={styles.nextTeaserLeft}>
            <View style={styles.teaserIconWrapper}>
              <Ionicons name="library" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.nextTeaserInfo}>
              <Text style={styles.nextTeaserLabel}>UP NEXT</Text>
              <Text style={styles.nextTeaserTitle} numberOfLines={1}>{nextModuleTitle}</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </Pressable>
      </View>

      {/* Action buttons */}
      <View style={styles.buttonRow}>
        <Pressable
          onPress={onNextModule}
          style={({ pressed }) => [
            styles.primaryButton,
            { opacity: pressed ? 0.95 : 1 },
          ]}
        >
          <Text style={styles.primaryText}>Continue to Next Module ➔</Text>
        </Pressable>
        
        <Pressable
          onPress={onReplay}
          style={({ pressed }) => [
            styles.secondaryButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.secondaryText}>Back to Dashboard</Text>
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
    backgroundColor: COLORS.surface, // Solid white card surface
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 520,
    justifyContent: "space-between",
    position: "relative",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  topAccentBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: "#FBBF24", // Top horizontal highlight bar
  },
  scrollContent: {
    flex: 1,
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 20,
  },
  trophyOuterCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "rgba(251, 191, 36, 0.15)", // Gold/Yellow translucent outer halo
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    position: "relative",
  },
  trophyInnerCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#FBBF24", // Vibrant gold circle
    alignItems: "center",
    justifyContent: "center",
  },
  checkBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#10B981", // Green check badge
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  titleText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
    lineHeight: 20,
  },
  subtitleText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  statValue: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  statLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "700",
  },
  learningsBox: {
    marginBottom: 24,
    paddingHorizontal: 4,
  },
  learningsTitle: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 12,
  },
  learningItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 10,
    gap: 10,
  },
  checkIcon: {
    marginTop: 1,
  },
  learningText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    flex: 1,
  },
  nextTeaserCard: {
    backgroundColor: "#F3F4F6", // Light gray UP NEXT container
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 8,
  },
  nextTeaserLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  teaserIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#4F46E5", // Purple card background
    alignItems: "center",
    justifyContent: "center",
  },
  nextTeaserInfo: {
    flex: 1,
    gap: 2,
  },
  nextTeaserLabel: {
    color: "#4F46E5", // Purple UP NEXT label
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  nextTeaserTitle: {
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
  },
  buttonRow: {
    gap: 12,
    marginTop: 12,
  },
  primaryButton: {
    backgroundColor: COLORS.primary, // Dark eggplant purple
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  primaryText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryText: {
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "700",
  },
});
