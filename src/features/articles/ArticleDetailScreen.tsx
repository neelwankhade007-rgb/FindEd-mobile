import React from "react";
import {
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { MOCK_ARTICLES } from "./articleData";

export default function ArticleDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const article =
    MOCK_ARTICLES.find((a) => a.id === id) ||
    MOCK_ARTICLES[0];

  const renderBody = (text: string) => {
    return text.split("\n\n").map((paragraph, index) => {
      const trimmed = paragraph.trim();

      if (trimmed.startsWith("### ")) {
        return (
          <Text
            key={index}
            style={{
              color: COLORS.text,
              fontSize: 26,
              lineHeight: 34,
              fontWeight: "800",
              marginTop: 36,
              marginBottom: 16,
            }}
          >
            {trimmed.replace("### ", "")}
          </Text>
        );
      }

      if (trimmed.startsWith("- ")) {
        return (
          <View
            key={index}
            style={{
              paddingLeft: 8,
              marginBottom: 16,
            }}
          >
            {trimmed.split("\n").map((item, itemIdx) => (
              <Text
                key={itemIdx}
                style={{
                  color: COLORS.textSecondary,
                  fontSize: 17,
                  lineHeight: 30,
                  marginBottom: 6,
                }}
              >
                • {item.replace("- ", "")}
              </Text>
            ))}
          </View>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        return (
          <View
            key={index}
            style={{
              marginBottom: 18,
            }}
          >
            {trimmed.split("\n").map((item, itemIdx) => (
              <Text
                key={itemIdx}
                style={{
                  color: COLORS.text,
                  fontSize: 17,
                  lineHeight: 30,
                  fontWeight: "600",
                  marginBottom: 6,
                }}
              >
                {item}
              </Text>
            ))}
          </View>
        );
      }

      return (
        <Text
          key={index}
          style={{
            color: COLORS.textSecondary,
            fontSize: 17,
            lineHeight: 30,
            marginBottom: 20,
          }}
        >
          {trimmed}
        </Text>
      );
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
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
            height: 2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 8,
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

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Hero Image */}
        <Image
          source={require("../../../assets/images/featured.png")}
          style={{
            width: "100%",
            height: 220,
          }}
          resizeMode="cover"
        />

        {/* Content */}
        <View
          style={{
            paddingHorizontal: 24,
            paddingVertical: 24,
          }}
        >
          {/* Category & Date */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: 13,
                fontWeight: "700",
                textTransform: "uppercase",
              }}
            >
              {article.category}
            </Text>

            <Text
              style={{
                marginHorizontal: 8,
                color: "#9CA3AF",
              }}
            >
              •
            </Text>

            <Text
              style={{
                color: COLORS.textSecondary,
                fontSize: 13,
              }}
            >
              {article.date}
            </Text>
          </View>

          {/* Title */}
          <Text
            style={{
              color: COLORS.text,
              fontSize: 30,
              lineHeight: 38,
              fontWeight: "800",
              marginBottom: 18,
            }}
          >
            {article.title}
          </Text>

          {/* Metadata Chips */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 10,
              marginBottom: 28,
            }}
          >
            <View style={styles.chip}>
              <Text style={styles.chipText}>
                📈 {article.level}
              </Text>
            </View>

            <View style={styles.chip}>
              <Text style={styles.chipText}>
                ⏱️ {article.readTime}
              </Text>
            </View>

            <View style={styles.chip}>
              <Text style={styles.chipText}>
                🏷️ {article.category}
              </Text>
            </View>
          </View>

          {/* Summary */}
          <View style={styles.summaryCard}>
            <Text
              style={{
                color: COLORS.text,
                fontSize: 17,
                lineHeight: 28,
                fontWeight: "700",
              }}
            >
              {article.summary}
            </Text>
          </View>

          {/* Body */}
          <View>
            {renderBody(article.body)}
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

  chip: {
    backgroundColor: "#FFFFFF",

    paddingHorizontal: 12,
    paddingVertical: 8,

    borderRadius: 14,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 2,
    },

    shadowOpacity: 0.08,

    shadowRadius: 8,

    elevation: 4,
  },

  chipText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",

    borderLeftWidth: 4,

    padding: 20,

    borderRadius: 22,

    marginBottom: 36,

    shadowColor: "#000",

    shadowOffset: {
      width: 0,
      height: 8,
    },

    shadowOpacity: 0.1,

    shadowRadius: 16,

    elevation: 8,
  },
});