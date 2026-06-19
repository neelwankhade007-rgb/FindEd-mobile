import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "@/constants/colors";
import type { LessonStatus } from "../courseData";

interface JourneyConnectorProps {
  /** Status of the node BELOW this connector */
  nextStatus: LessonStatus;
  /** Index of the node above — used to calculate the curve direction */
  fromIndex: number;
}

/**
 * Returns the horizontal offset for a node at the given index.
 * Creates a repeating S-curve: left → center → right → center → …
 */
export function getNodeOffset(index: number): "flex-start" | "center" | "flex-end" {
  const cycle = index % 4;
  if (cycle === 0) return "flex-start";
  if (cycle === 1) return "center";
  if (cycle === 2) return "flex-end";
  return "center";
}

// Map alignment to numeric center coordinates of the node wrapper (width: 140)
function getCenter(align: "flex-start" | "center" | "flex-end"): number {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40; // 20px padding on each side
  if (align === "flex-start") return 70; // 140 / 2
  if (align === "flex-end") return containerWidth - 70;
  return containerWidth / 2;
}

export default function JourneyConnector({
  nextStatus,
  fromIndex,
}: JourneyConnectorProps) {
  const isCompleted = nextStatus === "completed" || nextStatus === "current";
  const lineColor = isCompleted ? COLORS.primary : COLORS.border;

  const fromAlign = getNodeOffset(fromIndex);
  const toAlign = getNodeOffset(fromIndex + 1);

  const fromCenter = getCenter(fromAlign);
  const toCenter = getCenter(toAlign);

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40; // 20px padding on each side

  return (
    <View style={styles.container}>
      <Svg width={containerWidth} height={64}>
        <Path
          d={`M ${fromCenter} 0 C ${fromCenter} 32, ${toCenter} 32, ${toCenter} 64`}
          fill="none"
          stroke={lineColor}
          strokeWidth={4.5}
          strokeDasharray={isCompleted ? undefined : "6, 6"}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    position: "relative",
  },
});
