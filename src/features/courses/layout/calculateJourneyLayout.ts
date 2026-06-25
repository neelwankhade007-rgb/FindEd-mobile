import type { Lesson } from "../courseData";
import { LAYOUT_CONSTANTS } from "./layoutConfig";
import { buildJourneyPath, buildJourneyProgressPath } from "./buildJourneyPath";
import type { JourneyLayout, NodeCoordinate, CardAnchor, LabelAnchor } from "../types/journeyLayout";

/**
 * Calculates absolute coordinates and layout info for the entire learning journey screen.
 * This is a pure mathematical calculation with no UI dependencies.
 *
 * Node placement uses a subtle S-curve: nodes swing ±PATH_AMPLITUDE from center,
 * keeping the path within the central 60-70% of the screen width.
 * Pattern: Center → Left → Right → Left → Right → ...
 */
export function calculateJourneyLayout(
  lessons: Lesson[],
  screenWidth: number
): JourneyLayout {
  const {
    NODE_SPACING,
    NODE_RADIUS,
    CARD_MAX_WIDTH,
    CARD_MIN_HEIGHT,
    CARD_SAFETY_MARGIN,
    CARD_GAP_X,
    Y_OFFSET_START,
    PATH_AMPLITUDE,
    LABEL_GAP_X,
  } = LAYOUT_CONSTANTS;

  const CENTER_X = screenWidth / 2;
  const SWING = screenWidth * PATH_AMPLITUDE; // e.g. 0.12 * 390 ≈ 47px offset from center
  const LEFT_X = CENTER_X - SWING;
  const RIGHT_X = CENTER_X + SWING;

  const nodeCoords: NodeCoordinate[] = [];
  const labelAnchors: Record<string, LabelAnchor> = {};
  const recordCardAnchors: Record<string, CardAnchor> = {};

  // 1. Calculate lesson nodes
  lessons.forEach((lesson, index) => {
    // Start on the right side and alternate (Right -> Left -> Right -> Left...)
    // This ensures every segment between consecutive nodes has identical length and angle.
    const x = index % 2 === 0 ? RIGHT_X : LEFT_X;
    const y = Y_OFFSET_START + index * NODE_SPACING;
    const isCompleted = lesson.status === "completed";

    nodeCoords.push({
      id: lesson.id,
      x,
      y,
      index,
      lesson,
      type: "lesson",
      isCompleted,
      status: lesson.status,
    });

    // 2. Calculate Label Anchor — persistent inline title + badge
    const labelSide: "left" | "right" = x <= CENTER_X ? "right" : "left";
    const labelX = labelSide === "right"
      ? x + NODE_RADIUS + LABEL_GAP_X
      : x - NODE_RADIUS - LABEL_GAP_X;

    labelAnchors[lesson.id] = {
      id: lesson.id,
      x: labelX,
      y,
      side: labelSide,
    };

    // 3. Calculate Card Anchor — detail card for selected/current lesson
    const cardY = y + NODE_RADIUS + 24;

    let finalX = x - CARD_MAX_WIDTH / 2;
    if (finalX < CARD_SAFETY_MARGIN) {
      finalX = CARD_SAFETY_MARGIN;
    } else if (finalX + CARD_MAX_WIDTH > screenWidth - CARD_SAFETY_MARGIN) {
      finalX = screenWidth - CARD_SAFETY_MARGIN - CARD_MAX_WIDTH;
    }

    recordCardAnchors[lesson.id] = {
      id: lesson.id,
      x: finalX,
      y: cardY,
      side: "center",
      nodeX: x,
      nodeY: y,
    };
  });

  // 4. Calculate Trophy Node
  const trophyY = Y_OFFSET_START + lessons.length * NODE_SPACING;
  const allCompleted = lessons.every((l) => l.status === "completed");

  const trophyNode: NodeCoordinate = {
    id: "trophy",
    x: CENTER_X,
    y: trophyY,
    index: lessons.length,
    type: "trophy",
    isCompleted: allCompleted,
    status: allCompleted ? "completed" : "locked",
  };

  // Combine all nodes (including trophy) to generate path
  const allNodesForPath = [...nodeCoords, trophyNode];
  const svgPath = buildJourneyPath(allNodesForPath);
  const svgProgressPath = buildJourneyProgressPath(allNodesForPath);

  // Total scrollable height includes padding below the trophy
  const totalHeight = trophyY + NODE_SPACING + 160; // Extra padding for possible open card at the end

  return {
    totalHeight,
    nodes: nodeCoords,
    trophy: trophyNode,
    labelAnchors,
    cardAnchors: recordCardAnchors,
    svgPath,
    svgProgressPath,
  };
}
