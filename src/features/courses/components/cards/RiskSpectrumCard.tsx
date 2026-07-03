import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface SpectrumDot {
  id: string;
  label: string;
  positionPercent: number; // e.g. 10 (for 10%)
  color: string;
  title: string;
  returnVal: string;
  riskVal: string;
  description: string;
}

interface RiskSpectrumCardProps {
  dots: SpectrumDot[];
  onContinue: () => void;
}

export default function RiskSpectrumCard({
  dots,
  onContinue,
}: RiskSpectrumCardProps) {
  const [activeDotId, setActiveDotId] = useState<string>(dots[0]?.id || "");
  const activeDot = dots.find((d) => d.id === activeDotId);

  // Helper to get Volatility and Potential Reward values (0-100) based on asset type
  const getAssetMetrics = (id: string) => {
    switch (id) {
      case "fd":
        return { volatility: 15, reward: 20, icon: "shield-checkmark-outline" };
      case "gold":
        return { volatility: 30, reward: 35, icon: "wallet-outline" };
      case "mf":
        return { volatility: 55, reward: 60, icon: "analytics-outline" };
      case "eq":
        return { volatility: 90, reward: 95, icon: "trending-up-outline" };
      default:
        return { volatility: 50, reward: 50, icon: "cube-outline" };
    }
  };

  const metrics = activeDot ? getAssetMetrics(activeDot.id) : null;

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>Explore Risk & Return</Text>

        {/* Axis & Spectrum Container */}
        <View style={styles.spectrumContainer}>
          {/* Axis Labels Above the Track */}
          <View style={styles.axisHeader}>
            <View>
              <Text style={styles.axisTitleConservative}>Conservative</Text>
              <Text style={styles.axisSubtitle}>Low Risk</Text>
            </View>
            <View style={styles.alignRight}>
              <Text style={styles.axisTitleAggressive}>Aggressive</Text>
              <Text style={styles.axisSubtitle}>High Risk</Text>
            </View>
          </View>

          {/* The Track & Dots */}
          <View style={styles.trackContainer}>
            <LinearGradient
              colors={["#3B82F6", "#10B981", "#FBBF24", "#EF4444"]}
              style={styles.gradientTrack}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            />

            {/* Positioned Dots */}
            {dots.map((dot) => {
              const isActive = dot.id === activeDotId;
              return (
                <View
                  key={dot.id}
                  style={[
                    styles.dotWrapper,
                    { left: `${dot.positionPercent}%` },
                  ]}
                >
                  <Pressable
                    onPress={() => setActiveDotId(dot.id)}
                    style={[
                      styles.dotCircle,
                      {
                        borderColor: dot.color,
                        borderWidth: isActive ? 3.5 : 2.5,
                        transform: [{ scale: isActive ? 1.25 : 1.0 }],
                      },
                      isActive ? styles.activeDotCircle : null,
                    ]}
                  >
                    {isActive && (
                      <View
                        style={[
                          styles.dotCore,
                          { backgroundColor: dot.color },
                        ]}
                      />
                    )}
                  </Pressable>
                  <Text
                    style={[
                      styles.dotLabelText,
                      isActive ? styles.activeLabelText : null,
                    ]}
                  >
                    {dot.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Info Box below */}
        {activeDot && metrics && (
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Ionicons name={metrics.icon as any} size={20} color="#4F46E5" />
              <Text style={styles.infoTitle}>
                {activeDot.title}
              </Text>
            </View>
            <Text style={styles.infoDesc}>{activeDot.description}</Text>

            {/* Progress Bars for Volatility and Reward */}
            <View style={styles.metricsProgressRow}>
              <View style={styles.metricProgressBarContainer}>
                <Text style={styles.progressBarLabel}>Volatility</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${metrics.volatility}%` },
                    ]}
                  />
                </View>
              </View>

              <View style={styles.metricProgressBarContainer}>
                <Text style={styles.progressBarLabel}>Potential Reward</Text>
                <View style={styles.progressBarBackground}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${metrics.reward}%` },
                    ]}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Buttons */}
      <View style={styles.footerContainer}>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.continueButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.continueText}>Continue Lesson</Text>
        </Pressable>

        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.secondaryButton,
            { opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Text style={styles.secondaryButtonText}>Save for Later</Text>
        </Pressable>
      </View>
    </View>
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 20,
    textAlign: "center",
  },
  spectrumContainer: {
    marginBottom: 24,
    width: "100%",
  },
  axisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  axisTitleConservative: {
    color: "#3B82F6",
    fontSize: 13,
    fontWeight: "800",
  },
  axisTitleAggressive: {
    color: "#EF4444",
    fontSize: 13,
    fontWeight: "800",
  },
  axisSubtitle: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  alignRight: {
    alignItems: "flex-end",
  },
  trackContainer: {
    height: 40,
    position: "relative",
    justifyContent: "center",
    width: "100%",
  },
  gradientTrack: {
    height: 5, // Sleeker, thinner track line
    borderRadius: 2.5,
    width: "100%",
  },
  dotWrapper: {
    position: "absolute",
    alignItems: "center",
    width: 60,
    marginLeft: -30,
    top: 20, // Center vertically on the trackContainer (height 40)
    transform: [{ translateY: -9 }], // Offset by half of dotCircle height (18/2 = 9) to center the dot on the line
  },
  dotCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF", // Hollow white center by default
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  dotCore: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDotCircle: {
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  dotLabelText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },
  activeLabelText: {
    color: "#111827",
    fontWeight: "800",
  },
  infoBox: {
    backgroundColor: "#F8FAFC", // Clean, soft slate background
    borderRadius: 16,
    padding: 16,
    gap: 8,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  infoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  infoTitle: {
    color: "#1E1B4B", // Crisp navy header color
    fontSize: 15,
    fontWeight: "800",
  },
  infoDesc: {
    color: "#374151", // High contrast dark charcoal/grey
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  metricsProgressRow: {
    flexDirection: "row",
    gap: 16,
    marginTop: 8,
  },
  metricProgressBarContainer: {
    flex: 1,
  },
  progressBarLabel: {
    color: "#6B7280",
    fontSize: 9,
    fontWeight: "700",
    marginBottom: 4,
  },
  progressBarBackground: {
    height: 4, // Minimal, thin progress bars
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    width: "100%",
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4F46E5", // Purple fill
    borderRadius: 2,
  },
  footerContainer: {
    gap: 12,
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: COLORS.accent, // Yellow accent color from COLORS
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonText: {
    color: "#4B5563",
    fontSize: 15,
    fontWeight: "700",
  },
});
