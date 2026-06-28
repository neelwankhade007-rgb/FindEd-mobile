import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface ExplorerTile {
  id: string;
  icon: string;
  name: string;
  subtitle: string;
}

export interface ExplorerDetail {
  returnVal: string;
  returnLevel: "high" | "mid" | "low";
  riskVal: string;
  riskLevel: "high" | "mid" | "low";
  liquidityVal: string;
  liquidityLevel: "high" | "mid" | "low";
  description: string;
  bestFor: string;
}

interface InteractiveExplorerCardProps {
  tiles: ExplorerTile[];
  detailsData: Record<string, ExplorerDetail>;
  onContinue: () => void;
}

export default function InteractiveExplorerCard({
  tiles,
  detailsData,
  onContinue,
}: InteractiveExplorerCardProps) {
  const [activeTileId, setActiveTileId] = useState<string | null>(null);
  const activeDetail = activeTileId ? detailsData[activeTileId] : null;

  // Slide-up animation for detail panel
  const panelTranslateY = useSharedValue(20);
  const panelOpacity = useSharedValue(0);

  useEffect(() => {
    if (activeTileId) {
      panelTranslateY.value = 20;
      panelOpacity.value = 0;

      panelTranslateY.value = withSpring(0, { damping: 15 });
      panelOpacity.value = withSpring(1);
    }
  }, [activeTileId, panelOpacity, panelTranslateY]);

  const animatedPanelStyle = useAnimatedStyle(() => ({
    opacity: panelOpacity.value,
    transform: [{ translateY: panelTranslateY.value }],
  }));

  const getLevelColor = (level: "high" | "mid" | "low") => {
    if (level === "high") return { bg: "rgba(239, 68, 68, 0.1)", text: "#EF4444" }; // Red
    if (level === "mid") return { bg: "rgba(245, 158, 11, 0.1)", text: "#F59E0B" }; // Amber
    return { bg: "rgba(16, 185, 129, 0.1)", text: "#10B981" }; // Green
  };

  const getTileColor = (id: string) => {
    switch (id) {
      case "fd": return "#3B82F6"; // Blue
      case "gold": return "#B45309"; // Dark Amber / Gold
      case "realestate": return "#8B5CF6"; // Purple
      case "equity": return "#10B981"; // Green
      default: return COLORS.primary;
    }
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        {/* Intro Subtitle */}
        <Text style={styles.cardDescription}>
          Tap on an asset class to understand its role in your portfolio. Every choice carries a different balance of risk and reward.
        </Text>

        {/* Tile Grid */}
        <View style={styles.tileGrid}>
          {tiles.map((tile) => {
            const isActive = tile.id === activeTileId;
            const tileColor = getTileColor(tile.id);
            return (
              <Pressable
                key={tile.id}
                onPress={() => setActiveTileId(activeTileId === tile.id ? null : tile.id)}
                style={[
                  styles.tile,
                  isActive ? { borderColor: tileColor, backgroundColor: tileColor + "08" } : null,
                ]}
              >
                <View style={styles.tileIconWrapper}>
                  <Ionicons name={tile.icon as any} size={22} color={tileColor} />
                </View>
                <Text style={styles.tileName} numberOfLines={1}>{tile.name}</Text>
                <Text style={styles.tileSub} numberOfLines={1}>{tile.subtitle}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Dynamic Detail Panel or Placeholder */}
        {!activeTileId ? (
          <View style={styles.placeholderPanel}>
            <Ionicons name="hand-left-outline" size={32} color="#9CA3AF" style={styles.placeholderIcon} />
            <Text style={styles.placeholderText}>Select an asset to see insights</Text>
          </View>
        ) : (
          activeDetail && (
            <Animated.View style={[styles.detailPanel, animatedPanelStyle]}>
              {/* Metric Row */}
              <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>RETURNS</Text>
                  <View
                    style={[
                      styles.metricBadge,
                      { backgroundColor: getLevelColor(activeDetail.returnLevel).bg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.metricBadgeText,
                        { color: getLevelColor(activeDetail.returnLevel).text },
                      ]}
                    >
                      {activeDetail.returnVal}
                    </Text>
                  </View>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>RISK</Text>
                  <View
                    style={[
                      styles.metricBadge,
                      { backgroundColor: getLevelColor(activeDetail.riskLevel).bg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.metricBadgeText,
                        { color: getLevelColor(activeDetail.riskLevel).text },
                      ]}
                    >
                      {activeDetail.riskVal}
                    </Text>
                  </View>
                </View>

                <View style={styles.metricItem}>
                  <Text style={styles.metricLabel}>LIQUIDITY</Text>
                  <View
                    style={[
                      styles.metricBadge,
                      { backgroundColor: getLevelColor(activeDetail.liquidityLevel).bg },
                    ]}
                  >
                    <Text
                      style={[
                        styles.metricBadgeText,
                        { color: getLevelColor(activeDetail.liquidityLevel).text },
                      ]}
                    >
                      {activeDetail.liquidityVal}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Description */}
              <Text style={styles.detailDesc}>{activeDetail.description}</Text>

              {/* Best For section */}
              <View style={styles.bestForContainer}>
                <Text style={styles.bestForLabel}>Best for:</Text>
                <Text style={styles.bestForText}>{activeDetail.bestFor}</Text>
              </View>
            </Animated.View>
          )
        )}
      </View>

      <Pressable
        onPress={onContinue}
        style={({ pressed }) => [
          styles.continueButton,
          { opacity: pressed ? 0.9 : 1, marginTop: 24 },
        ]}
      >
        <Text style={styles.continueText}>Continue →</Text>
      </Pressable>
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
    minHeight: 520,
    justifyContent: "space-between",
  },
  cardDescription: {
    color: "#4B5563",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  tile: {
    width: "47.5%",
    backgroundColor: "#F9FAFB", // Light tile background
    borderRadius: 16,
    padding: 16,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  tileIconWrapper: {
    marginBottom: 12,
  },
  tileName: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
    textAlign: "left",
  },
  tileSub: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "left",
  },
  placeholderPanel: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 10,
  },
  placeholderIcon: {
    transform: [{ rotate: "15deg" }],
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 13,
    fontWeight: "600",
  },
  detailPanel: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  metricsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
    gap: 8,
  },
  metricItem: {
    flex: 1,
    alignItems: "center",
  },
  metricLabel: {
    color: COLORS.textSecondary,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 4,
  },
  metricBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4.5,
    borderRadius: 6,
    width: "100%",
    alignItems: "center",
  },
  metricBadgeText: {
    fontSize: 11,
    fontWeight: "800",
  },
  detailDesc: {
    color: COLORS.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    marginBottom: 12,
  },
  bestForContainer: {
    backgroundColor: "#EEF2FF",
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  bestForLabel: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 2,
  },
  bestForText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
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
});
