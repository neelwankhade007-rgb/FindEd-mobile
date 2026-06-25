export const LAYOUT_CONSTANTS = {
  NODE_SPACING: 96,        // Vertical distance (dy) between successive node centers (dp) — slightly increased for card room
  NODE_RADIUS: 32,         // Radius of a milestone circle (dp)
  CARD_MAX_WIDTH: 260,     // Maximum width of the lesson detail card overlay (dp)
  CARD_MIN_HEIGHT: 180,    // Minimum safety height assumed for card overlay boundary checks (dp)
  HORIZONTAL_PADDING: 48,  // Minimum margin from screen edge to node edge (dp)
  CARD_SAFETY_MARGIN: 16,  // Minimum margin between card and screen boundaries (dp)
  CARD_GAP_X: 12,          // Horizontal space between node edge and card edge (dp)
  Y_OFFSET_START: 48,      // Vertical starting position for node 0 center (dp)
  STROKE_WIDTH: 4,         // Width of the SVG path stroke (dp)
  PATH_AMPLITUDE: 0.12,    // Horizontal swing as a fraction of screen width (0.12 = ±12% from center)
  LABEL_GAP_X: 14,         // Horizontal space between node edge and inline label (dp)
};
