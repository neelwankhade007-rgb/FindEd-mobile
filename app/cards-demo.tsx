import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import {
  CinematicOpenerCard,
  StoryScenarioCard,
  ConceptExplainerCard,
  InteractiveExplorerCard,
  RiskSpectrumCard,
  SliderCalculatorCard,
  PillSelectorCard,
  ChartVisualCard,
  QuizCard,
  CompletionCard,
} from "@/features/courses/components/cards";

const CARD_TYPES = [
  { id: 1, name: "Opener" },
  { id: 2, name: "Story" },
  { id: 3, name: "Explainer" },
  { id: 4, name: "Explorer" },
  { id: 5, name: "Spectrum" },
  { id: 6, name: "Slider" },
  { id: 7, name: "Pill Select" },
  { id: 8, name: "Chart Visual" },
  { id: 9, name: "Quiz" },
  { id: 10, name: "Wrap-up" },
];

export default function CardsDemoScreen() {
  const [activeCardId, setActiveCardId] = useState<number>(1);
  const logAction = (msg: string) => {
    console.log(msg);
  };

  // Mock data definitions
  const cinematicOpenerProps = {
    line1: "Same ₹1 lakh. Same 20 years.",
    line2: "Three people. Three choices.",
    line3: "Wildly different outcomes.",
    tagline: "Before you invest a single rupee, you need to understand your options.",
    xpTeaser: "30 FinStars",
    ctaText: "See what happened →",
    onComplete: () => logAction("CinematicOpener: onComplete triggered! Next card..."),
  };

  const storyScenarioProps = {
    name: "Arjun",
    role: "Software Analyst",
    onRespond: (id: string) => logAction(`StoryScenario: onRespond with choice: "${id}"`),
    onContinue: () => logAction("StoryScenario: onContinue triggered! Next card..."),
    onPrevious: () => logAction("StoryScenario: onPrevious triggered!"),
  };

  const conceptExplainerProps = {
    moduleLabel: "Module 1 · Card 3",
    title: "Your savings account is quietly lying to you.",
    paragraphs: [
      "Arjun's bank gives him about 3.5% interest on his savings account. That sounds decent — until you learn that inflation in India runs at roughly 5-6% per year.",
      "Inflation means prices rise over time. The ₹100 that buys you lunch today will only buy you part of that lunch in 10 years. If your money grows slower than prices rise, you're getting poorer even while your bank balance goes up. This isn't a scare tactic — it's just arithmetic.",
      "Look at what happens to ₹1,000,000 over 10 years depending on where it sits:"
    ],
    chartBars: [
      { label: "Under the\nMattress (0%)", valLabel: "₹1.0L", value: 1.0, color: "#EF4444" },
      { label: "Savings\nAccount (3.5%)", valLabel: "₹1.4L", value: 1.4, color: "#3B82F6" },
      { label: "Invested in\nEquity (12%)", valLabel: "₹3.1L", value: 3.1, color: "#10B981" }
    ],
    quoteText: "“Same ₹1 lakh. Same 10 years. Completely different outcomes — just based on where the money sat.”",
    footnote: "* 12% is the approximate long-term CAGR of the Nifty 50 over the past 20 years. Returns are illustrative and not guaranteed.",
    actionButtonText: "I see the problem — what's the solution?",
    onContinue: () => logAction("ConceptExplainer: onContinue triggered!"),
    onPrevious: () => logAction("ConceptExplainer: onPrevious triggered!"),
  };

  const interactiveExplorerProps = {
    tiles: [
      { id: "fd", icon: "library-outline", name: "Fixed Deposits", subtitle: "Safe & Steady" },
      { id: "gold", icon: "cash-outline", name: "Gold", subtitle: "Inflation Hedge" },
      { id: "realestate", icon: "home-outline", name: "Real Estate", subtitle: "Tangible Wealth" },
      { id: "equity", icon: "trending-up-outline", name: "Equities", subtitle: "High Growth" },
    ],
    detailsData: {
      fd: { returnVal: "~7%", returnLevel: "low", riskVal: "Low", riskLevel: "low", liquidityVal: "High", liquidityLevel: "high", description: "Fixed deposits are bank-backed contracts.", bestFor: "Short-term capital protection." },
      gold: { returnVal: "~9%", returnLevel: "mid", riskVal: "Low-Mid", riskLevel: "mid", liquidityVal: "Very High", liquidityLevel: "high", description: "Gold acts as a safe-haven asset.", bestFor: "Long-term buffer against crashes." },
      realestate: { returnVal: "~8-10%", returnLevel: "mid", riskVal: "Low-Mid", riskLevel: "mid", liquidityVal: "Low", liquidityLevel: "low", description: "Real Estate represents physical property ownership yielding rental income and capital appreciation.", bestFor: "Stable long-term tangible wealth generation." },
      equity: { returnVal: "~15%", returnLevel: "high", riskVal: "High", riskLevel: "high", liquidityVal: "Very High", liquidityLevel: "high", description: "Owning stock grants you direct business shares.", bestFor: "Creating generational compound growth." },
    } as any,
    onContinue: () => logAction("InteractiveExplorer: onContinue triggered!"),
  };

  const riskSpectrumProps = {
    dots: [
      { id: "fd", label: "FD", positionPercent: 12, color: "#3B82F6", title: "Fixed Deposits", returnVal: "~7%", riskVal: "Very Low", description: "Safe guaranteed returns." },
      { id: "gold", label: "Gold", positionPercent: 32, color: "#10B981", title: "Gold", returnVal: "~9%", riskVal: "Low", description: "Inflation hedge." },
      { id: "mf", label: "MF", positionPercent: 55, color: "#FBBF24", title: "Mutual Funds", returnVal: "~12%", riskVal: "Medium", description: "Managed stocks portfolio." },
      { id: "eq", label: "Direct Equity", positionPercent: 88, color: "#EF4444", title: "Direct Equity Stocks", returnVal: "~15%+", riskVal: "High", description: "High reward direct ownership." },
    ],
    onContinue: () => logAction("RiskSpectrum: onContinue triggered!"),
  };

  const sliderCalculatorProps = {
    title: "What does this look like for you?",
    onContinue: () => logAction("SliderCalculator: onContinue triggered!"),
  };

  const pillSelectorProps = {
    groups: [
      {
        id: "time",
        label: "TIME HORIZON",
        pills: [
          { id: "short", label: "Short Term" },
          { id: "medium", label: "Medium Term" },
          { id: "long", label: "Long Term" },
        ],
      },
      {
        id: "risk",
        label: "RISK PROFILE",
        pills: [
          { id: "safe", label: "Safe" },
          { id: "balanced", label: "Balanced" },
          { id: "growth", label: "Growth" },
        ],
      },
      {
        id: "amount",
        label: "MONTHLY AMOUNT",
        pills: [
          { id: "low", label: "< 5k" },
          { id: "mid", label: "5k - 15k" },
          { id: "high", label: "> 15k" },
        ],
      },
    ],
    allocations: {
      "medium-balanced-high": {
        equity: 60,
        fd: 30,
        gold: 10,
        note: "Based on your balanced risk profile and long-term outlook, this allocation maximizes growth while maintaining a safety net.",
      },
    },
    onContinue: () => logAction("PillSelector: onContinue triggered!"),
  };

  const chartVisualProps = {
    title: "Wealth Growth Projection",
    subtitle: "Investing ₹15,000 / month for 30 years",
    onContinue: () => logAction("ChartVisual: onContinue triggered!"),
  };

  const quizProps = {
    question: "The Sensex crossed 80,000 in 2024 from a base of 100 in 1979. What CAGR is this?",
    options: [
      { id: "a", letter: "A", text: "~5% per year", isCorrect: false },
      { id: "b", letter: "B", text: "~8% per year", isCorrect: false },
      { id: "c", letter: "C", text: "~12% per year", isCorrect: false },
      { id: "d", letter: "D", text: "~15–16% per year", isCorrect: true },
    ],
    explanation: "Calculated as (80,000 ÷ 100)^(1/45) - 1 ≈ 16%. An FD at 8% would yield significantly less over 45 years.",
    onAnswerSelected: (correct: boolean) =>
      logAction(`Quiz: Answered! Correct? ${correct}`),
    onNext: () => logAction("Quiz: onNext triggered!"),
  };

  const completionProps = {
    badge: "🏆",
    title: "You've mapped the investing landscape.",
    subtitle: "Most people invest without understanding their full range of options. You just changed that.",
    starsEarned: 30,
    learnings: [
      "The 5 main asset classes and their risk/return profiles",
      "Why direct equities historically outperform other traditional assets",
      "How simple asset allocation splits reduce short term volatility",
    ],
    nextModuleTitle: "Module 3: The Stock Market",
    nextModuleDesc: "Now let's pull back the curtain on how trading works...",
    onNextModule: () => logAction("Completion: onNextModule triggered! Routing..."),
    onReplay: () => logAction("Completion: onReplay triggered!"),
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Cards Playground",
          headerStyle: { backgroundColor: COLORS.surface },
          headerTintColor: COLORS.text,
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginRight: 16 }}>
              <Ionicons name="chevron-back" size={24} color={COLORS.text} />
            </Pressable>
          ),
        }}
      />

      {/* Tabs list on top */}
      <View style={styles.tabsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabsScrollContent}>
          {CARD_TYPES.map((t) => {
            const isTabActive = t.id === activeCardId;
            return (
              <Pressable
                key={t.id}
                onPress={() => setActiveCardId(t.id)}
                style={[styles.tabButton, isTabActive ? styles.activeTab : null]}
              >
                <Text style={[styles.tabButtonText, isTabActive ? styles.activeTabText : null]}>
                  {t.id}. {t.name}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>

      {/* Main card view container */}
      <ScrollView contentContainerStyle={styles.cardWrapper} showsVerticalScrollIndicator={false}>
        <View style={styles.cardFrame}>
          {activeCardId === 1 && <CinematicOpenerCard {...cinematicOpenerProps} />}
          {activeCardId === 2 && <StoryScenarioCard {...storyScenarioProps} />}
          {activeCardId === 3 && <ConceptExplainerCard {...conceptExplainerProps} />}
          {activeCardId === 4 && <InteractiveExplorerCard {...interactiveExplorerProps} />}
          {activeCardId === 5 && <RiskSpectrumCard {...riskSpectrumProps} />}
          {activeCardId === 6 && <SliderCalculatorCard {...sliderCalculatorProps} />}
          {activeCardId === 7 && <PillSelectorCard {...pillSelectorProps} />}
          {activeCardId === 8 && <ChartVisualCard {...chartVisualProps} />}
          {activeCardId === 9 && <QuizCard {...quizProps} />}
          {activeCardId === 10 && <CompletionCard {...completionProps} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // Native background
  },
  tabsContainer: {
    backgroundColor: COLORS.surface,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 10,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    backgroundColor: COLORS.surface,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeTab: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabButtonText: {
    color: COLORS.textSecondary,
    fontSize: 12,
    fontWeight: "700",
  },
  activeTabText: {
    color: COLORS.surface,
  },
  cardWrapper: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  cardFrame: {
    width: "100%",
  },
});
