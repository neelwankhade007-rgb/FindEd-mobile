import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { COLORS } from "@/constants/colors";

interface SliderCalculatorCardProps {
  title: string;
  subtitle?: string;
  minVal: number;
  maxVal: number;
  defaultVal: number;
  step?: number;
  unitLabel?: string;
  calcFormula: (val: number) => {
    outputVal: string;
    contribution: number;
    gains: number;
    contributionFormatted: string;
    gainsFormatted: string;
  };
  onContinue: () => void;
}

export default function SliderCalculatorCard({
  title,
  subtitle,
  minVal,
  maxVal,
  defaultVal,
  step = 1,
  unitLabel = "years",
  calcFormula,
  onContinue,
}: SliderCalculatorCardProps) {
  const [sliderVal, setSliderVal] = useState<number>(defaultVal);
  const [trackWidth, setTrackWidth] = useState<number>(0);

  const {
    outputVal,
    contribution,
    gains,
    contributionFormatted,
    gainsFormatted,
  } = calcFormula(sliderVal);

  const total = contribution + gains;
  const contributionPercent = total > 0 ? (contribution / total) * 100 : 50;
  const gainsPercent = total > 0 ? (gains / total) * 100 : 50;

  const handleTouch = (event: any) => {
    if (trackWidth <= 0) return;
    const touchX = event.nativeEvent.locationX;
    const percentage = Math.max(0, Math.min(1, touchX / trackWidth));
    const rawVal = minVal + percentage * (maxVal - minVal);
    const stepVal = Math.round(rawVal / step) * step;
    const finalVal = Math.max(minVal, Math.min(maxVal, stepVal));
    setSliderVal(finalVal);
  };

  const activePercent = ((sliderVal - minVal) / (maxVal - minVal)) * 100;

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>
        {subtitle ? <Text style={styles.cardSubtitle}>{subtitle}</Text> : null}

        {/* Custom Slider */}
        <View style={styles.sliderSection}>
          <View style={styles.sliderHeader}>
            <Text style={styles.sliderLabel}>Years Invested</Text>
            <Text style={styles.sliderValueText}>
              {sliderVal} <Text style={styles.sliderUnitText}>{unitLabel}</Text>
            </Text>
          </View>

          <View
            style={styles.sliderTrackWrapper}
            onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
          >
            <Pressable
              style={styles.sliderTrackPressable}
              onTouchStart={handleTouch}
              onTouchMove={handleTouch}
            >
              {/* Back Track */}
              <View style={styles.sliderTrackBack} />
              {/* Active Fill Track */}
              <View
                style={[
                  styles.sliderTrackFill,
                  { width: `${activePercent}%` },
                ]}
              />
              {/* Thumb */}
              <View
                style={[
                  styles.sliderThumb,
                  { left: `${activePercent}%` },
                ]}
              />
            </Pressable>
          </View>

          <View style={styles.sliderLimitsRow}>
            <Text style={styles.limitText}>{minVal}</Text>
            <Text style={styles.limitText}>{maxVal}</Text>
          </View>
        </View>

        {/* Live Calculation Output */}
        <View style={styles.resultBox}>
          <Text style={styles.resultIntroText}>₹10,000 grows to</Text>
          <Text style={styles.resultMainValue}>{outputVal}</Text>
          <Text style={styles.resultRateText}>
            at <Text style={styles.resultRateHighlight}>12% CAGR</Text>
          </Text>

          {/* Breakdown progress bar */}
          <View style={styles.breakdownBar}>
            <View
              style={[
                styles.breakdownContribution,
                { width: `${contributionPercent}%` },
              ]}
            />
            <View
              style={[
                styles.breakdownGains,
                { width: `${gainsPercent}%` },
              ]}
            />
          </View>

          {/* Legend labels */}
          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.dotBlue]} />
              <Text style={styles.legendText}>
                Invested: <Text style={styles.legendValText}>{contributionFormatted}</Text>
              </Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, styles.dotGreen]} />
              <Text style={styles.legendText}>
                Gains: <Text style={styles.legendValText}>{gainsFormatted}</Text>
              </Text>
            </View>
          </View>
        </View>
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
    minHeight: 480,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 4,
  },
  cardSubtitle: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  sliderSection: {
    marginBottom: 24,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sliderLabel: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "700",
  },
  sliderValueText: {
    color: "#4F46E5", // Purple highlight
    fontSize: 18,
    fontWeight: "800",
  },
  sliderUnitText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "600",
  },
  sliderTrackWrapper: {
    height: 30,
    justifyContent: "center",
    width: "100%",
  },
  sliderTrackPressable: {
    height: "100%",
    justifyContent: "center",
    position: "relative",
    width: "100%",
  },
  sliderTrackBack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#374151",
    width: "100%",
  },
  sliderTrackFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#4F46E5",
    position: "absolute",
  },
  sliderThumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    borderWidth: 4,
    borderColor: "#4F46E5",
    position: "absolute",
    marginLeft: -10, // Centers thumb on position
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  sliderLimitsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 4,
  },
  limitText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
  },
  resultBox: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    padding: 18,
    alignItems: "center",
  },
  resultIntroText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4,
  },
  resultMainValue: {
    color: "#10B981", // Emerald green
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 4,
  },
  resultRateText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 16,
  },
  resultRateHighlight: {
    color: "#9CA3AF",
    fontWeight: "750",
  },
  breakdownBar: {
    flexDirection: "row",
    height: 8,
    borderRadius: 4,
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#374151",
    marginBottom: 14,
  },
  breakdownContribution: {
    backgroundColor: "#3B82F6", // Invested blue
    height: "100%",
  },
  breakdownGains: {
    backgroundColor: "#10B981", // Gains green
    height: "100%",
  },
  legendRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 4,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotBlue: {
    backgroundColor: "#3B82F6",
  },
  dotGreen: {
    backgroundColor: "#10B981",
  },
  legendText: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "600",
  },
  legendValText: {
    color: "#F3F4F6",
    fontWeight: "750",
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
