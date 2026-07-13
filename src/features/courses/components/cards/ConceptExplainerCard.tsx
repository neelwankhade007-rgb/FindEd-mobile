import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface ExplainerPart {
  type: "text" | "jargon";
  content: string;
  def?: string;
  example?: string;
}

export interface ChartBarData {
  label: string;
  valLabel: string;
  value: number; // e.g. 1.0, 1.4, 3.1
  color: string;
}

interface ConceptExplainerCardProps {
  moduleLabel?: string;
  title?: string;
  paragraphs?: string[];
  chartBars?: ChartBarData[];
  quoteText?: string;
  footnote?: string;
  actionButtonText?: string;
  onContinue: () => void;
  onPrevious?: () => void;
}

export default function ConceptExplainerCard({
  moduleLabel = "MODULE 1 • CARD 3",
  title = "Your savings account is quietly lying to you.",
  paragraphs = [
    "Arjun's bank gives him about 3.5% interest on his savings account. That sounds decent — until you learn that inflation in India runs at roughly 5-6% per year.",
    "Inflation means prices rise over time. The ₹100 that buys you lunch today will only buy you part of that lunch in 10 years. If your money grows slower than prices rise, you're getting poorer even while your bank balance goes up. This isn't a scare tactic — it's just arithmetic.",
    "Look at what happens to ₹1,000,000 over 10 years depending on where it sits:"
  ],
  chartBars = [
    { label: "Under the\nMattress (0%)", valLabel: "₹1.0L", value: 1.0, color: "#EF4444" },
    { label: "Savings\nAccount (3.5%)", valLabel: "₹1.4L", value: 1.4, color: "#3B82F6" },
    { label: "Invested in\nEquity (12%)", valLabel: "₹3.1L", value: 3.1, color: "#10B981" }
  ],
  quoteText = "“Same ₹1 lakh. Same 10 years. Completely different outcomes — just based on where the money sat.”",
  footnote = "* 12% is the approximate long-term CAGR of the Nifty 50 over the past 20 years. Returns are illustrative and not guaranteed.",
  actionButtonText = "I see the problem — what's the solution?",
  onContinue,
  onPrevious,
}: ConceptExplainerCardProps) {

  // Canvas height configuration
  const canvasHeight = 140;
  const gridTop = 15;
  const gridBottom = 125;
  const gridHeight = gridBottom - gridTop; // 110px usable grid area
  const minValue = 0.5;
  const maxValue = 3.5;
  const valueRange = maxValue - minValue;

  const getBarHeight = (val: number) => {
    const heightRatio = (val - minValue) / valueRange;
    return Math.max(0, heightRatio * gridHeight);
  };

  // Helper to simplify wrapping of labels
  const formatLabel = (lbl: string) => {
    if (lbl.includes("Mattress")) return ["Cash", "0%"];
    if (lbl.includes("Savings")) return ["Savings", "3.5%"];
    if (lbl.includes("Equity")) return ["Equity", "12%"];
    // Fallback split by newline if present
    const parts = lbl.split("\n");
    return parts.length > 1 ? [parts[0], parts[1]] : [lbl, ""];
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.contentSection}>
        {/* Module Label */}
        <Text style={styles.moduleLabel}>{moduleLabel.toUpperCase()}</Text>

        {/* Title (Medium weight, largest card text) */}
        <Text style={styles.titleText}>{title}</Text>

        {/* Paragraphs */}
        {paragraphs.map((p, index) => {
          if (p.includes("3.5% interest") || p.includes("5-6% per year")) {
            return (
              <Text key={index} style={styles.paragraphText}>
                Arjun's bank gives him about{" "}
                <Text style={styles.boldText}>3.5% interest</Text> on his savings
                account. That sounds decent — until you learn that inflation in India
                runs at roughly <Text style={styles.boldText}>5-6% per year</Text>.
              </Text>
            );
          }
          return (
            <Text key={index} style={styles.paragraphText}>
              {p}
            </Text>
          );
        })}

        {/* Infographic Chart Area */}
        {chartBars && chartBars.length > 0 && (
          <View style={styles.chartOuterContainer}>
            <View style={[styles.chartCanvas, { height: canvasHeight }]}>
              {/* Gridlines & Y-Axis Labels */}
              <View style={styles.gridlinesLayer}>
                {["3.5L", "2.5L", "1.5L", "0.5L"].map((yLabel, idx) => {
                  // Distribute grid lines evenly inside gridHeight (110px) starting from top (15px)
                  const lineTop = gridTop + (idx * gridHeight) / 3;
                  return (
                    <View key={idx} style={[styles.gridRow, { top: lineTop }]}>
                      <Text style={styles.yAxisLabel}>₹{yLabel}</Text>
                      <View style={styles.gridLine} />
                    </View>
                  );
                })}
              </View>

              {/* Bars Layer */}
              <View style={styles.barsLayer}>
                {chartBars.map((bar, idx) => {
                  const barH = getBarHeight(bar.value);
                  return (
                    <View key={idx} style={styles.barWrapper}>
                      {/* Floating Bold Value Tag */}
                      <Text style={[styles.barValText, { color: bar.color }]}>
                        {bar.valLabel}
                      </Text>
                      {/* Substantial Rounded Bar */}
                      <View
                        style={[
                          styles.barFill,
                          {
                            height: barH,
                            backgroundColor: bar.color,
                          },
                        ]}
                      />
                    </View>
                  );
                })}
              </View>
            </View>

            {/* Category Labels Row (Aligned under the bars) */}
            <View style={styles.categoriesRow}>
              {chartBars.map((bar, idx) => {
                const [line1, line2] = formatLabel(bar.label);
                return (
                  <View key={idx} style={styles.categoryLabelCol}>
                    <Text style={styles.categoryTextLine1}>{line1}</Text>
                    {line2 ? <Text style={styles.categoryTextLine2}>{line2}</Text> : null}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Highlight/Quote Text */}
        {quoteText && (
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>{quoteText}</Text>
          </View>
        )}

        {/* Footnote text */}
        {footnote && <Text style={styles.footnoteText}>{footnote}</Text>}

      </View>

      {/* Footer navigation */}
      <View style={styles.footerRow}>
        <Pressable
          onPress={onPrevious}
          style={({ pressed }) => [
            styles.navButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Ionicons
            name="chevron-back"
            size={16}
            color={COLORS.onSurfaceVariant}
            style={{ marginRight: 4 }}
          />
          <Text style={styles.navButtonText}>Previous</Text>
        </Pressable>

        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.continueButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.continueButtonText}>I see what's the problem</Text>
          <Ionicons
            name="chevron-forward"
            size={16}
            color={COLORS.onPrimary}
            style={{ marginLeft: 4 }}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "transparent",
    gap: 8,
    paddingHorizontal: 4,
    width: "100%",
  },
  contentSection: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.03,
    shadowRadius: 10,
    elevation: 2,
    gap: 10,
    width: "100%",
  },
  moduleLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 11,
    color: COLORS.primaryContainer,
    letterSpacing: 0.5,
  },
  titleText: {
    fontFamily: "PlusJakartaSans-Medium", // Medium weight (largest text in the card)
    fontSize: 22,
    color: COLORS.onSurface,
    lineHeight: 28,
  },
  paragraphText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 14,
    lineHeight: 19,
    color: COLORS.onSurfaceVariant,
  },
  boldText: {
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
  },
  chartOuterContainer: {
    marginVertical: 4,
    width: "100%",
  },
  chartCanvas: {
    width: "100%",
    position: "relative",
  },
  gridlinesLayer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  gridRow: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    height: 14,
    transform: [{ translateY: -7 }], // Centers label vertically on lines
  },
  yAxisLabel: {
    width: 35,
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 9,
    color: COLORS.onSurfaceVariant,
    textAlign: "right",
    paddingRight: 6,
    opacity: 0.8,
  },
  gridLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0,0,0,0.06)",
  },
  barsLayer: {
    position: "absolute",
    left: 35,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    paddingBottom: 15, // Anchored on the 0.5L grid line (at gridBottom = 125px)
  },
  barWrapper: {
    alignItems: "center",
    width: 75,
  },
  barValText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 12,
    marginBottom: 4,
  },
  barFill: {
    width: 36, // Substantial bar width (increased by ~30%)
    borderRadius: 6,
  },
  categoriesRow: {
    flexDirection: "row",
    marginLeft: 35,
    justifyContent: "space-around",
    marginTop: 6,
  },
  categoryLabelCol: {
    width: 75,
    alignItems: "center",
  },
  categoryTextLine1: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 10,
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
  },
  categoryTextLine2: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 9,
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
    opacity: 0.8,
  },
  quoteContainer: {
    marginTop: 6,
    alignItems: "center",
    paddingHorizontal: 12,
  },
  quoteText: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 13.5, // Slightly smaller, insight-style
    color: COLORS.onSurface,
    lineHeight: 18,
    textAlign: "center",
    fontStyle: "italic",
  },
  footnoteText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 10.5, // Smaller font, lower contrast
    color: COLORS.onSurfaceVariant,
    opacity: 0.7,
    lineHeight: 14,
    textAlign: "center",
    marginTop: -2,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 12,
    borderRadius: 12,
    marginTop: 4,
    width: "100%",
  },
  actionButtonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: COLORS.onPrimary,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 2,
    paddingBottom: 6,
  },
  navButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navButtonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  continueButtonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: COLORS.onPrimary,
  },
});
