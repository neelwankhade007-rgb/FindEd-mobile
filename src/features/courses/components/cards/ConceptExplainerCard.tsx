import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
            return <Text key={index} style={styles.normalText}>{part.content}</Text>;
          })}
        </Text>

        {/* Highlight Quote Block */}
        <View style={styles.quoteBlock}>
          <View style={styles.quoteBar} />
          <Text style={styles.quoteText}>{highlightQuote}</Text>
        </View>
      </View>

      {/* Footer & Continue button */}
      <View style={styles.footerSection}>
        {footnote ? <Text style={styles.footnoteText}>{footnote}</Text> : null}

        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.continueButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.continueText}>Continue →</Text>
        </Pressable>
      </View>

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
                  <Ionicons name="close" size={20} color="#9CA3AF" />
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
  cardContainer: {
    backgroundColor: "#1F2937", // Card Dark Surface
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#374151",
    minHeight: 460,
    justifyContent: "space-between",
  },
  moduleLabel: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.5,
    marginBottom: 8,
  },
  titleText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
    lineHeight: 26,
    marginBottom: 16,
  },
  bodyTextContainer: {
    lineHeight: 24,
    marginBottom: 24,
  },
  normalText: {
    color: "#D1D5DB",
    fontSize: 14.5,
    fontWeight: "400",
  },
  jargonText: {
    color: "#10B981", // Emerald accent green
    fontSize: 14.5,
    fontWeight: "750",
    textDecorationLine: "underline",
    textDecorationStyle: "dotted",
  },
  quoteBlock: {
    flexDirection: "row",
    backgroundColor: "rgba(16, 185, 129, 0.06)", // Soft emerald tint
    borderRadius: 12,
    padding: 14,
    marginVertical: 4,
    alignItems: "center",
  },
  quoteBar: {
    width: 3.5,
    backgroundColor: "#10B981",
    borderRadius: 2,
    alignSelf: "stretch",
    marginRight: 12,
  },
  quoteText: {
    flex: 1,
    color: "#10B981",
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18,
  },
  footerSection: {
    marginTop: 20,
    gap: 14,
  },
  footnoteText: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "550",
    lineHeight: 16,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  tooltipCard: {
    width: "100%",
    backgroundColor: "#1F2937",
    borderWidth: 1,
    borderColor: "#374151",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
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
    borderBottomColor: "#374151",
  },
  tooltipTitle: {
    color: "#10B981",
    fontSize: 16,
    fontWeight: "800",
  },
  tooltipDef: {
    color: "#F3F4F6",
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400",
  },
  tooltipExampleContainer: {
    marginTop: 12,
    backgroundColor: "#111827",
    padding: 10,
    borderRadius: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#4F46E5",
  },
  tooltipExampleLabel: {
    color: "#4F46E5",
    fontSize: 11,
    fontWeight: "800",
    marginBottom: 2,
  },
  tooltipExampleText: {
    color: "#D1D5DB",
    fontSize: 12.5,
    lineHeight: 18,
    fontWeight: "500",
  },
});
