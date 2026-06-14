import React, { useState, useMemo, useRef } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
  StyleSheet,
} from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { MOCK_ARTICLES } from "./articleData";
import TableOfContents, { TOCSection } from "./components/TableOfContents";

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const article =
    MOCK_ARTICLES.find((a) => a.id === id) ||
    MOCK_ARTICLES[0];

  const parsedContent = useMemo(() => {
    const lines = article.body.split("\n");
    const blocks: { type: "heading" | "list-item" | "ordered-item" | "paragraph"; text: string; id?: string }[] = [];
    let currentParagraph = "";

    const flushParagraph = () => {
      if (currentParagraph.trim()) {
        blocks.push({ type: "paragraph", text: currentParagraph.trim() });
        currentParagraph = "";
      }
    };

    lines.forEach((line, index) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("### ")) {
        flushParagraph();
        const title = trimmed.replace("### ", "").trim();
        blocks.push({
          type: "heading",
          text: title,
          id: `heading-${index}`,
        });
      } else if (trimmed.startsWith("- ")) {
        flushParagraph();
        blocks.push({ type: "list-item", text: trimmed.replace("- ", "").trim() });
      } else if (/^\d+\.\s/.test(trimmed)) {
        flushParagraph();
        blocks.push({ type: "ordered-item", text: trimmed });
      } else if (trimmed === "") {
        flushParagraph();
      } else {
        if (currentParagraph) {
          currentParagraph += "\n" + line;
        } else {
          currentParagraph = line;
        }
      }
    });
    flushParagraph();
    return blocks;
  }, [article.body]);

  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const sectionLayouts = useRef<{ [key: string]: number }>({});

  const sections = useMemo<TOCSection[]>(() => {
    return parsedContent
      .filter((block) => block.type === "heading")
      .map((block) => ({
        id: block.id!,
        title: block.text,
      }));
  }, [parsedContent]);

  const handleSectionPress = (sectionId: string) => {
    const y = sectionLayouts.current[sectionId];
    if (y !== undefined) {
      scrollViewRef.current?.scrollTo({ y: 220 + y - 10, animated: true });
      setActiveSection(sectionId);
    }
  };

  const renderBody = () => {
    return parsedContent.map((block, index) => {
      if (block.type === "heading") {
        return (
          <Text
            key={index}
            onLayout={(event) => {
              if (block.id) {
                sectionLayouts.current[block.id] = event.nativeEvent.layout.y;
              }
            }}
            style={{
              color: COLORS.text,
              fontSize: 22,
              lineHeight: 28,
              fontWeight: "800",
              marginTop: 28,
              marginBottom: 12,
            }}
          >
            {block.text}
          </Text>
        );
      }

      if (block.type === "list-item") {
        return (
          <View
            key={index}
            style={{
              paddingLeft: 8,
              marginBottom: 6,
            }}
          >
            <Text
              style={{
                color: "#374151",
                fontSize: 16,
                lineHeight: 26,
              }}
            >
              • {block.text}
            </Text>
          </View>
        );
      }

      if (block.type === "ordered-item") {
        return (
          <View
            key={index}
            style={{
              marginBottom: 8,
            }}
          >
            <Text
              style={{
                color: COLORS.text,
                fontSize: 16,
                lineHeight: 26,
                fontWeight: "600",
              }}
            >
              {block.text}
            </Text>
          </View>
        );
      }

      return (
        <Text
          key={index}
          style={{
            color: "#374151",
            fontSize: 16,
            lineHeight: 26,
            marginBottom: 20,
          }}
        >
          {block.text}
        </Text>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header Container */}
      <View style={{ position: "relative", zIndex: 10 }}>
        {/* Header */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
            paddingVertical: 16,
            backgroundColor: COLORS.surface,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 2,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={COLORS.primary}
            />

            <Text
              style={{
                color: COLORS.primary,
                fontSize: 16,
                fontWeight: "600",
                marginLeft: 4,
              }}
            >
              Back
            </Text>
          </Pressable>

          <Text
            style={{
              color: COLORS.textSecondary,
              fontSize: 14,
              fontWeight: "700",
              textTransform: "uppercase",
            }}
          >
            {article.category}
          </Text>

          <View style={{ width: 60 }} />
        </View>

        {/* Reading Progress Bar */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 3,
            backgroundColor: `${COLORS.primary}15`,
            zIndex: 20,
          }}
        >
          <View
            style={{
              height: "100%",
              backgroundColor: COLORS.primary,
              width: `${readProgress * 100}%`,
            }}
          />
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        scrollEventThrottle={16}
        onScroll={(event) => {
          const scrollY = event.nativeEvent.contentOffset.y;
          const contentHeight = event.nativeEvent.contentSize.height;
          const layoutHeight = event.nativeEvent.layoutMeasurement.height;
          const maxScroll = contentHeight - layoutHeight;

          if (maxScroll > 0) {
            const progress = Math.max(0, Math.min(1, scrollY / maxScroll));
            setReadProgress(progress);
          }

          let activeId: string | null = null;
          const sortedSections = [...sections].sort((a, b) => {
            const yA = sectionLayouts.current[a.id] || 0;
            const yB = sectionLayouts.current[b.id] || 0;
            return yA - yB;
          });

          for (let i = 0; i < sortedSections.length; i++) {
            const section = sortedSections[i];
            const y = (sectionLayouts.current[section.id] || 0) + 220;
            if (scrollY >= y - 40) {
              activeId = section.id;
            }
          }

          if (activeId !== activeSection) {
            setActiveSection(activeId);
          }
        }}
      >
        {/* Hero Image */}
        <Image
          source={article.image || require("../../../assets/images/featured.png")}
          style={{
            width: "100%",
            aspectRatio: 16 / 9,
          }}
          contentFit="cover"
          contentPosition={(article.focalPoint as any) || "center"}
        />

        {/* Content */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 24,
          }}
        >
          {/* Metadata: Category • Date • Read Time */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 12,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {article.category}
            </Text>
            <Text style={{ marginHorizontal: 6, color: "#9CA3AF" }}>•</Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: "500" }}>
              {article.date}
            </Text>
            <Text style={{ marginHorizontal: 6, color: "#9CA3AF" }}>•</Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 12, fontWeight: "500" }}>
              {article.readTime}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              color: COLORS.text,
              fontSize: 28,
              lineHeight: 36,
              fontWeight: "800",
              marginBottom: 16,
            }}
          >
            {article.title}
          </Text>

          {/* Inline Summary */}
          <View
            style={{
              borderLeftWidth: 3,
              borderLeftColor: COLORS.primary,
              paddingLeft: 16,
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                color: "#374151",
                fontSize: 16,
                lineHeight: 24,
                fontStyle: "italic",
              }}
            >
              {article.summary}
            </Text>
          </View>

          {/* Table of Contents */}
          {sections.length > 0 && (
            <TableOfContents
              sections={sections}
              activeSectionId={activeSection}
              onSectionPress={handleSectionPress}
            />
          )}

          {/* Body */}
          <View>
            {renderBody()}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: {
    paddingBottom: 60,
  },
});