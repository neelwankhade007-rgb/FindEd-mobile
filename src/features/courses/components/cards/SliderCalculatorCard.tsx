import React, { useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet, PanResponder } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

interface SliderCalculatorCardProps {
  title?: string;
  onContinue: () => void;
}

export default function SliderCalculatorCard({
  title = "What does this look like for you?",
  onContinue,
}: SliderCalculatorCardProps) {
  const [monthlyVal, setMonthlyVal] = useState<number>(500);
  const [yearsVal, setYearsVal] = useState<number>(10);

  const [trackWidth1, setTrackWidth1] = useState<number>(0);
  const [trackWidth2, setTrackWidth2] = useState<number>(0);

  const trackWidthRef1 = useRef(0);
  const trackWidthRef2 = useRef(0);

  // Keep ref sync to avoid stale closures in PanResponder callbacks
  trackWidthRef1.current = trackWidth1;
  trackWidthRef2.current = trackWidth2;

  // Math formula for monthly compound interest at 7% annual return
  const r = 0.07;
  const n = 12; // Compounded monthly
  const totalMonths = yearsVal * n;
  const monthlyRate = r / n;

  // S = P * ((1 + r)^n - 1) / r
  const investedValue = Math.round(
    monthlyVal * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate)
  );
  
  const inSavings = monthlyVal * n * yearsVal;
  const potentialGrowth = Math.max(0, investedValue - inSavings);

  const updateValue1 = (x: number) => {
    const width = trackWidthRef1.current;
    if (width <= 0) return;
    const percentage = Math.max(0, Math.min(1, x / width));
    const minVal = 100;
    const maxVal = 2000;
    const step = 50;
    const rawVal = minVal + percentage * (maxVal - minVal);
    const stepVal = Math.round(rawVal / step) * step;
    setMonthlyVal(Math.max(minVal, Math.min(maxVal, stepVal)));
  };

  const updateValue2 = (x: number) => {
    const width = trackWidthRef2.current;
    if (width <= 0) return;
    const percentage = Math.max(0, Math.min(1, x / width));
    const minVal = 1;
    const maxVal = 40;
    const step = 1;
    const rawVal = minVal + percentage * (maxVal - minVal);
    const stepVal = Math.round(rawVal / step) * step;
    setYearsVal(Math.max(minVal, Math.min(maxVal, stepVal)));
  };

  // PanResponder for Slider 1: Monthly Investment
  const panResponder1 = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateValue1(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        updateValue1(evt.nativeEvent.locationX);
      },
    })
  ).current;

  // PanResponder for Slider 2: Years
  const panResponder2 = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        updateValue2(evt.nativeEvent.locationX);
      },
      onPanResponderMove: (evt) => {
        updateValue2(evt.nativeEvent.locationX);
      },
    })
  ).current;

  const activePercent1 = ((monthlyVal - 100) / (2000 - 100)) * 100;
  const activePercent2 = ((yearsVal - 1) / (40 - 1)) * 100;

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>

        {/* Input Card/Box containing both sliders */}
        <View style={styles.slidersWrapper}>
          {/* Slider 1: Monthly Investment */}
          <View style={styles.sliderSection}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Monthly investment</Text>
              <Text style={styles.sliderValueText}>
                ${monthlyVal.toLocaleString()}
              </Text>
            </View>
            <View
              style={styles.sliderTrackWrapper}
              onLayout={(e) => setTrackWidth1(e.nativeEvent.layout.width)}
              {...panResponder1.panHandlers}
            >
              <View style={styles.sliderTrackBack} pointerEvents="none" />
              <View
                style={[styles.sliderTrackFill, { width: `${activePercent1}%` }]}
                pointerEvents="none"
              />
              <View
                style={[styles.sliderThumb, { left: `${activePercent1}%` }]}
                pointerEvents="none"
              />
            </View>
          </View>

          {/* Slider 2: Years */}
          <View style={styles.sliderSection}>
            <View style={styles.sliderHeader}>
              <Text style={styles.sliderLabel}>Years</Text>
              <Text style={styles.sliderValueText}>
                {yearsVal} {yearsVal === 1 ? "Year" : "Years"}
              </Text>
            </View>
            <View
              style={styles.sliderTrackWrapper}
              onLayout={(e) => setTrackWidth2(e.nativeEvent.layout.width)}
              {...panResponder2.panHandlers}
            >
              <View style={styles.sliderTrackBack} pointerEvents="none" />
              <View
                style={[styles.sliderTrackFill, { width: `${activePercent2}%` }]}
                pointerEvents="none"
              />
              <View
                style={[styles.sliderThumb, { left: `${activePercent2}%` }]}
                pointerEvents="none"
              />
            </View>
          </View>

          {/* Summary Chips Row */}
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, styles.bgLightGray]}>
              <Text style={styles.summaryLabel}>In Savings</Text>
              <Text style={styles.summaryValue}>
                ${inSavings.toLocaleString()}
              </Text>
            </View>
            <View style={[styles.summaryCard, styles.bgLightPurple]}>
              <Text style={styles.summaryLabel}>Invested</Text>
              <Text style={[styles.summaryValue, styles.textPurple]}>
                ${investedValue.toLocaleString()}
              </Text>
            </View>
          </View>

          {/* Potential Growth Display */}
          <View style={styles.growthPanel}>
            <Text style={styles.growthTitle}>POTENTIAL GROWTH</Text>
            <Text style={styles.growthValue}>
              + ${potentialGrowth.toLocaleString()}
            </Text>
            <Text style={styles.growthSubtext}>
              Based on an estimated 7% annual return.
            </Text>
          </View>
        </View>
      </View>

      {/* Footer Elements */}
      <View style={styles.footerContainer}>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.continueButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.continueText}>Continue to Next Step →</Text>
        </Pressable>

        {/* Tip Box */}
        <View style={styles.tipBox}>
          <Ionicons name="bulb-outline" size={18} color="#4B5563" style={styles.tipIcon} />
          <Text style={styles.tipText}>
            Compounding works best when you start early. Even $100 a month makes a massive difference over 20 years!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.surface, // Light card surface
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 560,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 20,
  },
  slidersWrapper: {
    gap: 16,
  },
  sliderSection: {
    marginBottom: 4,
  },
  sliderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  sliderLabel: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "700",
  },
  sliderValueText: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  sliderTrackWrapper: {
    height: 24,
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
    backgroundColor: "#E5E7EB",
    width: "100%",
  },
  sliderTrackFill: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#C7D2FE", // Soft violet active track
    position: "absolute",
  },
  sliderThumb: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#4F46E5", // Deep indigo thumb
    position: "absolute",
    marginLeft: -9,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
    elevation: 3,
  },
  summaryRow: {
    flexDirection: "row",
    gap: 12,
    marginTop: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  bgLightGray: {
    backgroundColor: "#F9FAFB",
  },
  bgLightPurple: {
    backgroundColor: "#EEF2FF",
    borderColor: "#C7D2FE",
  },
  summaryLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
  },
  summaryValue: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  textPurple: {
    color: "#4F46E5",
  },
  growthPanel: {
    backgroundColor: "#ECFDF5", // Soft green background
    borderWidth: 1,
    borderColor: "#A7F3D0",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  growthTitle: {
    color: "#059669",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
    marginBottom: 4,
  },
  growthValue: {
    color: "#059669",
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 4,
  },
  growthSubtext: {
    color: "#374151",
    fontSize: 11,
    fontWeight: "600",
  },
  footerContainer: {
    gap: 16,
    marginTop: 20,
  },
  continueButton: {
    backgroundColor: COLORS.accent, // Yellow accent button color from COLORS
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
  tipBox: {
    flexDirection: "row",
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 12,
    gap: 10,
    alignItems: "flex-start",
  },
  tipIcon: {
    marginTop: 1,
  },
  tipText: {
    flex: 1,
    color: "#4B5563",
    fontSize: 11,
    fontStyle: "italic",
    lineHeight: 16,
    fontWeight: "500",
  },
});
