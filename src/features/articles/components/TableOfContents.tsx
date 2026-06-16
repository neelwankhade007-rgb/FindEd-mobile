import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface TOCSection {
  id: string;
  title: string;
}

export interface TableOfContentsProps {
  sections: TOCSection[];
  activeSectionId: string | null;
  onSectionPress: (id: string) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function TableOfContents({
  sections,
  activeSectionId,
  onSectionPress,
  isExpanded,
  onToggleExpand,
}: TableOfContentsProps) {
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const expandAnim = useRef(new Animated.Value(0)).current;
  const [hasOpened, setHasOpened] = useState(false);

  // Monitor first open to avoid rendering dropdown initially
  useEffect(() => {
    if (isExpanded) {
      setHasOpened(true);
    }
  }, [isExpanded]);

  // Handle expand/collapse animation transitions
  useEffect(() => {
    // Chevron rotation
    Animated.timing(rotateAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // Dropdown slide & fade transition
    Animated.timing(expandAnim, {
      toValue: isExpanded ? 1 : 0,
      duration: 320, // Not too fast, not too slow
      useNativeDriver: true,
    }).start();
  }, [isExpanded]);

  const rotate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const translateY = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-12, 0], // Subtle slide-down
  });

  const opacity = expandAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const activeSection = sections.find((s) => s.id === activeSectionId);
  const displayTitle = activeSection
    ? `TOC: ${activeSection.title}`
    : "Table of Contents";

  return (
    <View style={styles.container}>
      {/* Pinned collapsed header bar */}
      <Pressable
        onPress={onToggleExpand}
        style={styles.headerRow}
        android_ripple={{ color: `${COLORS.primary}10` }}
      >
        <View style={styles.titleContainer}>
          <Ionicons
            name="list-outline"
            size={16}
            color={COLORS.primary}
            style={styles.listIcon}
          />
          <Text
            style={[
              styles.headerText,
              {
                color: COLORS.text,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {displayTitle}
          </Text>
        </View>
        <Animated.View style={{ transform: [{ rotate }] }}>
          <Ionicons
            name="chevron-down"
            size={18}
            color={COLORS.textSecondary}
          />
        </Animated.View>
      </Pressable>

      {/* Dropdown overlay */}
      {hasOpened && (
        <Animated.View
          style={[
            styles.dropdown,
            {
              opacity,
              transform: [{ translateY }],
            },
          ]}
          pointerEvents={isExpanded ? "auto" : "none"}
        >
          <ScrollView
            nestedScrollEnabled={true}
            style={styles.scrollList}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={true}
          >
            {sections.map((section) => {
              const isActive = section.id === activeSectionId;

              return (
                <Pressable
                  key={section.id}
                  onPress={() => onSectionPress(section.id)}
                  style={[
                    styles.item,
                    isActive && { backgroundColor: `${COLORS.primary}05` },
                  ]}
                  android_ripple={{ color: `${COLORS.primary}10` }}
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
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {section.title}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    zIndex: 100,
    backgroundColor: COLORS.surface,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  listIcon: {
    marginRight: 8,
  },

  headerText: {
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 0.3,
    flex: 1,
  },

  dropdown: {
    position: "absolute",
    top: 44,
    left: 0,
    right: 0,
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    maxHeight: 240,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
    zIndex: 1000,
  },

  scrollList: {
    width: "100%",
  },

  listContent: {
    paddingVertical: 6,
  },

  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  itemContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  activeIcon: {
    marginRight: 8,
    width: 12,
  },

  placeholderIcon: {
    marginRight: 8,
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