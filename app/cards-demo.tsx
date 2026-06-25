import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from "react-native";
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
} from "@/components/cards";

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
  const [callbackLog, setCallbackLog] = useState<string>("Interactive callbacks will appear here...");

  const logAction = (msg: string) => {
    const time = new Date().toLocaleTimeString();
    setCallbackLog(`[${time}] ${msg}`);
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
    characters: [
      { id: "1", emoji: "🏦", name: "Sunita", choice: "Fixed Deposit", result: "₹4.7L", gainPercent: "7% return" },
      { id: "2", emoji: "🪙", name: "Vikram", choice: "Gold", result: "₹6.7L", gainPercent: "9% return" },
      { id: "3", emoji: "📈", name: "Deepika", choice: "Equity", result: "₹9.6L", gainPercent: "12% return", isWinner: true },
    ],
    question: "Which would you have chosen before seeing the outcomes?",
    options: [
      { id: "fd", text: "🏦 FD — I like certainty" },
      { id: "gold", text: "🪙 Gold — feels safe" },
      { id: "eq", text: "📈 Stocks — give me the upside" },
    ],
    onRespond: (id: string) => logAction(`StoryScenario: onRespond with choice: "${id}"`),
  };

  const conceptExplainerProps = {
    moduleLabel: "Module 2 · Card 3",
    title: "The company is sharing profits with you.",
    bodyParts: [
      { type: "text", content: "A " },
      { type: "jargon", content: "dividend", def: "A portion of a company's profit paid to shareholders.", example: "Infosys paid ₹42/share dividend in FY2023." },
      { type: "text", content: " is cash a company pays from its profits. The amount and timeline depend on dates registered with " },
      { type: "jargon", content: "BSE India", def: "Bombay Stock Exchange, one of Asia's oldest stock exchanges.", example: "Over 5000+ companies are listed on BSE." },
      { type: "text", content: "." },
    ] as any[],
    highlightQuote: "Buy before the ex-dividend date or you miss it.",
    footnote: "Data source: BSE India files.",
    onContinue: () => logAction("ConceptExplainer: onContinue triggered!"),
  };

  const interactiveExplorerProps = {
    tiles: [
      { id: "fd", icon: "🏦", name: "Fixed Deposits", subtitle: "Safe" },
      { id: "gold", icon: "🪙", name: "Gold", subtitle: "Steady" },
      { id: "equity", icon: "📈", name: "Equities", subtitle: "Growth" },
      { id: "mf", icon: "🧺", name: "Mutual Funds", subtitle: "Managed" },
    ],
    detailsData: {
      fd: { returnVal: "~7%", returnLevel: "low", riskVal: "Low", riskLevel: "low", liquidityVal: "High", liquidityLevel: "high", description: "Fixed deposits are bank-backed contracts.", bestFor: "Short-term capital protection." },
      gold: { returnVal: "~9%", returnLevel: "mid", riskVal: "Low-Mid", riskLevel: "mid", liquidityVal: "Very High", liquidityLevel: "high", description: "Gold acts as a safe-haven asset.", bestFor: "Long-term buffer against crashes." },
      equity: { returnVal: "~15%", returnLevel: "high", riskVal: "High", riskLevel: "high", liquidityVal: "Very High", liquidityLevel: "high", description: "Owning stock grants you direct business shares.", bestFor: "Creating generational compound growth." },
      mf: { returnVal: "~12%", returnLevel: "high", riskVal: "Medium", riskLevel: "mid", liquidityVal: "High", liquidityLevel: "high", description: "Managed pool investing across multiple assets.", bestFor: "Hands-off SIP wealth accumulation." },
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
    title: "See compounding in action.",
    minVal: 1,
    maxVal: 40,
    defaultVal: 10,
    calcFormula: (years: number) => {
      const p = 10000;
      const rate = 0.12;
      const total = Math.round(p * Math.pow(1 + rate, years));
      const gains = total - p;
      return {
        outputVal: `₹${total.toLocaleString("en-IN")}`,
        contribution: p,
        gains: gains,
        contributionFormatted: `₹${p.toLocaleString("en-IN")}`,
        gainsFormatted: `₹${gains.toLocaleString("en-IN")}`,
      };
    },
    onContinue: () => logAction("SliderCalculator: onContinue triggered!"),
  };

  const pillSelectorProps = {
    groups: [
      {
        id: "age",
        label: "Your age bracket",
        pills: [
          { id: "young", label: "Under 30" },
          { id: "mid", label: "30–45" },
        ],
      },
      {
        id: "risk",
        label: "Your risk preference",
        pills: [
          { id: "high", label: "Aggressive" },
          { id: "low", label: "Conservative" },
        ],
      },
    ],
    allocations: {
      "young-high": { equity: 80, fd: 10, gold: 10, note: "Young aggressive: high equity exposure for long-term growth." },
      "young-low": { equity: 30, fd: 50, gold: 20, note: "Young conservative: high safe income split to hedge volatility." },
      "mid-high": { equity: 65, fd: 20, gold: 15, note: "Mid-age aggressive: balanced equity focus with milestone cushions." },
      "mid-low": { equity: 20, fd: 60, gold: 20, note: "Mid-age conservative: prioritized income safety and inflation buffer." },
    },
    onContinue: () => logAction("PillSelector: onContinue triggered!"),
  };

  const chartVisualProps = {
    title: "25 Years of Real Data",
    years: ["1999", "2004", "2009", "2014", "2019", "2024"],
    datasets: [
      { label: "Equities (~12%/yr)", color: "#10B981", data: [100000, 176234, 310584, 547356, 964629, 1700000] },
      { label: "Gold (~9%/yr)", color: "#FBBF24", data: [100000, 153862, 236736, 364248, 560441, 862000] },
      { label: "FD (~7%/yr)", color: "#3B82F6", data: [100000, 140255, 196715, 275903, 386968, 542000], isDashed: true },
    ],
    statChips: [
      { value: "₹5.4L", label: "🏦 FD at ~7%", color: "#3B82F6" },
      { value: "₹8.6L", label: "🪙 Gold at ~9%", color: "#FBBF24" },
      { value: "₹17.0L", label: "📈 Equities at ~12%", color: "#10B981", isHighlighted: true },
    ],
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
          headerStyle: { backgroundColor: "#111827" },
          headerTintColor: "#FFFFFF",
          headerLeft: () => (
            <Pressable onPress={() => router.back()} style={{ marginRight: 16 }}>
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
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

        {/* Callback log panel */}
        <View style={styles.logPanel}>
          <View style={styles.logHeader}>
            <Ionicons name="terminal" size={14} color="#10B981" />
            <Text style={styles.logTitle}>CALLBACK EVENTS LOG</Text>
          </View>
          <Text style={styles.logContent}>{callbackLog}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#0B0F19", // Dark dark background
  },
  tabsContainer: {
    backgroundColor: "#111827",
    borderBottomWidth: 1,
    borderColor: "#1F2937",
    paddingVertical: 10,
  },
  tabsScrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tabButton: {
    backgroundColor: "#1F2937",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#374151",
  },
  activeTab: {
    backgroundColor: "#4F46E5",
    borderColor: "#6366F1",
  },
  tabButtonText: {
    color: "#9CA3AF",
    fontSize: 12,
    fontWeight: "700",
  },
  activeTabText: {
    color: "#FFFFFF",
  },
  cardWrapper: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  cardFrame: {
    width: "100%",
  },
  logPanel: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#1F2937",
    padding: 14,
  },
  logHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#1F2937",
    paddingBottom: 4,
  },
  logTitle: {
    color: "#10B981", // green terminal title
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 1,
  },
  logContent: {
    color: "#D1D5DB",
    fontSize: 12,
    fontFamily: "System",
  },
});
