import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

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

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>Explore Risk & Return</Text>

        {/* The Track & Dots */}
        <View style={styles.spectrumContainer}>
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
                        backgroundColor: dot.color,
                        transform: [{ scale: isActive ? 1.4 : 1.0 }],
                      },
                      isActive ? styles.activeDotCircle : null,
                    ]}
                  />
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

          {/* Axis labels */}
          <View style={styles.axisContainer}>
            <Text style={styles.axisLabel}>← Lower Risk</Text>
            <Text style={styles.axisLabel}>Higher Risk →</Text>
          </View>
        </View>

        {/* Info Box below */}
        {activeDot && (
          <View style={styles.infoBox}>
            <View style={styles.infoHeader}>
              <Text style={[styles.infoTitle, { color: activeDot.color }]}>
                {activeDot.title}
              </Text>
              <View style={styles.infoMetrics}>
                <Text style={styles.infoMetricText}>
                  Return: <Text style={styles.boldText}>{activeDot.returnVal}</Text>
                </Text>
                <Text style={styles.infoMetricDivider}>|</Text>
                <Text style={styles.infoMetricText}>
                  Risk: <Text style={styles.boldText}>{activeDot.riskVal}</Text>
                </Text>
              </View>
            </View>
            <Text style={styles.infoDesc}>{activeDot.description}</Text>
          </View>
        )}
      </View>

      <Pressable
        onPress={onContinue}
        style={({ pressed }) => [
          styles.continueButton,
          { opacity: pressed ? 0.9 : 1, marginTop: 16 },
        ]}
      >
        <Text style={styles.continueText}>Continue →</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#1F2937",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
    minHeight: 460,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
  },
  spectrumContainer: {
    paddingVertical: 12,
    marginBottom: 20,
    width: "100%",
  },
  trackContainer: {
    height: 40,
    position: "relative",
    justifyContent: "center",
    width: "100%",
  },
  gradientTrack: {
    height: 8,
    borderRadius: 4,
    width: "100%",
  },
  dotWrapper: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    marginTop: -8, // Centers the dot vertically relative to track
  },
  dotCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  activeDotCircle: {
    shadowColor: "#FFFFFF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2.5,
  },
  dotLabelText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "700",
    marginTop: 8,
    textAlign: "center",
  },
  activeLabelText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  axisContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 18,
    paddingHorizontal: 4,
  },
  axisLabel: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "700",
  },
  infoBox: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    padding: 16,
    minHeight: 110,
  },
  infoHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    flexWrap: "wrap",
    gap: 4,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "800",
  },
  infoMetrics: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  infoMetricText: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "500",
  },
  infoMetricDivider: {
    color: "#374151",
    fontSize: 11,
  },
  boldText: {
    color: "#FFFFFF",
    fontWeight: "750",
  },
  infoDesc: {
    color: "#D1D5DB",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
  },
  continueButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "750",
  },
});
