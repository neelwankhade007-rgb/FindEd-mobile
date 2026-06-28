import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface PillGroup {
  id: string;
  label: string;
  pills: Array<{
    id: string;
    label: string;
  }>;
}

export interface AllocationResult {
  equity: number; // e.g. 60
  fd: number;     // e.g. 30 (labeled as Debt in mockup)
  gold: number;   // e.g. 10
  note: string;
}

interface PillSelectorCardProps {
  groups?: PillGroup[];
  allocations?: Record<string, AllocationResult>; // Key is joint IDs
  onContinue: () => void;
}

export default function PillSelectorCard({
  groups = [
    {
      id: "time",
      label: "TIME HORIZON",
      pills: [
        { id: "short", label: "Short Term" },
        { id: "medium", label: "Medium Term" },
        { id: "long", label: "Long Term" },
      ],
    },
    {
      id: "risk",
      label: "RISK PROFILE",
      pills: [
        { id: "safe", label: "Safe" },
        { id: "balanced", label: "Balanced" },
        { id: "growth", label: "Growth" },
      ],
    },
    {
      id: "amount",
      label: "MONTHLY AMOUNT",
      pills: [
        { id: "low", label: "< 5k" },
        { id: "mid", label: "5k - 15k" },
        { id: "high", label: "> 15k" },
      ],
    },
  ],
  allocations = {
    "short-safe-low": { equity: 10, fd: 80, gold: 10, note: "Based on your conservative profile, safety is maximized." },
    "medium-balanced-high": { equity: 60, fd: 30, gold: 10, note: "Based on your balanced risk profile and long-term outlook, this allocation maximizes growth while maintaining a safety net." },
    // Fallbacks will map to medium-balanced-high representation
  },
  onContinue,
}: PillSelectorCardProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Initialize selected values
  useEffect(() => {
    const initialSelections: Record<string, string> = {};
    groups.forEach((g) => {
      if (g.pills.length > 0) {
        // Default to middle/last to represent Medium Term, Balanced, > 15k
        if (g.id === "time") initialSelections[g.id] = "medium";
        else if (g.id === "risk") initialSelections[g.id] = "balanced";
        else if (g.id === "amount") initialSelections[g.id] = "high";
        else initialSelections[g.id] = g.pills[0].id;
      }
    });
    setSelections(initialSelections);
  }, [groups]);

  // Joint recommendation computation logic based on selected pills
  const getDynamicAllocation = (): AllocationResult => {
    const time = selections["time"] || "medium";
    const risk = selections["risk"] || "balanced";
    const amount = selections["amount"] || "high";

    let equity = 50;
    let debt = 40;
    let gold = 10;
    let note = "";

    // 1. Base by Risk Profile
    if (risk === "safe") {
      equity = 15;
      debt = 75;
      gold = 10;
      note = "With a safe risk profile, capital preservation is prioritized. Most funds are allocated to low-volatility debt.";
    } else if (risk === "growth") {
      equity = 80;
      debt = 10;
      gold = 10;
      note = "A growth-oriented profile leverages stock market gains. A larger share goes into equities for maximum returns.";
    } else { // balanced
      equity = 60;
      debt = 30;
      gold = 10;
      note = "Based on your balanced risk profile, this allocation maximizes growth while maintaining a safety net.";
    }

    // 2. Adjust by Time Horizon
    if (time === "short") {
      equity = Math.max(10, equity - 20);
      debt = Math.min(80, debt + 20);
      note += " A short time horizon means money is kept safe and highly liquid.";
    } else if (time === "long") {
      equity = Math.min(90, equity + 10);
      debt = Math.max(5, debt - 10);
      note += " A long-term outlook lets you ride out short-term market dips for bigger compound gains.";
    }

    // 3. Adjust by Amount
    if (amount === "high") {
      equity = Math.min(90, equity + 5);
      debt = Math.max(5, debt - 5);
    }

    // Ensure total is 100%
    const remaining = 100 - (equity + gold);
    debt = Math.max(0, remaining);

    return {
      equity,
      fd: debt,
      gold,
      note,
    };
  };

  const activeAllocation = getDynamicAllocation();

  const handlePillSelect = (groupId: string, pillId: string) => {
    setSelections((prev) => ({
      ...prev,
      [groupId]: pillId,
    }));
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>What's your main goal?</Text>

        {/* Pill selector wrapper */}
        <View style={styles.selectorsWrapper}>
          {groups.map((group) => (
            <View key={group.id} style={styles.groupContainer}>
              <Text style={styles.groupLabel}>{group.label}</Text>
              <View style={styles.pillRow}>
                {group.pills.map((pill) => {
                  const isSelected = selections[group.id] === pill.id;
                  return (
                    <Pressable
                      key={pill.id}
                      onPress={() => handlePillSelect(group.id, pill.id)}
                      style={[
                        styles.pill,
                        isSelected ? styles.selectedPill : null,
                      ]}
                    >
                      <Text
                        style={[
                          styles.pillText,
                          isSelected ? styles.selectedPillText : null,
                        ]}
                      >
                        {pill.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          ))}
        </View>

        {/* Suggestion Output card (lavender) */}
        <View style={styles.outputBox}>
          <View style={styles.outputHeader}>
            <Text style={styles.outputTitle}>Your Strategy</Text>
            <Ionicons name="trending-up-outline" size={18} color="#4F46E5" />
          </View>

          <View style={styles.barsContainer}>
            {/* Equity */}
            <View style={styles.barItem}>
              <View style={styles.barInfoRow}>
                <Text style={styles.barLabel}>Equity</Text>
                <Text style={styles.barValue}>{activeAllocation.equity}%</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${activeAllocation.equity}%`, backgroundColor: "#4F46E5" },
                  ]}
                />
              </View>
            </View>

            {/* Debt */}
            <View style={styles.barItem}>
              <View style={styles.barInfoRow}>
                <Text style={styles.barLabel}>Debt</Text>
                <Text style={styles.barValue}>{activeAllocation.fd}%</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${activeAllocation.fd}%`, backgroundColor: "#818CF8" },
                  ]}
                />
              </View>
            </View>

            {/* Gold */}
            <View style={styles.barItem}>
              <View style={styles.barInfoRow}>
                <Text style={styles.barLabel}>Gold</Text>
                <Text style={styles.barValue}>{activeAllocation.gold}%</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    { width: `${activeAllocation.gold}%`, backgroundColor: COLORS.accent },
                  ]}
                />
              </View>
            </View>
          </View>

          <Text style={styles.recommendationNote}>
            {activeAllocation.note}
          </Text>
        </View>
      </View>

      <Pressable
        onPress={onContinue}
        style={({ pressed }) => [
          styles.continueButton,
          { opacity: pressed ? 0.95 : 1, marginTop: 24 },
        ]}
      >
        <Text style={styles.continueText}>Continue to Next Step</Text>
      </Pressable>
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
  },
  selectorsWrapper: {
    gap: 16,
    marginBottom: 24,
  },
  groupContainer: {
    gap: 8,
  },
  groupLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  pill: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  selectedPill: {
    borderColor: COLORS.primary, // Vibrant purple primary
    backgroundColor: COLORS.primary,
  },
  pillText: {
    color: "#4B5563",
    fontSize: 13,
    fontWeight: "600",
  },
  selectedPillText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
  outputBox: {
    backgroundColor: "#F5F3FF", // Light lavender background
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  outputHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  outputTitle: {
    color: "#1E1B4B",
    fontSize: 14,
    fontWeight: "800",
  },
  barsContainer: {
    gap: 12,
    marginBottom: 16,
  },
  barItem: {
    gap: 6,
  },
  barInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barLabel: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "600",
  },
  barValue: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
    width: "100%",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  recommendationNote: {
    color: "#4F46E5",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
    fontStyle: "italic",
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
});
