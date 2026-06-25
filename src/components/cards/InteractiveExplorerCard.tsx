import React, { useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

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
  const [activeTileId, setActiveTileId] = useState<string>(tiles[0]?.id || "");
  const activeDetail = detailsData[activeTileId];

  // Slide-up animation for detail panel
  const panelTranslateY = useSharedValue(20);
  const panelOpacity = useSharedValue(0);

  useEffect(() => {
    panelTranslateY.value = 20;
    panelOpacity.value = 0;

    panelTranslateY.value = withSpring(0, { damping: 15 });
    panelOpacity.value = withSpring(1);
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

  return (
    <View style={styles.cardContainer}>
      <View>
        {/* Tile Grid */}
        <View style={styles.tileGrid}>
          {tiles.map((tile) => {
            const isActive = tile.id === activeTileId;
            return (
              <Pressable
                key={tile.id}
                onPress={() => setActiveTileId(tile.id)}
                style={[
                  styles.tile,
                  isActive ? styles.activeTile : null,
                ]}
              >
                <Text style={styles.tileIcon}>{tile.icon}</Text>
                <Text style={styles.tileName} numberOfLines={1}>{tile.name}</Text>
                <Text style={styles.tileSub} numberOfLines={1}>{tile.subtitle}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Dynamic Detail Panel */}
        {activeDetail && (
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
    padding: 18,
    borderWidth: 1,
    borderColor: "#374151",
    minHeight: 520,
    justifyContent: "space-between",
  },
  tileGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  tile: {
    width: "48.5%",
    backgroundColor: "#111827",
    borderRadius: 14,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
  },
  activeTile: {
    borderColor: "#4F46E5", // Purple active border
    backgroundColor: "rgba(79, 70, 229, 0.08)",
  },
  tileIcon: {
    fontSize: 22,
    marginBottom: 4,
  },
  tileName: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "750",
    textAlign: "center",
  },
  tileSub: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
    textAlign: "center",
  },
  detailPanel: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#374151",
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
    color: "#9CA3AF",
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
    color: "#D1D5DB",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "400",
    marginBottom: 12,
  },
  bestForContainer: {
    backgroundColor: "rgba(79, 70, 229, 0.05)",
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#4F46E5",
  },
  bestForLabel: {
    color: "#4F46E5",
    fontSize: 10,
    fontWeight: "800",
    marginBottom: 2,
  },
  bestForText: {
    color: "#D1D5DB",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
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
