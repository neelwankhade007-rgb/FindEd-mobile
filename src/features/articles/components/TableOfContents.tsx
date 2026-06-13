import React from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
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
  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: COLORS.surface,
        },
      ]}
    >
      <Text
        style={[
          styles.headerText,
          {
            color: COLORS.text,
          },
        ]}
      >
        Table of Contents
      </Text>

      <View style={styles.listContainer}>
        {sections.map((section) => {
          const isActive =
            section.id === activeSectionId;

          return (
            <Pressable
              key={section.id}
              onPress={() =>
                onSectionPress(section.id)
              }
              style={[
                styles.item,
                isActive && {
                  backgroundColor:
                    `${COLORS.primary}10`,
                },
              ]}
            >
              <Text
                style={[
                  styles.itemText,
                  {
                    color: isActive
                      ? COLORS.primary
                      : COLORS.textSecondary,
                  },
                  isActive &&
                  styles.activeItemText,
                ]}
              >
                {section.title}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 18,
    marginVertical: 20,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 10,

    elevation: 4,
  },

  headerText: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  listContainer: {
    gap: 4,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 12,
  },

  itemText: {
    fontSize: 15,
  },

  activeItemText: {
    fontWeight: "700",
  },
});