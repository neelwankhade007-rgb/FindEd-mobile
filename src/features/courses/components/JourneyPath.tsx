import React from "react";
import Svg, { Path } from "react-native-svg";
import { COLORS } from "@/constants/colors";
import { LAYOUT_CONSTANTS } from "../layout/layoutConfig";

interface JourneyPathProps {
  svgPath: string;
  svgProgressPath: string;
  screenWidth: number;
  totalHeight: number;
}

const JourneyPath = React.memo(function JourneyPath({
  svgPath,
  svgProgressPath,
  screenWidth,
  totalHeight,
}: JourneyPathProps) {
  return (
    <Svg
      width={screenWidth}
      height={totalHeight}
      style={{ position: "absolute", top: 0, left: 0 }}
      pointerEvents="none"
    >
      {/* 1. Background Path (Locked/Dashed) */}
      <Path
        d={svgPath}
        fill="none"
        stroke={COLORS.border}
        strokeWidth={LAYOUT_CONSTANTS.STROKE_WIDTH}
        strokeDasharray="6, 6"
        strokeLinecap="round"
      />

      {/* 2. Progress Path (Completed/Active/Solid) */}
      {svgProgressPath ? (
        <Path
          d={svgProgressPath}
          fill="none"
          stroke={COLORS.primary}
          strokeWidth={LAYOUT_CONSTANTS.STROKE_WIDTH}
          strokeLinecap="round"
        />
      ) : null}
    </Svg>
  );
});

export default JourneyPath;
