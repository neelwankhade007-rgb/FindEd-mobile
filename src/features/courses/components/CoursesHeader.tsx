import React from "react";
import { View, Pressable, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface CoursesHeaderProps {
  onNotificationPress?: () => void;
}

export default function CoursesHeader({
  onNotificationPress,
}: CoursesHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../../assets/website/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Pressable
        onPress={onNotificationPress}
        style={({ pressed }) => [
          styles.notificationButton,
          {
            backgroundColor: pressed ? "#EAEAEA" : "transparent",
          },
        ]}
      >
        <Ionicons
          name="notifications-outline"
          size={22}
          color={COLORS.text}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
    backgroundColor: COLORS.background,
  },
  logo: {
    width: 48,
    height: 48,
  },
  notificationButton: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
});
