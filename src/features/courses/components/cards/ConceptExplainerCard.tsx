import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface ExplainerPart {
  type: "text" | "jargon";
  content: string;
  def?: string;
  example?: string;
}

interface ConceptExplainerCardProps {
  moduleLabel: string;
  title: string;
  bodyParts: ExplainerPart[];
  highlightQuote: string;
  footnote?: string;
  onContinue: () => void;
}

export default function ConceptExplainerCard({
  moduleLabel,
  title,
  bodyParts,
  highlightQuote,
  footnote,
  onContinue,
}: ConceptExplainerCardProps) {
  const [activeJargon, setActiveJargon] = useState<{
    term: string;
    def: string;
    example?: string;
  } | null>(null);

  return (
    <View style={styles.outerContainer}>
      {/* Main content card */}
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.moduleLabel}>{moduleLabel.toUpperCase()}</Text>
          <Text style={styles.titleText}>{title}</Text>

          {/* Paragraph Text with inline Jargon */}
          <Text style={styles.bodyTextContainer}>
            {bodyParts.map((part, index) => {
              if (part.type === "jargon") {
                return (
                  <Text
                    key={index}
                    style={styles.jargonText}
                    onPress={() =>
                      setActiveJargon({
                        term: part.content,
                        def: part.def || "",
                        example: part.example,
                      })
                    }
                  >
                    {part.content}
                  </Text>
                );
              }
              return (
                <Text key={index} style={styles.normalText}>
                  {part.content}
                </Text>
              );
            })}
          </Text>

          {/* Highlight Quote Block (Sparkles box) */}
          <View style={styles.quoteBlock}>
            <Ionicons name="sparkles-outline" size={20} color="#6366F1" style={styles.quoteIcon} />
            <Text style={styles.quoteText}>{highlightQuote}</Text>
          </View>
        </View>

        {/* Continue button */}
        <View style={styles.footerSection}>
          <Pressable
            onPress={onContinue}
            style={({ pressed }) => [
              styles.continueButton,
              { opacity: pressed ? 0.95 : 1 },
            ]}
          >
            <Text style={styles.continueText}>Continue ➔</Text>
          </Pressable>
        </View>
      </View>

      {/* Pro Tip Box underneath the card */}
      {footnote ? (
        <View style={styles.proTipContainer}>
          <View style={styles.proTipIconWrapper}>
            <Ionicons name="bulb-outline" size={16} color="#FFFFFF" />
          </View>
          <View style={styles.proTipTextContent}>
            <Text style={styles.proTipLabel}>PRO TIP</Text>
            <Text style={styles.proTipText}>{footnote}</Text>
          </View>
        </View>
      ) : null}

      {/* Inline Tooltip Modal */}
      {activeJargon && (
        <Modal
          transparent={true}
          visible={!!activeJargon}
          animationType="fade"
          onRequestClose={() => setActiveJargon(null)}
        >
          <Pressable
            style={styles.modalOverlay}
            onPress={() => setActiveJargon(null)}
          >
            <View style={styles.tooltipCard}>
              <View style={styles.tooltipHeader}>
                <Text style={styles.tooltipTitle}>{activeJargon.term}</Text>
                <Pressable onPress={() => setActiveJargon(null)} hitSlop={12}>
                  <Ionicons name="close" size={20} color={COLORS.inactive} />
                </Pressable>
              </View>

              <Text style={styles.tooltipDef}>{activeJargon.def}</Text>

              {activeJargon.example && (
                <View style={styles.tooltipExampleContainer}>
                  <Text style={styles.tooltipExampleLabel}>Example:</Text>
                  <Text style={styles.tooltipExampleText}>
                    {activeJargon.example}
                  </Text>
                </View>
              )}
            </View>
          </Pressable>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    gap: 16,
    width: "100%",
  },
  cardContainer: {
    backgroundColor: COLORS.surface, // Solid white card surface
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 380,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  moduleLabel: {
    color: "#6B7280",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
    marginBottom: 8,
  },
  titleText: {
    color: "#111827", // Navy/slate title text
    fontSize: 22,
    fontWeight: "800",
    lineHeight: 28,
    marginBottom: 16,
  },
  bodyTextContainer: {
    lineHeight: 22,
    marginBottom: 20,
  },
  normalText: {
    color: "#374151", // High contrast dark charcoal
    fontSize: 14,
    fontWeight: "500",
  },
  jargonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  quoteBlock: {
    flexDirection: "row",
    backgroundColor: "#F5F3FF", // Light lavender/purple tint
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "#EDE9FE",
  },
  quoteIcon: {
    marginTop: 1,
  },
  quoteText: {
    flex: 1,
    color: "#1E1B4B",
    fontSize: 13.5,
    fontWeight: "700",
    lineHeight: 18,
  },
  footerSection: {
    marginTop: 16,
  },
  continueButton: {
    backgroundColor: COLORS.accent, // Yellow accent color from COLORS
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  continueText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
  proTipContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F3FF", // Soft light purple container
    borderRadius: 18,
    padding: 16,
    gap: 12,
    alignItems: "center",
  },
  proTipIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#2E1065", // Dark purple icon circle
    alignItems: "center",
    justifyContent: "center",
  },
  proTipTextContent: {
    flex: 1,
    gap: 2,
  },
  proTipLabel: {
    color: "#4F46E5", // Purple label
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1,
  },
  proTipText: {
    color: "#4B5563",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  tooltipCard: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  tooltipHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  tooltipTitle: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: "800",
  },
  tooltipDef: {
    color: COLORS.text,
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  tooltipExampleContainer: {
    marginTop: 12,
    backgroundColor: COLORS.background,
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.primary,
  },
  tooltipExampleLabel: {
    color: COLORS.primary,
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 2,
  },
  tooltipExampleText: {
    color: COLORS.textSecondary,
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "500",
  },
});
