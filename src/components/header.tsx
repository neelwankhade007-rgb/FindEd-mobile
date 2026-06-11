import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export default function Header() {
    return (
        <View className="flex-row items-center justify-between px-6 pt-4">
            <Text
                className="text-3xl font-extrabold"
                style={{ color: COLORS.primary }}
            >
                FinEd App
            </Text>

            <View className="flex-row items-center gap-3">
                <Pressable
                    className="h-12 w-12 items-center justify-center rounded-full border"
                    style={{
                        backgroundColor: COLORS.surface,
                        borderColor: COLORS.border,
                    }}
                >
                    <Ionicons
                        name="notifications-outline"
                        size={22}
                        color={COLORS.text}
                    />
                </Pressable>

                <Pressable
                    className="h-12 w-12 items-center justify-center rounded-full"
                    style={{ backgroundColor: COLORS.accent }}
                >
                    <Text
                        className="font-bold"
                        style={{ color: COLORS.text }}
                    >
                        N
                    </Text>
                </Pressable>
            </View>
        </View>
    );
}
