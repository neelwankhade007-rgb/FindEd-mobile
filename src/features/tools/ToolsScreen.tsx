import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export default function ToolsScreen() {
  return (
    <View style={[styles.container, { backgroundColor: COLORS.background }]}>
      <Text style={[styles.headerTitle, { color: COLORS.text }]}>Learning Tools</Text>
      <Text style={styles.headerSubtitle}>
        Interact and practice with modules using customized study tools.
      </Text>

      <View style={styles.cardContainer}>
        {/* Launcher Card */}
        <Pressable
          onPress={() => router.push("/cards-demo")}
          style={({ pressed }) => [
            styles.launcherCard,
            { opacity: pressed ? 0.95 : 1 },
          ]}
        >
          <View style={styles.cardIconWrapper}>
            <Ionicons name="layers" size={28} color="#FFFFFF" />
          </View>

          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>FinEd Card Sandbox</Text>
            <Text style={styles.cardDesc}>
              A live component playground showcasing all 10 card formats defined in the design documentation.
            </Text>
            
            <View style={styles.actionRow}>
              <Text style={styles.actionText}>Launch Sandbox</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.primary} />
            </View>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 4,
  },
  headerSubtitle: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "500",
    lineHeight: 18,
    marginBottom: 28,
  },
  cardContainer: {
    width: "100%",
  },
  launcherCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
    gap: 4,
  },
  cardTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "800",
  },
  cardDesc: {
    color: "#4B5563",
    fontSize: 12,
    fontWeight: "500",
    lineHeight: 16,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
});
