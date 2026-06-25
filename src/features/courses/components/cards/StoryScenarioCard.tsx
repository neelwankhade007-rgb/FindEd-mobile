import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

export interface ScenarioCharacter {
  id: string;
  emoji: string;
  name: string;
  choice: string;
  result: string;
  isWinner?: boolean;
  gainPercent?: string;
}

export interface ScenarioOption {
  id: string;
  text: string;
}

interface StoryScenarioCardProps {
  characters: ScenarioCharacter[];
  question: string;
  options: ScenarioOption[];
  onRespond: (optionId: string) => void;
}

export default function StoryScenarioCard({
  characters,
  question,
  options,
  onRespond,
}: StoryScenarioCardProps) {
  return (
    <View style={styles.cardContainer}>
      {/* Grid of Friends/Comparison */}
      <View style={styles.friendsGrid}>
        {characters.map((char) => (
          <View
            key={char.id}
            style={[
              styles.friendCard,
              char.isWinner ? styles.winnerFriendCard : null,
            ]}
          >
            {char.isWinner ? (
              <View style={styles.winnerBadge}>
                <Text style={styles.winnerBadgeText}>WINNER</Text>
              </View>
            ) : null}

            <Text style={styles.friendEmoji}>{char.emoji}</Text>
            <Text style={styles.friendName}>{char.name}</Text>
            <Text style={styles.friendChoice} numberOfLines={1}>
              {char.choice}
            </Text>
            <Text
              style={[
                styles.friendResult,
                char.isWinner ? styles.winnerResultText : null,
              ]}
            >
              {char.result}
            </Text>
            {char.gainPercent ? (
              <Text style={styles.friendGain}>{char.gainPercent}</Text>
            ) : null}
          </View>
        ))}
      </View>

      {/* Response Section */}
      <Text style={styles.questionText}>{question}</Text>
      <View style={styles.optionsContainer}>
        {options.map((opt) => (
          <Pressable
            key={opt.id}
            onPress={() => onRespond(opt.id)}
            style={({ pressed }) => [
              styles.respondButton,
              { opacity: pressed ? 0.9 : 1 },
            ]}
          >
            <Text style={styles.respondButtonText}>{opt.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: "#1F2937", // Card Dark Surface
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#374151",
    minHeight: 420,
    justifyContent: "space-between",
  },
  friendsGrid: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 24,
  },
  friendCard: {
    flex: 1,
    backgroundColor: "#111827", // Darker inside card
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#374151",
    position: "relative",
  },
  winnerFriendCard: {
    borderColor: "#10B981", // Emerald border
    borderWidth: 1.5,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
  },
  winnerBadge: {
    position: "absolute",
    top: -8,
    backgroundColor: "#10B981",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  winnerBadgeText: {
    color: "#FFFFFF",
    fontSize: 8,
    fontWeight: "900",
    letterSpacing: 0.5,
  },
  friendEmoji: {
    fontSize: 28,
    marginBottom: 6,
  },
  friendName: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "750",
    marginBottom: 2,
  },
  friendChoice: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "550",
    marginBottom: 10,
    textAlign: "center",
  },
  friendResult: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  winnerResultText: {
    color: "#10B981", // Winner result green
  },
  friendGain: {
    color: "#9CA3AF",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 2,
  },
  questionText: {
    color: "#F3F4F6",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 22,
  },
  optionsContainer: {
    gap: 10,
  },
  respondButton: {
    backgroundColor: "#2D3748",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#4A5568",
    alignItems: "flex-start",
  },
  respondButtonText: {
    color: "#F3F4F6",
    fontSize: 14,
    fontWeight: "600",
  },
});
