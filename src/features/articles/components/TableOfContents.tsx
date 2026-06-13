import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, LayoutAnimation } from "react-native";
import { ChevronDown, ChevronUp } from "lucide-react-native";
import { COLORS } from "@/constants/colors";

export interface TOCSection {
  id: string;
  title: string;
}

export interface TableOfContentsProps {
  sections: TOCSection[];
  activeSectionId: string | null;
  onSectionPress: (id: string) => void;
}

export default function TableOfContents({
  sections,
  activeSectionId,
  onSectionPress,
}: TableOfContentsProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={[styles.card, { borderColor: COLORS.border, backgroundColor: COLORS.surface }]}>
      {/* Header */}
      <Pressable onPress={toggleExpand} style={styles.header}>
        <Text style={[styles.headerText, { color: COLORS.text }]}>Table of Contents</Text>
        {isExpanded ? (
          <ChevronUp size={20} color={COLORS.textSecondary} />
        ) : (
          <ChevronDown size={20} color={COLORS.textSecondary} />
        )}
      </Pressable>

      {/* Sections List */}
      {isExpanded && (
        <View style={[styles.listContainer, { borderTopColor: COLORS.border }]}>
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;
            return (
              <Pressable
                key={section.id}
                onPress={() => onSectionPress(section.id)}
                style={({ pressed }) => [
                  styles.item,
                  isActive && { backgroundColor: `${COLORS.primary}10` }, // 10% opacity primary
                  pressed && { opacity: 0.7 },
                ]}
              >
                {/* Active Indicator Bar */}
                {isActive && (
                  <View style={[styles.activeIndicator, { backgroundColor: COLORS.primary }]} />
                )}
                
                <Text
                  style={[
                    styles.itemText,
                    { color: isActive ? COLORS.primary : COLORS.textSecondary },
                    isActive && styles.activeItemText,
                  ]}
                >
                  {section.title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: 12,
    marginVertical: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  headerText: {
    fontSize: 16,
    fontWeight: "600",
  },
  listContainer: {
    borderTopWidth: 1,
    paddingVertical: 8,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 16,
    position: "relative",
  },
  activeIndicator: {
    position: "absolute",
    left: 0,
    top: 10,
    bottom: 10,
    width: 4,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  itemText: {
    fontSize: 14,
    fontWeight: "400",
    paddingLeft: 6,
  },
  activeItemText: {
    fontWeight: "600",
  },
});
