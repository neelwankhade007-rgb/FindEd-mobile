import type { NodeCoordinate } from "../types/journeyLayout";

/**
 * Builds a single continuous SVG path connecting all node centers (including trophy)
 * using cubic Bezier segments with identical curvature logic.
 */
export function buildJourneyPath(nodes: NodeCoordinate[]): string {
  if (nodes.length === 0) return "";

  let pathD = `M ${nodes[0].x} ${nodes[0].y}`;

  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];
    const dy = curr.y - prev.y;

    const cp1x = prev.x;
    const cp1y = prev.y + dy / 2;
    const cp2x = curr.x;
    const cp2y = curr.y - dy / 2;

    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  return pathD;
}

/**
 * Builds a single continuous SVG progress path from node 0 up to the current lesson node.
 */
export function buildJourneyProgressPath(nodes: NodeCoordinate[]): string {
  if (nodes.length === 0) return "";

  let pathD = `M ${nodes[0].x} ${nodes[0].y}`;

  for (let i = 1; i < nodes.length; i++) {
    const prev = nodes[i - 1];
    const curr = nodes[i];

    // If the next node is locked, progress path terminates at the previous node center
    if (curr.status === "locked") {
      break;
    }

    const dy = curr.y - prev.y;
    const cp1x = prev.x;
    const cp1y = prev.y + dy / 2;
    const cp2x = curr.x;
    const cp2y = curr.y - dy / 2;

    pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  return pathD;
}

