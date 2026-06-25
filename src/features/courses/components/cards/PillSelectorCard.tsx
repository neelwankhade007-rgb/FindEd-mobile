import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export interface PillGroup {
  id: string;
  label: string;
  pills: Array<{
    id: string;
    label: string;
  }>;
}

export interface AllocationResult {
  equity: number; // e.g. 70
  fd: number;     // e.g. 20
  gold: number;   // e.g. 10
  note: string;
}

interface PillSelectorCardProps {
  groups: PillGroup[];
  allocations: Record<string, AllocationResult>; // Key is joint IDs, e.g. 'young-wealth-high'
  onContinue: () => void;
}

export default function PillSelectorCard({
  groups,
  allocations,
  onContinue,
}: PillSelectorCardProps) {
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Initialize first pill in each group as active
  useEffect(() => {
    const initialSelections: Record<string, string> = {};
    groups.forEach((g) => {
      if (g.pills.length > 0) {
        initialSelections[g.id] = g.pills[0].id;
      }
    });
    setSelections(initialSelections);
  }, [groups]);

  // Compute recommendation key
  const jointKey = groups.map((g) => selections[g.id] || "").join("-");
  const activeAllocation = allocations[jointKey] || {
    equity: 40,
    fd: 40,
    gold: 20,
    note: "Diversified profile based on standard recommendations.",
  };

  const handlePillSelect = (groupId: string, pillId: string) => {
    setSelections((prev) => ({
      ...prev,
      [groupId]: pillId,
    }));
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>Personalized Asset Allocation</Text>

        {/* Dynamic Selector Groups */}
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

        {/* Allocation Chart Output */}
        <View style={styles.outputBox}>
          <Text style={styles.outputTitle}>Suggested Portfolio Split</Text>

          {/* Allocation bars layout */}
          <View style={styles.barsContainer}>
            {/* Equities */}
            <View style={styles.barItem}>
              <View style={styles.barInfoRow}>
                <Text style={styles.barLabel}>📈 Equities</Text>
                <Text style={styles.barValue}>{activeAllocation.equity}%</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    styles.fillEquities,
                    { width: `${activeAllocation.equity}%` },
                  ]}
                />
              </View>
            </View>

            {/* Fixed Deposits */}
            <View style={styles.barItem}>
              <View style={styles.barInfoRow}>
                <Text style={styles.barLabel}>🏦 Fixed Deposits</Text>
                <Text style={styles.barValue}>{activeAllocation.fd}%</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    styles.fillFd,
                    { width: `${activeAllocation.fd}%` },
                  ]}
                />
              </View>
            </View>

            {/* Gold */}
            <View style={styles.barItem}>
              <View style={styles.barInfoRow}>
                <Text style={styles.barLabel}>🪙 Gold</Text>
                <Text style={styles.barValue}>{activeAllocation.gold}%</Text>
              </View>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    styles.fillGold,
                    { width: `${activeAllocation.gold}%` },
                  ]}
                />
              </View>
            </View>
          </View>

          <Text style={styles.recommendationNote}>
            {activeAllocation.note}
          </Text>

          <Text style={styles.disclaimerText}>
            *This is illustrative Compounding modeling and does not constitute formal financial advice.
          </Text>
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
    padding: 18,
    borderWidth: 1,
    borderColor: "#374151",
    minHeight: 520,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },
  selectorsWrapper: {
    gap: 14,
    marginBottom: 20,
  },
  groupContainer: {
    gap: 6,
  },
  groupLabel: {
    color: "#9CA3AF",
    fontSize: 11,
    fontWeight: "750",
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  pill: {
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  selectedPill: {
    borderColor: "#10B981", // Emerald border
    backgroundColor: "rgba(16, 185, 129, 0.08)",
  },
  pillText: {
    color: "#9CA3AF",
    fontSize: 12.5,
    fontWeight: "600",
  },
  selectedPillText: {
    color: "#10B981",
    fontWeight: "800",
  },
  outputBox: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    padding: 16,
  },
  outputTitle: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 12,
    textAlign: "center",
  },
  barsContainer: {
    gap: 10,
    marginBottom: 12,
  },
  barItem: {
    gap: 4,
  },
  barInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  barLabel: {
    color: "#D1D5DB",
    fontSize: 11,
    fontWeight: "650",
  },
  barValue: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },
  barTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: "#1F2937",
    width: "100%",
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: 3,
  },
  fillEquities: {
    backgroundColor: "#10B981", // green
  },
  fillFd: {
    backgroundColor: "#3B82F6", // blue
  },
  fillGold: {
    backgroundColor: "#FBBF24", // yellow
  },
  recommendationNote: {
    color: "#9CA3AF",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "500",
    fontStyle: "italic",
    marginTop: 4,
  },
  disclaimerText: {
    color: "#4B5563",
    fontSize: 8.5,
    fontWeight: "550",
    marginTop: 10,
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
