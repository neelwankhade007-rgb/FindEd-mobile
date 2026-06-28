import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Line, Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

interface ChartVisualCardProps {
  title?: string;
  subtitle?: string;
  onContinue: () => void;
}

export default function ChartVisualCard({
  title = "Stock Market Trends",
  subtitle = "Historical performance of the Index",
  onContinue,
}: ChartVisualCardProps) {
  const screenWidth = Dimensions.get("window").width;
  // Available width is screen - cardPadding(40) - cardInnerPadding(40)
  const chartWidth = Math.max(260, screenWidth - 80);
  const chartHeight = 120;
  const paddingLeft = 16;
  const paddingRight = 16;
  const paddingTop = 10;
  const paddingBottom = 16;

  // Mock points for Stock Market Trends chart
  // Line 1: Solid navy wavy curve
  const wavyPoints = [20, 30, 15, 60, 40, 85];
  // Line 2: Light green straight line
  const straightPoints = [15, 30, 45, 60, 75, 90];

  const getSvgX = (index: number, total: number) => {
    const usableWidth = chartWidth - paddingLeft - paddingRight;
    return paddingLeft + (index / (total - 1)) * usableWidth;
  };

  const getSvgY = (value: number) => {
    const usableHeight = chartHeight - paddingTop - paddingBottom;
    const ratio = value / 100;
    return chartHeight - paddingBottom - ratio * usableHeight;
  };

  const drawPath = (points: number[]) => {
    if (points.length === 0) return "";
    let path = `M ${getSvgX(0, points.length)},${getSvgY(points[0])}`;
    for (let i = 0; i < points.length - 1; i++) {
      const x0 = getSvgX(i, points.length);
      const y0 = getSvgY(points[i]);
      const x1 = getSvgX(i + 1, points.length);
      const y1 = getSvgY(points[i + 1]);
      
      // Calculate control points for cubic Bezier curve to make it smooth and curved
      const cpX1 = x0 + (x1 - x0) / 3;
      const cpY1 = y0;
      const cpX2 = x0 + 2 * (x1 - x0) / 3;
      const cpY2 = y1;
      
      path += ` C ${cpX1},${cpY1} ${cpX2},${cpY2} ${x1},${y1}`;
    }
    return path;
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        {/* Header Row */}
        <View style={styles.headerRow}>
          <View style={styles.titleInfo}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.cardSubtitle}>{subtitle}</Text>
          </View>
          <View style={styles.trendIconWrapper}>
            <Ionicons name="trending-up" size={16} color="#6366F1" />
          </View>
        </View>

        {/* Side-by-Side Return and Volatility Chips */}
        <View style={styles.chipsRow}>
          <View style={styles.statChip}>
            <Text style={styles.statChipLabel}>Total Return</Text>
            <Text style={styles.statChipValueGreen}>+124.5%</Text>
          </View>
          <View style={styles.statChip}>
            <Text style={styles.statChipLabel}>Annual Volatility</Text>
            <Text style={styles.statChipValue}>12.4%</Text>
          </View>
        </View>

        {/* Line Chart Panel */}
        <View style={styles.chartPanel}>
          <Text style={styles.chartTitleLabel}>PERFORMANCE INDEX (10Y)</Text>
          
          <View style={styles.chartWrapper}>
            <Svg width={chartWidth} height={chartHeight}>
              {/* Horizontal dotted gridlines */}
              {[0, 0.33, 0.66, 1].map((ratio, idx) => {
                const y = getSvgY(ratio * 100);
                return (
                  <Line
                    key={idx}
                    x1={paddingLeft}
                    y1={y}
                    x2={chartWidth - paddingRight}
                    y2={y}
                    stroke="rgba(0, 0, 0, 0.04)"
                    strokeWidth={1}
                    strokeDasharray="3,3"
                  />
                );
              })}

              {/* Straight line (Teal) */}
              <Path
                d={drawPath(straightPoints)}
                fill="none"
                stroke="#10B981"
                strokeWidth={2}
              />

              {/* Wavy line (Navy/Indigo) */}
              <Path
                d={drawPath(wavyPoints)}
                fill="none"
                stroke="#1E1B4B"
                strokeWidth={3}
              />

              {/* Endpoint dots */}
              <Circle
                cx={getSvgX(straightPoints.length - 1, straightPoints.length)}
                cy={getSvgY(straightPoints[straightPoints.length - 1])}
                r={4}
                fill="#10B981"
              />
              <Circle
                cx={getSvgX(wavyPoints.length - 1, wavyPoints.length)}
                cy={getSvgY(wavyPoints[wavyPoints.length - 1])}
                r={4}
                fill="#6366F1"
              />
            </Svg>
          </View>

          {/* X Axis years */}
          <View style={styles.xAxisRow}>
            <Text style={styles.xAxisText}>2014</Text>
            <Text style={styles.xAxisText}>2019</Text>
            <Text style={styles.xAxisText}>2024</Text>
          </View>
        </View>

        {/* Sector Growth Comparison bars */}
        <View style={styles.sectorSection}>
          <Text style={styles.sectorSectionHeader}>Sector Growth Comparison</Text>
          
          {/* Tech Bar */}
          <View style={styles.sectorBarRow}>
            <Text style={styles.sectorLabel}>Tech</Text>
            <View style={styles.barProgressBackground}>
              <View style={[styles.barProgressFill, { width: "85%", backgroundColor: "#8B5CF6" }]} />
            </View>
            <Text style={styles.sectorValue}>+85%</Text>
          </View>

          {/* FMCG Bar */}
          <View style={styles.sectorBarRow}>
            <Text style={styles.sectorLabel}>FMCG</Text>
            <View style={styles.barProgressBackground}>
              <View style={[styles.barProgressFill, { width: "45%", backgroundColor: "#10B981" }]} />
            </View>
            <Text style={styles.sectorValue}>+45%</Text>
          </View>

          {/* Pharma Bar */}
          <View style={styles.sectorBarRow}>
            <Text style={styles.sectorLabel}>Pharma</Text>
            <View style={styles.barProgressBackground}>
              <View style={[styles.barProgressFill, { width: "62%", backgroundColor: COLORS.accent }]} />
            </View>
            <Text style={styles.sectorValue}>+62%</Text>
          </View>
        </View>

        {/* Notice Info Box */}
        <View style={styles.noticeBox}>
          <Ionicons name="bulb" size={18} color="#6366F1" style={{ marginTop: 2 }} />
          <Text style={styles.noticeText}>
            Notice how the Tech sector shows exponential growth compared to others over the last decade. This is often driven by digital transformation.
          </Text>
        </View>
      </View>

      {/* Practice Box Callout */}
      <View style={styles.practiceContainer}>
        <Text style={styles.practiceTitle}>Ready to practice?</Text>
        <Text style={styles.practiceSubtitle}>
          Apply what you've learned to a real-world scenario.
        </Text>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.continueButton,
            { opacity: pressed ? 0.95 : 1, marginTop: 12 },
          ]}
        >
          <Text style={styles.continueText}>Continue Learning ➔</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.surface, // Solid white card surface
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 560,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  titleInfo: {
    gap: 2,
  },
  cardTitle: {
    color: "#1E1B4B",
    fontSize: 18,
    fontWeight: "800",
  },
  cardSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
  },
  trendIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#EEF2FF",
    alignItems: "center",
    justifyContent: "center",
  },
  chipsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  statChip: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  statChipLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 4,
  },
  statChipValue: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },
  statChipValueGreen: {
    color: "#10B981",
    fontSize: 15,
    fontWeight: "800",
  },
  chartPanel: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingVertical: 12,
    marginBottom: 16,
  },
  chartTitleLabel: {
    color: "#9CA3AF",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },
  xAxisRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 6,
  },
  xAxisText: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "700",
  },
  sectorSection: {
    gap: 10,
    marginBottom: 16,
  },
  sectorSectionHeader: {
    color: "#1E1B4B",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },
  sectorBarRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectorLabel: {
    width: 60,
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "700",
  },
  barProgressBackground: {
    flex: 1,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    overflow: "hidden",
  },
  barProgressFill: {
    height: "100%",
    borderRadius: 6,
  },
  sectorValue: {
    width: 44,
    textAlign: "right",
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
  },
  noticeBox: {
    flexDirection: "row",
    backgroundColor: "#EEF2FF", // Soft purple tint
    borderRadius: 14,
    padding: 12,
    gap: 10,
    alignItems: "flex-start",
    marginBottom: 8,
  },
  noticeText: {
    flex: 1,
    color: "#4F46E5",
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "600",
  },
  practiceContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    padding: 16,
    alignItems: "center",
    marginTop: 16,
  },
  practiceTitle: {
    color: "#1E1B4B",
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 4,
  },
  practiceSubtitle: {
    color: "#6B7280",
    fontSize: 12,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 8,
  },
  continueButton: {
    backgroundColor: COLORS.accent, // Yellow accent button color from COLORS
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 14,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 4,
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
