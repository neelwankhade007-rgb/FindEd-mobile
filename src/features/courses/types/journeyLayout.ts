import type { Lesson } from "../courseData";

export interface NodeCoordinate {
  id: string;
  x: number;
  y: number;
  index: number;
  lesson?: Lesson;
  type: "lesson" | "trophy";
  isCompleted: boolean;
  status: "completed" | "current" | "locked";
}

export interface LabelAnchor {
  id: string;
  x: number;
  y: number;
  side: "left" | "right";
}

export interface CardAnchor {
  id: string;
  x: number;
  y: number;
  side: "left" | "right" | "center";
  nodeX: number;
  nodeY: number;
}

export interface JourneyLayout {
  totalHeight: number;
  nodes: NodeCoordinate[];
  trophy: NodeCoordinate;
  labelAnchors: Record<string, LabelAnchor>;
  cardAnchors: Record<string, CardAnchor>;
  svgPath: string;
  svgProgressPath: string;
}
