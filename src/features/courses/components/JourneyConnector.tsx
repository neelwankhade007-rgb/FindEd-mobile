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
 * Creates a repeating pattern: -40 → 0 → 40 → 0
 */
export function getNodeOffset(index: number): number {
  const cycle = index % 4;
  if (cycle === 0) return -40;
  if (cycle === 1) return 0;
  if (cycle === 2) return 40;
  return 0; // cycle === 3
}

// Get the absolute X coordinate relative to container width
function getCenter(offset: number): number {
  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40; // 20px padding on each side
  return (containerWidth / 2) + offset;
}

export default function JourneyConnector({
  nextStatus,
  fromIndex,
}: JourneyConnectorProps) {
  const isCompleted = nextStatus === "completed" || nextStatus === "current";
  const lineColor = isCompleted ? COLORS.primary : COLORS.border;

  const fromOffset = getNodeOffset(fromIndex);
  const toOffset = getNodeOffset(fromIndex + 1);

  const fromCenter = getCenter(fromOffset);
  const toCenter = getCenter(toOffset);

  const screenWidth = Dimensions.get("window").width;
  const containerWidth = screenWidth - 40; // 20px padding on each side
  const CONNECTOR_HEIGHT = 40;

  return (
    <View style={styles.container}>
      <Svg width={containerWidth} height={CONNECTOR_HEIGHT}>
        <Path
          d={`M ${fromCenter} 0 C ${fromCenter} ${CONNECTOR_HEIGHT / 2}, ${toCenter} ${CONNECTOR_HEIGHT / 2}, ${toCenter} ${CONNECTOR_HEIGHT}`}
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
    height: 40,
    position: "relative",
  },
});
