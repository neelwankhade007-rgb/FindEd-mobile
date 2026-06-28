import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

export interface QuizOption {
  id: string;
  letter: string; // e.g. "A", "B", "C", "D"
  text: string;
  isCorrect: boolean;
}

interface QuizCardProps {
  question: string;
  options: QuizOption[];
  explanation: string;
  onAnswerSelected?: (isCorrect: boolean) => void;
  onNext: () => void;
}

export default function QuizCard({
  question,
  options,
  explanation,
  onAnswerSelected,
  onNext,
}: QuizCardProps) {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  
  // Explanation panel animation values
  const expOpacity = useSharedValue(0);
  const expTranslateY = useSharedValue(15);

  const handleOptionSelect = (option: QuizOption) => {
    if (selectedOptionId !== null) return; // Answer locked
    setSelectedOptionId(option.id);
    onAnswerSelected?.(option.isCorrect);

    // Trigger explanation animation
    expOpacity.value = withSpring(1);
    expTranslateY.value = withSpring(0, { damping: 14 });
  };

  const animatedExplanationStyle = useAnimatedStyle(() => ({
    opacity: expOpacity.value,
    transform: [{ translateY: expTranslateY.value }],
  }));

  const getOptionStyle = (option: QuizOption) => {
    const isThisSelected = option.id === selectedOptionId;
    const hasAnswered = selectedOptionId !== null;

    if (!hasAnswered) {
      return {
        card: styles.optionNormal,
        badge: styles.badgeNormal,
        badgeText: styles.badgeTextNormal,
        text: styles.textNormal,
      };
    }

    if (option.isCorrect) {
      return {
        card: styles.optionCorrect,
        badge: styles.badgeCorrect,
        badgeText: styles.badgeTextCorrect,
        text: styles.textCorrect,
      };
    }

    if (isThisSelected && !option.isCorrect) {
      return {
        card: styles.optionWrong,
        badge: styles.badgeWrong,
        badgeText: styles.badgeTextWrong,
        text: styles.textWrong,
      };
    }

    return {
      card: [styles.optionNormal, { opacity: 0.5 }],
      badge: styles.badgeNormal,
      badgeText: styles.badgeTextNormal,
      text: styles.textNormal,
    };
  };

  const isCorrectAnswer = options.find((o) => o.id === selectedOptionId)?.isCorrect;

  return (
    <View style={styles.cardContainer}>
      <View>
        {/* Concept Check Badge */}
        <View style={styles.conceptCheckBadge}>
          <Ionicons name="bulb-outline" size={14} color="#6366F1" />
          <Text style={styles.conceptCheckText}>Concept Check</Text>
        </View>

        {/* Question Header */}
        <Text style={styles.questionText}>{question}</Text>

        {/* Options List */}
        <View style={styles.optionsList}>
          {options.map((opt) => {
            const stylesObj = getOptionStyle(opt);
            return (
              <Pressable
                key={opt.id}
                onPress={() => handleOptionSelect(opt)}
                disabled={selectedOptionId !== null}
                style={({ pressed }) => [
                  styles.optionButton,
                  stylesObj.card,
                  pressed && selectedOptionId === null ? { opacity: 0.95 } : null,
                ]}
              >
                <View style={[styles.letterBadge, stylesObj.badge]}>
                  <Text style={[styles.letterText, stylesObj.badgeText]}>{opt.letter}</Text>
                </View>
                <Text style={[styles.optionText, stylesObj.text]}>
                  {opt.text}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {/* Explanation Area */}
        {selectedOptionId !== null && (
          <Animated.View
            style={[styles.explanationPanel, animatedExplanationStyle]}
          >
            <Text
              style={[
                styles.explanationTitle,
                isCorrectAnswer ? styles.textGreen : styles.textRed,
              ]}
            >
              {isCorrectAnswer ? "✅ Correct Answer" : "❌ Incorrect"}
            </Text>
            <Text style={styles.explanationText}>{explanation}</Text>
            
            <View style={styles.starsRewardBox}>
              <Text style={styles.starsRewardText}>
                ⭐ {isCorrectAnswer ? "+10 FinStars" : "+5 Attempt Stars"}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>

      {/* Next Button — visible only after select */}
      {selectedOptionId !== null && (
        <Pressable
          onPress={onNext}
          style={({ pressed }) => [
            styles.nextButton,
            { opacity: pressed ? 0.9 : 1, marginTop: 20 },
          ]}
        >
          <Text style={styles.nextText}>Wrap up this module →</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: COLORS.surface, // Solid white card surface
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    minHeight: 500,
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 4,
  },
  conceptCheckBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#EEF2FF", // Soft indigo background
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 6,
    marginBottom: 16,
  },
  conceptCheckText: {
    color: "#6366F1", // Indigo text
    fontSize: 12,
    fontWeight: "700",
  },
  questionText: {
    color: "#111827", // Navy/slate text
    fontSize: 17,
    fontWeight: "800",
    lineHeight: 24,
    marginBottom: 24,
  },
  optionsList: {
    gap: 12,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 4,
    elevation: 1,
  },
  optionNormal: {
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E7EB",
  },
  optionCorrect: {
    backgroundColor: "#ECFDF5",
    borderColor: "#10B981", // Green border
  },
  optionWrong: {
    backgroundColor: "#FEF2F2",
    borderColor: "#EF4444", // Red border
  },
  letterBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  badgeNormal: {
    backgroundColor: "#F3F4F6", // Light gray badge background
  },
  badgeCorrect: {
    backgroundColor: "#10B981",
  },
  badgeWrong: {
    backgroundColor: "#EF4444",
  },
  letterText: {
    fontSize: 13,
    fontWeight: "800",
  },
  badgeTextNormal: {
    color: "#4B5563",
  },
  badgeTextCorrect: {
    color: "#FFFFFF",
  },
  badgeTextWrong: {
    color: "#FFFFFF",
  },
  optionText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  textNormal: {
    color: "#374151", // Charcoal text
    fontWeight: "600",
  },
  textCorrect: {
    color: "#065F46", // Dark green text
    fontWeight: "700",
  },
  textWrong: {
    color: "#991B1B", // Dark red text
    fontWeight: "700",
  },
  explanationPanel: {
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    padding: 16,
    marginTop: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: "800",
    marginBottom: 6,
  },
  textGreen: {
    color: "#10B981",
  },
  textRed: {
    color: "#EF4444",
  },
  explanationText: {
    color: "#4B5563",
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "500",
    marginBottom: 12,
  },
  starsRewardBox: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(251, 191, 36, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  starsRewardText: {
    color: COLORS.accent, // Gold stars text
    fontSize: 11,
    fontWeight: "800",
  },
  nextButton: {
    backgroundColor: COLORS.accent, // Yellow accent color from COLORS
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: COLORS.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 3,
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});
