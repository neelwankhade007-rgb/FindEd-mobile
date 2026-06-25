import React from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Line, Circle, Text as SvgText } from "react-native-svg";

export interface ChartDataset {
  label: string;
  color: string;
  data: number[]; // numerical data points
  isDashed?: boolean;
}

interface ChartVisualCardProps {
  title: string;
  subtitle?: string;
  years: string[]; // X-axis values, e.g. ["'99", "'04", "'09", "'14", "'19", "'24"]
  datasets: ChartDataset[];
  statChips: Array<{
    value: string;
    label: string;
    color: string;
    isHighlighted?: boolean;
  }>;
  onContinue: () => void;
}

export default function ChartVisualCard({
  title,
  subtitle = "Illustrative compound growth. Not actual index values.",
  years,
  datasets,
  statChips,
  onContinue,
}: ChartVisualCardProps) {
  // Chart dimensions inside card
  const chartHeight = 160;
  const paddingLeft = 32;
  const paddingRight = 16;
  const paddingTop = 12;
  const paddingBottom = 20;

  const screenWidth = Dimensions.get("window").width;
  // Available width is screen - cardPadding(40) - cardInnerPadding(36)
  const chartWidth = Math.max(260, screenWidth - 76);

  // Math to map values to coordinates
  const allValues = datasets.flatMap((d) => d.data);
  const minVal = Math.min(...allValues, 0);
  const maxVal = Math.max(...allValues, 1);
  const valRange = maxVal - minVal;

  const getSvgX = (index: number, total: number) => {
    const usableWidth = chartWidth - paddingLeft - paddingRight;
    return paddingLeft + (index / (total - 1)) * usableWidth;
  };

  const getSvgY = (value: number) => {
    const usableHeight = chartHeight - paddingTop - paddingBottom;
    const ratio = (value - minVal) / valRange;
    // SVG coordinate Y increases downwards, so we subtract from bottom
    return chartHeight - paddingBottom - ratio * usableHeight;
  };

  return (
    <View style={styles.cardContainer}>
      <View>
        <Text style={styles.cardTitle}>{title}</Text>

        {/* SVG Drawing Canvas */}
        <View style={styles.chartWrapper}>
          <Svg width={chartWidth} height={chartHeight}>
            {/* Gridlines (Horizontal) */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const val = minVal + ratio * valRange;
              const y = getSvgY(val);
              return (
                <React.Fragment key={idx}>
                  <Line
                    x1={paddingLeft}
                    y1={y}
                    x2={chartWidth - paddingRight}
                    y2={y}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth={1}
                  />
                  <SvgText
                    x={6}
                    y={y + 4}
                    fill="#6B7280"
                    fontSize="9"
                    fontWeight="700"
                  >
                    {val >= 100000
                      ? `₹${(val / 100000).toFixed(0)}L`
                      : `₹${(val / 1000).toFixed(0)}k`}
                  </SvgText>
                </React.Fragment>
              );
            })}

            {/* X Axis labels */}
            {years.map((year, idx) => {
              const x = getSvgX(idx, years.length);
              return (
                <SvgText
                  key={idx}
                  x={x}
                  y={chartHeight - 4}
                  fill="#6B7280"
                  fontSize="9"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {year}
                </SvgText>
              );
            })}

            {/* Datasets paths */}
            {datasets.map((dataset, dIdx) => {
              const points = dataset.data.map((val, pIdx) => {
                const x = getSvgX(pIdx, dataset.data.length);
                const y = getSvgY(val);
                return `${x},${y}`;
              });

              const pathD = `M ${points.join(" L ")}`;

              return (
                <React.Fragment key={dIdx}>
                  <Path
                    d={pathD}
                    fill="none"
                    stroke={dataset.color}
                    strokeWidth={2.5}
                    strokeDasharray={dataset.isDashed ? "4,4" : undefined}
                  />

                  {/* Draw points circles */}
                  {dataset.data.map((val, pIdx) => (
                    <Circle
                      key={pIdx}
                      cx={getSvgX(pIdx, dataset.data.length)}
                      cy={getSvgY(val)}
                      r={3.5}
                      fill={dataset.color}
                      stroke="#1F2937"
                      strokeWidth={1.5}
                    />
                  ))}
                </React.Fragment>
              );
            })}
          </Svg>
        </View>

        <Text style={styles.chartSubtitle}>{subtitle}</Text>

        {/* Dynamic Stat Chips below */}
        <View style={styles.statChipsRow}>
          {statChips.map((chip, idx) => (
            <View
              key={idx}
              style={[
                styles.statChip,
                chip.isHighlighted ? styles.statChipHighlighted : null,
              ]}
            >
              <Text
                style={[
                  styles.statChipValue,
                  chip.isHighlighted ? styles.textGreen : { color: chip.color },
                ]}
              >
                {chip.value}
              </Text>
              <Text style={styles.statChipLabel} numberOfLines={1}>{chip.label}</Text>
            </View>
          ))}
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
    minHeight: 480,
    justifyContent: "space-between",
  },
  cardTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 16,
  },
  chartWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    width: "100%",
  },
  chartSubtitle: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 20,
  },
  statChipsRow: {
    flexDirection: "row",
    gap: 8,
    width: "100%",
  },
  statChip: {
    flex: 1,
    backgroundColor: "#111827",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  statChipHighlighted: {
    borderColor: "#10B981", // Highlight border
    backgroundColor: "rgba(16, 185, 129, 0.04)",
  },
  statChipValue: {
    fontSize: 15,
    fontWeight: "900",
  },
  textGreen: {
    color: "#10B981",
  },
  statChipLabel: {
    color: "#9CA3AF",
    fontSize: 9,
    fontWeight: "750",
    marginTop: 2,
    textAlign: "center",
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
