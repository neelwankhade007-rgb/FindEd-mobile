import React, { useState, useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Image, ScrollView, Animated as RNAnimated, Easing } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp } from "react-native-reanimated";
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

export interface StoryLevel {
  level: number;
  paragraphs: string[];
  questionText: string;
  options: ScenarioOption[];
  quoteText?: string;
}

export const STORY_LEVELS: StoryLevel[] = [
  {
    level: 1,
    paragraphs: [
      "Arjun isn't splurging. He isn't in debt. He saves ₹15,000 every single month without fail. By most people's standards, he's being responsible with money.",
      "But at the end of every year, Arjun looks at his bank balance and thinks — \"I've been saving for two years. Why does it still feel like I'm falling behind?\""
    ],
    questionText: "Does this sound familiar? (No wrong answer — tap to continue)",
    options: [
      { id: "me", text: "This is literally me right now", emoji: "😅" },
      { id: "someone", text: "I know someone exactly like this", emoji: "👀" },
      { id: "curious", text: "I'm curious where this is going", emoji: "🤔" },
    ],
    quoteText: "The answer isn't that Arjun is doing something wrong. It's that saving and investing are not the same thing — and that difference, over a lifetime, can be worth crores."
  },
  {
    level: 2,
    paragraphs: [
      "Arjun isn't actually making a mistake.",
      "The problem is that saving money and growing wealth are two different things.",
      "Every year, prices quietly rise because of inflation.",
      "His money is growing, but its purchasing power is shrinking."
    ],
    questionText: "What do you think is happening?",
    options: [
      { id: "l2_inflation", text: "Inflation is reducing the value of his savings", emoji: "📉" },
      { id: "l2_save_more", text: "He simply needs to save more", emoji: "💰" },
      { id: "l2_not_sure", text: "I'm not sure yet", emoji: "🤷" }
    ]
  },
  {
    level: 3,
    paragraphs: [
      "Imagine two people saving the exact same amount every month.",
      "One only saves.",
      "The other invests in assets that grow faster than inflation.",
      "Ten years later, their bank balances tell two completely different stories."
    ],
    questionText: "Which person is more likely to build long-term wealth?",
    options: [
      { id: "l3_invests", text: "The one who invests", emoji: "💹" },
      { id: "l3_saves", text: "The one who only saves", emoji: "🏦" },
      { id: "l3_why", text: "I want to know why", emoji: "🤔" }
    ]
  },
  {
    level: 4,
    paragraphs: [
      "This is why investing exists.",
      "Saving protects your money.",
      "Investing helps your money grow.",
      "Understanding this difference is one of the biggest financial mindset shifts you'll ever make."
    ],
    questionText: "Ready to learn how investing actually works?",
    options: [
      { id: "l4_lets_go", text: "Let's go", emoji: "🚀" },
      { id: "l4_basics", text: "Show me the basics", emoji: "📖" },
      { id: "l4_interested", text: "I'm interested", emoji: "💡" }
    ]
  }
];

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
  paragraphs,
  quoteText,
  questionText,
  options,
  onRespond,
  onContinue,
  onPrevious,
}: StoryScenarioCardProps) {
  const avatarImage = require("../../../../../assets/images/arjun.png");

  const [activeLevel, setActiveLevel] = useState<number>(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [levelOffsets, setLevelOffsets] = useState<Record<number, number>>({});
  const [lastScrolledLevel, setLastScrolledLevel] = useState<number>(1);
  const scrollViewRef = useRef<ScrollView>(null);
  const currentScrollY = useRef(0);
  const scrollAnim = useRef(new RNAnimated.Value(0)).current;

  // Sync scroll listener to run smooth, custom duration scrolling animations
  useEffect(() => {
    const listenerId = scrollAnim.addListener((state) => {
      scrollViewRef.current?.scrollTo({ y: state.value, animated: false });
    });
    return () => {
      scrollAnim.removeListener(listenerId);
    };
  }, []);

  // Smooth scroll to the top of the newly unlocked level
  useEffect(() => {
    if (activeLevel > lastScrolledLevel) {
      const offset = levelOffsets[activeLevel];
      if (offset !== undefined) {
        setLastScrolledLevel(activeLevel);
        const targetY = Math.max(0, offset - 10);

        // Pre-set animation start value to the user's current scroll offset
        scrollAnim.setValue(currentScrollY.current);

        // Smoothly animate the scroll offset over a custom steady 1-second duration
        RNAnimated.timing(scrollAnim, {
          toValue: targetY,
          duration: 1000, // 1000ms makes the transition slow, steady, and premium
          easing: Easing.out(Easing.ease), // Natural deceleration
          useNativeDriver: false, // Required false for scrolling via state listener
        }).start();
      }
    }
  }, [activeLevel, levelOffsets, lastScrolledLevel]);

  const handleOptionPress = (levelNum: number, optionId: string) => {
    const updatedAnswers = { ...answers, [levelNum]: optionId };
    setAnswers(updatedAnswers);
    if (onRespond) {
      onRespond(optionId);
    }

    if (levelNum < 4) {
      setTimeout(() => {
        setActiveLevel(levelNum + 1);
      }, 500); // Slight delay for selection animation feedback
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScroll={(event) => {
          currentScrollY.current = event.nativeEvent.contentOffset.y;
        }}
        onScrollBeginDrag={() => {
          // Instantly interrupt automated scroll if the user begins dragging
          scrollAnim.stopAnimation();
        }}
      >
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

        {/* Render Levels */}
        {Array.from({ length: activeLevel }).map((_, idx) => {
          const levelNum = idx + 1;
          const isCurrentLevel = levelNum === activeLevel;

          // Resolve Level 1 content from props if available
          let levelParagraphs = STORY_LEVELS[idx].paragraphs;
          let levelQuestion = STORY_LEVELS[idx].questionText;
          let levelOptions = STORY_LEVELS[idx].options;
          let levelQuoteText = STORY_LEVELS[idx].quoteText;

          if (levelNum === 1) {
            if (paragraphs) levelParagraphs = paragraphs;
            if (questionText) levelQuestion = questionText;
            if (options) levelOptions = options;
            if (quoteText) levelQuoteText = quoteText;
          }

          const renderLevelContent = () => (
            <View style={styles.levelContainer}>
              {/* Separator Line */}
              {levelNum > 1 && (
                <View style={styles.levelDividerLine} />
              )}

              {/* Paragraphs */}
              <View style={styles.paragraphsContainer}>
                {levelParagraphs.map((p, pIdx) => (
                  <Text key={pIdx} style={styles.paragraphText}>
                    {p}
                  </Text>
                ))}
              </View>

              {/* Quote box if available for Level 1 */}
              {levelNum === 1 && levelQuoteText && (
                <View style={styles.quoteBox}>
                  <Text style={styles.quoteText}>{levelQuoteText}</Text>
                </View>
              )}

              {/* Question & Choices */}
              <View style={styles.questionAndChoicesWrapper}>
                {isCurrentLevel ? (
                  // Active level (Interactive options)
                  <View style={styles.questionAndChoicesContainer}>
                    {levelQuestion ? (
                      <Text style={styles.questionText}>{levelQuestion}</Text>
                    ) : null}

                    <View style={styles.optionsContainer}>
                      {levelOptions.map((option) => {
                        const isSelected = option.id === answers[levelNum];
                        return (
                          <Pressable
                            key={option.id}
                            onPress={() => {
                              if (answers[levelNum]) return; // Disable further selections on this level
                              handleOptionPress(levelNum, option.id);
                            }}
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
                  </View>
                ) : (
                  // Answered Level (Static & Faded options)
                  <View style={styles.questionAndChoicesContainer}>
                    {levelQuestion ? (
                      <Text style={[styles.questionText, styles.disabledText]}>{levelQuestion}</Text>
                    ) : null}

                    <View style={styles.optionsContainer}>
                      {levelOptions.map((option) => {
                        const isSelected = option.id === answers[levelNum];
                        return (
                          <View
                            key={option.id}
                            style={[
                              styles.optionRow,
                              isSelected ? styles.optionRowSelectedDisabled : styles.optionRowFadedDisabled,
                            ]}
                          >
                            <Text style={[styles.optionEmoji, !isSelected && styles.fadedOpacity]}>
                              {option.emoji}
                            </Text>
                            <Text style={[
                              styles.optionText,
                              isSelected ? styles.optionTextSelectedDisabled : styles.optionTextDisabled
                            ]}>
                              {option.text}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                )}
              </View>
            </View>
          );

          if (isCurrentLevel && levelNum > 1) {
            return (
              <Animated.View
                key={levelNum}
                entering={FadeInUp.duration(800)}
                onLayout={(event) => {
                  const { y } = event.nativeEvent.layout;
                  setLevelOffsets((prev) => ({ ...prev, [levelNum]: y }));
                }}
              >
                {renderLevelContent()}
              </Animated.View>
            );
          }

          return (
            <View
              key={levelNum}
              onLayout={(event) => {
                const { y } = event.nativeEvent.layout;
                setLevelOffsets((prev) => ({ ...prev, [levelNum]: y }));
              }}
            >
              {renderLevelContent()}
            </View>
          );
        })}
      </ScrollView>

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
          disabled={!answers[4]}
          style={({ pressed }) => [
            styles.continueButton,
            !answers[4] ? styles.continueButtonDisabled : null,
            { opacity: pressed && answers[4] ? 0.9 : !answers[4] ? 0.5 : 1 },
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
  outerContainer: {
    flex: 1,
    width: "100%",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 4,
    gap: 16,
    paddingBottom: 24,
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
    padding: 20,
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
    gap: 16,
  },
  circularAvatar: {
    width: 56,
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
    fontSize: 18,
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
    paddingVertical: 14,
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
    fontSize: 19,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 9,
    color: COLORS.onSurfaceVariant,
    letterSpacing: 0.5,
  },
  levelContainer: {
    gap: 16,
    marginTop: 8,
  },
  levelDividerLine: {
    height: 1,
    width: "100%",
    backgroundColor: COLORS.outlineVariant,
    opacity: 0.4,
    marginVertical: 12,
  },
  paragraphsContainer: {
    gap: 22,
  },
  paragraphText: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    lineHeight: 22,
    color: COLORS.onSurfaceVariant,
  },
  quoteBox: {
    backgroundColor: "rgba(254, 166, 25, 0.06)",
    borderLeftWidth: 5,
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
  questionAndChoicesWrapper: {
    marginTop: 8,
  },
  questionAndChoicesContainer: {
    gap: 12,
  },
  questionText: {
    fontFamily: "PlusJakartaSans-Medium",
    fontSize: 13.5,
    fontStyle: "italic",
    color: COLORS.onSurfaceVariant,
    opacity: 0.85,
    marginBottom: 4,
  },
  disabledText: {
    opacity: 0.6,
  },
  optionsContainer: {
    gap: 12,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: 14,
    paddingVertical: 16,
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
  optionRowSelectedDisabled: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.surfaceContainerLow,
    opacity: 0.9,
  },
  optionRowFadedDisabled: {
    opacity: 0.35,
    backgroundColor: COLORS.surfaceContainerLowest,
  },
  optionEmoji: {
    fontSize: 20,
    marginRight: 14,
  },
  fadedOpacity: {
    opacity: 0.5,
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
  optionTextDisabled: {
    color: COLORS.onSurfaceVariant,
    flex: 1,
  },
  optionTextSelectedDisabled: {
    color: COLORS.primary,
    flex: 1,
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
  continueButtonDisabled: {
    backgroundColor: COLORS.inactive,
  },
  continueButtonText: {
    fontFamily: "PlusJakartaSans-Bold",
    fontSize: 14,
    color: COLORS.onPrimary,
  },
});
