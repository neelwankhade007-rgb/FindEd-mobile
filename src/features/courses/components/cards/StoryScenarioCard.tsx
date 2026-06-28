import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface ScenarioStat {
  label: string;
  value: string;
  color: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  type?: "primary" | "secondary" | "accent";
  icon?: string;
}

interface StoryScenarioCardProps {
  name?: string;
  role?: string;
  onRespond: (optionId: string) => void;
  onContinue?: () => void;
}

export default function StoryScenarioCard({
  name = "Arjun Sharma",
  role = "SOFTWARE DEV",
  onRespond,
  onContinue,
}: StoryScenarioCardProps) {
  // Avatar image 5 levels up: src/features/courses/components/cards/StoryScenarioCard.tsx -> assets/images
  const avatarImage = require("../../../../../assets/images/arjun.png");

  return (
    <View style={styles.cardContainer}>
      {/* Top Section: Avatar and Stats Row */}
      <View style={styles.headerInfoRow}>
        <Image source={avatarImage} style={styles.squareAvatar} />
        <View style={styles.statsCol}>
          {/* Salary Card */}
          <View style={styles.statCardInline}>
            <View>
              <Text style={styles.statLabel}>Salary</Text>
              <Text style={styles.statValue}>₹65,000</Text>
            </View>
            <Ionicons name="cash-outline" size={20} color="#10B981" />
          </View>
          {/* Expenses Card */}
          <View style={styles.statCardInline}>
            <View>
              <Text style={styles.statLabel}>Expenses</Text>
              <Text style={styles.statValue}>₹42,000</Text>
            </View>
            <Ionicons name="trending-down-outline" size={20} color="#EF4444" />
          </View>
        </View>
      </View>

      {/* Main Info Card */}
      <View style={styles.detailsCard}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsName}>{name}</Text>
          <View style={styles.roleTag}>
            <Text style={styles.roleTagText}>{role}</Text>
          </View>
        </View>
        <Text style={styles.detailsDesc}>
          Arjun just received his annual bonus and is contemplating between paying off his credit card debt or buying a new gaming setup he's wanted for months.
        </Text>
      </View>

      {/* Current State Indicators */}
      <View style={styles.sectionWrapper}>
        <Text style={styles.sectionHeader}>CURRENT STATE</Text>
        <View style={styles.stateRow}>
          {/* Emergency Card */}
          <View style={styles.stateCard}>
            <View style={styles.stateHeader}>
              <Ionicons name="shield-checkmark-outline" size={14} color="#4F46E5" />
              <Text style={styles.stateTitle}>Emergency</Text>
            </View>
            <View style={styles.stateProgressBackground}>
              <View style={[styles.stateProgressFill, { width: "33%" }]} />
            </View>
            <Text style={styles.stateLabelText}>33% Funded</Text>
          </View>

          {/* Debt Load Card */}
          <View style={styles.stateCard}>
            <View style={styles.stateHeader}>
              <Ionicons name="card-outline" size={14} color="#854D0E" />
              <Text style={styles.stateTitle}>Debt Load</Text>
            </View>
            <View style={styles.stateProgressBackground}>
              <View style={[styles.stateProgressFill, { width: "80%", backgroundColor: "#854D0E" }]} />
            </View>
            <Text style={styles.stateLabelText}>High Utilization</Text>
          </View>
        </View>
      </View>

      {/* Opportunity Cost Box */}
      <View style={styles.opportunityBox}>
        <View style={styles.opportunityHeader}>
          <Ionicons name="bulb-outline" size={18} color="#B45309" />
          <Text style={styles.opportunityTitle}>The Opportunity Cost</Text>
        </View>
        <Text style={styles.opportunityDesc}>
          "Every rupee spent on entertainment today is a rupee that isn't working for Arjun's future self at 12% interest."
        </Text>
      </View>

      {/* Action Title and Buttons */}
      <View style={styles.actionSection}>
        <Text style={styles.howDoYouFeelLabel}>HOW DO YOU FEEL ABOUT ARJUN?</Text>
        <View style={styles.actionButtonsRow}>
          <Pressable style={styles.relatableBtn} onPress={() => onRespond("relatable")}>
            <Ionicons name="heart-outline" size={16} color="#4F46E5" style={{ marginRight: 6 }} />
            <Text style={styles.relatableBtnText}>Relatable</Text>
          </Pressable>
          <Pressable style={styles.curiousBtn} onPress={() => onRespond("curious")}>
            <Ionicons name="search-outline" size={16} color="#111827" style={{ marginRight: 6 }} />
            <Text style={styles.curiousBtnText}>Curious</Text>
          </Pressable>
        </View>
      </View>

      {/* Next Scenario link */}
      {onContinue && (
        <Pressable style={styles.nextScenarioBtn} onPress={onContinue}>
          <Text style={styles.nextScenarioBtnText}>Next Scenario ➔</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "transparent",
    gap: 16,
  },
  headerInfoRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  squareAvatar: {
    width: 110,
    height: 110,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  statsCol: {
    flex: 1,
    gap: 8,
  },
  statCardInline: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  statLabel: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "700",
    marginBottom: 2,
  },
  statValue: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "800",
  },
  detailsCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 2,
  },
  detailsHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  detailsName: {
    color: "#1E1B4B",
    fontSize: 16,
    fontWeight: "800",
  },
  roleTag: {
    backgroundColor: "#FEF3C7", // Yellow/amber tag background
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  roleTagText: {
    color: "#D97706", // Dark orange/brown tag text
    fontSize: 8.5,
    fontWeight: "800",
  },
  detailsDesc: {
    color: "#374151",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
  },
  sectionWrapper: {
    gap: 8,
  },
  sectionHeader: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
  },
  stateRow: {
    flexDirection: "row",
    gap: 12,
  },
  stateCard: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  stateHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
  },
  stateTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: "800",
  },
  stateProgressBackground: {
    height: 4,
    borderRadius: 2,
    backgroundColor: "#E2E8F0",
    width: "100%",
    marginBottom: 6,
    overflow: "hidden",
  },
  stateProgressFill: {
    height: "100%",
    backgroundColor: "#4F46E5",
    borderRadius: 2,
  },
  stateLabelText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    fontWeight: "600",
  },
  opportunityBox: {
    backgroundColor: "#FFFBEB", // Soft amber background
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 16,
    padding: 16,
    gap: 6,
  },
  opportunityHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  opportunityTitle: {
    color: "#92400E", // Deep amber/brown
    fontSize: 13,
    fontWeight: "800",
  },
  opportunityDesc: {
    color: "#78350F",
    fontSize: 12,
    fontStyle: "italic",
    lineHeight: 16,
    fontWeight: "600",
  },
  actionSection: {
    gap: 10,
    marginTop: 8,
  },
  howDoYouFeelLabel: {
    color: "#6B7280",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  actionButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },
  relatableBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surface,
    borderWidth: 1.5,
    borderColor: "#C7D2FE",
    paddingVertical: 14,
    borderRadius: 14,
  },
  relatableBtnText: {
    color: "#4B5563",
    fontSize: 15,
    fontWeight: "700",
  },
  curiousBtn: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.accent, // Yellow accent button color from COLORS
    paddingVertical: 14,
    borderRadius: 14,
  },
  curiousBtnText: {
    color: COLORS.text,
    fontSize: 15,
    fontWeight: "700",
  },
  nextScenarioBtn: {
    alignSelf: "center",
    paddingVertical: 8,
  },
  nextScenarioBtnText: {
    color: "#6B7280",
    fontSize: 13,
    fontWeight: "700",
  },
});
