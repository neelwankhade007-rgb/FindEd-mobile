import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

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
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      <Pressable
        onPress={toggleExpand}
        style={styles.headerRow}
      >
        <Text
          style={[
            styles.headerText,
            {
              color: COLORS.text,
            },
          ]}
        >
          TABLE OF CONTENTS
        </Text>
        <Ionicons
          name={isExpanded ? "chevron-up" : "chevron-down"}
          size={16}
          color={COLORS.textSecondary}
        />
      </Pressable>

      {isExpanded && (
        <View style={styles.listContainer}>
          {sections.map((section) => {
            const isActive = section.id === activeSectionId;

            return (
              <Pressable
                key={section.id}
                onPress={() => onSectionPress(section.id)}
                style={styles.item}
              >
                <View style={styles.itemContent}>
                  {isActive ? (
                    <Ionicons
                      name="caret-forward"
                      size={12}
                      color={COLORS.primary}
                      style={styles.activeIcon}
                    />
                  ) : (
                    <View style={styles.placeholderIcon} />
                  )}
                  <Text
                    style={[
                      styles.itemText,
                      {
                        color: isActive
                          ? COLORS.primary
                          : COLORS.textSecondary,
                      },
                      isActive && styles.activeItemText,
                    ]}
                  >
                    {section.title}
                  </Text>
                </View>
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
    marginVertical: 16,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 8,
  },

  headerText: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
    marginRight: 6,
  },

  listContainer: {
    paddingVertical: 4,
    gap: 4,
  },

  item: {
    paddingVertical: 6,
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  activeIcon: {
    marginRight: 6,
    width: 12,
  },

  placeholderIcon: {
    marginRight: 6,
    width: 12,
  },

  itemText: {
    fontSize: 14,
    flex: 1,
  },

  activeItemText: {
    fontWeight: "700",
  },
});