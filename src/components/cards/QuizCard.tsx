import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

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
        text: styles.textNormal,
      };
    }

    if (option.isCorrect) {
      return {
        card: styles.optionCorrect,
        badge: styles.badgeCorrect,
        text: styles.textCorrect,
      };
    }

    if (isThisSelected && !option.isCorrect) {
      return {
        card: styles.optionWrong,
        badge: styles.badgeWrong,
        text: styles.textWrong,
      };
    }

    return {
      card: [styles.optionNormal, { opacity: 0.5 }],
      badge: styles.badgeNormal,
      text: styles.textNormal,
    };
  };

  const isCorrectAnswer = options.find((o) => o.id === selectedOptionId)?.isCorrect;

  return (
    <View style={styles.cardContainer}>
      <View>
        {/* Question Area */}
        <View style={styles.questionBox}>
          <View style={styles.questionIndicator} />
          <Text style={styles.questionText}>{question}</Text>
        </View>

        {/* Options grid */}
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
                  <Text style={styles.letterText}>{opt.letter}</Text>
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
    backgroundColor: "#1F2937",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
    minHeight: 500,
    justifyContent: "space-between",
  },
  questionBox: {
    flexDirection: "row",
    backgroundColor: "#111827",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    marginBottom: 20,
    alignItems: "center",
  },
  questionIndicator: {
    width: 4,
    height: "100%",
    backgroundColor: "#3B82F6", // Blue indicator
    borderRadius: 2,
    marginRight: 12,
    alignSelf: "stretch",
  },
  questionText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "750",
    lineHeight: 22,
  },
  optionsList: {
    gap: 10,
    marginBottom: 20,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    borderWidth: 1.5,
  },
  optionNormal: {
    backgroundColor: "#111827",
    borderColor: "#374151",
  },
  optionCorrect: {
    backgroundColor: "rgba(16, 185, 129, 0.08)",
    borderColor: "#10B981", // Green border
  },
  optionWrong: {
    backgroundColor: "rgba(239, 68, 68, 0.08)",
    borderColor: "#EF4444", // Red border
  },
  letterBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  badgeNormal: {
    backgroundColor: "#374151",
  },
  badgeCorrect: {
    backgroundColor: "#10B981",
  },
  badgeWrong: {
    backgroundColor: "#EF4444",
  },
  letterText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "800",
  },
  optionText: {
    flex: 1,
    fontSize: 14,
  },
  textNormal: {
    color: "#D1D5DB",
    fontWeight: "550",
  },
  textCorrect: {
    color: "#10B981",
    fontWeight: "850",
  },
  textWrong: {
    color: "#EF4444",
    fontWeight: "850",
  },
  explanationPanel: {
    backgroundColor: "#111827",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#374151",
    padding: 16,
    marginTop: 8,
  },
  explanationTitle: {
    fontSize: 14,
    fontWeight: "850",
    marginBottom: 6,
  },
  textGreen: {
    color: "#10B981",
  },
  textRed: {
    color: "#EF4444",
  },
  explanationText: {
    color: "#9CA3AF",
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
    color: "#FBBF24", // Gold stars text
    fontSize: 11,
    fontWeight: "800",
  },
  nextButton: {
    backgroundColor: "#4F46E5",
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  nextText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "750",
  },
});
