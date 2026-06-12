import { COLORS } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Image, View } from "react-native";

export default function Header() {
    return (
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2" style={{ backgroundColor: COLORS.background }}>
            <Image
                source={require("../../../../assets/website/logo.png")} // Relocated relative path: 4 levels up
                style={{ width: 70, height: 70 }}
                resizeMode="contain"
            />

            <Pressable
                className="h-11 w-11 items-center justify-center rounded-2xl border relative"
                style={{
                    backgroundColor: COLORS.surface,
                    borderColor: COLORS.border,
                    shadowColor: "#000",
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.05,
                    shadowRadius: 2,
                    elevation: 2,
                }}
            >
                <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={COLORS.text}
                />
                {/* Blue Notification Dot at top-right */}
                <View 
                    className="absolute w-2.5 h-2.5 rounded-full border border-white"
                    style={{ backgroundColor: COLORS.primary, top: 10, right: 10 }}
                />
            </Pressable>
        </View>
    );
}
