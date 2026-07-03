import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface ScenarioStat {
  label: string;
  value: string;
  color?: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
  emoji?: string;
}

interface StoryScenarioCardProps {
  moduleLabel?: string;
  headline?: string;
  name?: string;
  age?: number;
  role?: string;
  location?: string;
  stats?: ScenarioStat[];
  paragraphs?: string[];
  quoteText?: string;
  questionText?: string;
  options?: ScenarioOption[];
  onRespond?: (optionId: string) => void;
  onContinue?: () => void;
  onPrevious?: () => void;
}

export default function StoryScenarioCard({
  moduleLabel = "MODULE 1 • CARD 2",
  headline = "Meet Arjun. He's doing everything right — and still falling behind.",
  name = "Arjun",
  age = 24,
  role = "Software Analyst",
  location = "Pune",
  stats = [
    { label: "SALARY", value: "₹40k", color: "#3525cd" },
    { label: "EXPENSES", value: "₹25k", color: "#141b2b" },
    { label: "SAVINGS", value: "₹15k", color: "#3525cd" },
  ],
  paragraphs = [
    "Arjun isn't splurging. He isn't in debt. He saves ₹15,000 every single month without fail. By most people's standards, he's being responsible with money.",
    "But at the end of every year, Arjun looks at his bank balance and thinks — \"I've been saving for two years. Why does it still feel like I'm falling behind?\"",
  ],
  quoteText = "The answer isn't that Arjun is doing something wrong. It's that saving and investing are not the same thing — and that difference, over a lifetime, can be worth crores.",
  questionText = "Does this sound familiar? (No wrong answer — tap to continue)",
  options = [
    { id: "me", text: "This is literally me right now", emoji: "😅" },
    { id: "someone", text: "I know someone exactly like this", emoji: "👀" },
    { id: "curious", text: "I'm curious where this is going", emoji: "🤔" },
  ],
  onRespond,
  onContinue,
  onPrevious,
}: StoryScenarioCardProps) {
  const avatarImage = require("../../../../../assets/images/arjun.png");
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const handleOptionPress = (optionId: string) => {
    setSelectedOptionId(optionId);
    if (onRespond) {
      onRespond(optionId);
    }
  };

  return (
    <View style={styles.cardContainer}>
      {/* Module Eyebrow Heading */}
      <Text style={styles.moduleLabel}>{moduleLabel}</Text>

      {/* Main Title / Headline */}
      <Text style={styles.headline}>{headline}</Text>

      {/* Financial Profile Card */}
      <View style={styles.profileCard}>
        <View style={styles.profileHeaderRow}>
          <Image source={avatarImage} style={styles.circularAvatar} />
          <View style={styles.profileTextCol}>
            <Text style={styles.profileName}>
              {name}, {age}
            </Text>
            <Text style={styles.profileSubtitle}>
              {role} • {location}
            </Text>
          </View>
        </View>

        {/* Statistics Row */}
        <View style={styles.statsRow}>
          {stats.map((stat, idx) => (
            <View key={idx} style={styles.statCol}>
              <Text style={[styles.statValue, { color: stat.color || COLORS.onSurface }]}>
                {stat.value}
              </Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Narrative Paragraphs */}
      <View style={styles.paragraphsContainer}>
        {paragraphs.map((p, index) => (
          <Text key={index} style={styles.paragraphText}>
            {p}
          </Text>
        ))}
      </View>

      {/* Highlight Quote Callout */}
      {quoteText ? (
        <View style={styles.quoteBox}>
          <Text style={styles.quoteText}>{quoteText}</Text>
        </View>
      ) : null}

      {/* Transition Question */}
      {questionText ? (
        <Text style={styles.questionText}>{questionText}</Text>
      ) : null}

      {/* Duolingo-style Choice Cards */}
      <View style={styles.optionsContainer}>
        {options.map((option) => {
          const isSelected = option.id === selectedOptionId;
          return (
            <Pressable
              key={option.id}
              onPress={() => handleOptionPress(option.id)}
              style={[
                styles.optionRow,
                isSelected ? styles.optionRowSelected : null,
              ]}
            >
              <Text style={styles.optionEmoji}>{option.emoji}</Text>
              <Text style={[
                styles.optionText,
                isSelected ? styles.optionTextSelected : null
              ]}>
                {option.text}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {/* Fixed Footer Navigation */}
      <View style={styles.footerRow}>
        <Pressable
          onPress={onPrevious}
          style={({ pressed }) => [
            styles.previousButton,
            { opacity: pressed ? 0.6 : 1 },
          ]}
        >
          <Ionicons name="chevron-back" size={16} color={COLORS.onSurfaceVariant} style={{ marginRight: 4 }} />
          <Text style={styles.previousButtonText}>Previous</Text>
        </Pressable>

        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.continueButton,
            { opacity: pressed ? 0.9 : 1 },
          ]}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
          <Ionicons name="chevron-forward" size={16} color={COLORS.onPrimary} style={{ marginLeft: 4 }} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "transparent",
    gap: 16,
    paddingHorizontal: 4,
    width: "100%",
  },
  moduleLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 11,
    color: COLORS.primaryContainer,
    letterSpacing: 0.8,
    marginBottom: -4,
  },
  headline: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 24,
    color: COLORS.onSurface,
    lineHeight: 32,
  },
  profileCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 16,
    padding: 20, // Increased internal padding
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.02,
    shadowRadius: 12,
    elevation: 2,
    marginTop: 4,
  },
  profileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16, // Increased spacing
  },
  circularAvatar: {
    width: 56, // Increased size slightly
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  profileTextCol: {
    flex: 1,
    justifyContent: "center",
  },
  profileName: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 18, // Thicker name
    color: COLORS.onSurface,
  },
  profileSubtitle: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 13,
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: "row",
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: 12,
    paddingVertical: 14, // Increased padding
    paddingHorizontal: 16,
    marginTop: 18,
    justifyContent: "space-between",
  },
  statCol: {
    flex: 1,
    alignItems: "center",
  },
  statValue: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 19, // Larger values
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 9,
    color: COLORS.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  paragraphsContainer: {
    gap: 22, // Set 22-24px paragraph spacing rhythm
  },
  paragraphText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    lineHeight: 22, // Higher line height
    color: COLORS.onSurfaceVariant,
  },
  quoteBox: {
    backgroundColor: "rgba(254, 166, 25, 0.06)", // Soft amber background tint
    borderLeftWidth: 5, // Thicker left accent bar
    borderLeftColor: COLORS.secondaryContainer,
    borderRadius: 10,
    padding: 16,
    marginVertical: 4,
  },
  quoteText: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 14,
    color: COLORS.onSecondaryContainer,
    lineHeight: 20,
  },
  questionText: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 13.5,
    fontStyle: "italic",
    color: COLORS.onSurfaceVariant,
    marginTop: 8,
    opacity: 0.85,
  },
  optionsContainer: {
    gap: 12, // Duolingo cards gaps
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 14,
    paddingVertical: 16, // Better height and touch targets
    paddingHorizontal: 18,
    borderWidth: 1,
    borderColor: COLORS.outlineVariant,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.01,
    shadowRadius: 4,
    elevation: 1,
  },
  optionRowSelected: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surfaceContainerLow,
    shadowOpacity: 0.02,
  },
  optionEmoji: {
    fontSize: 20,
    marginRight: 14,
  },
  optionText: {
    fontFamily: "PlusJakartaSans-SemiBold",
    fontSize: 14.5,
    color: COLORS.onSurface,
    flex: 1,
  },
  optionTextSelected: {
    color: COLORS.primary,
  },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
    paddingBottom: 16,
  },
  previousButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  previousButtonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: COLORS.onSurfaceVariant,
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primaryContainer,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
  },
  continueButtonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: COLORS.onPrimary,
  },
});
