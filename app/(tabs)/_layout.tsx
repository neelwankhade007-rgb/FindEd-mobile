import { Tabs } from "expo-router";
import {
    Entypo,
    MaterialIcons,
    FontAwesome5,
    Ionicons,
} from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";

export default function TabLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.inactive,

                tabBarStyle: {
                    backgroundColor: COLORS.surface,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.border,

                    height: 64 + insets.bottom,
                    paddingBottom: Math.max(insets.bottom, 8),
                    paddingTop: 8,
                },

                tabBarLabelStyle: {
                    fontSize: 11,
                    fontWeight: "500",
                },
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color }) => (
                        <Entypo name="home" size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="courses"
                options={{
                    title: "Courses",
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="menu-book" size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="articles"
                options={{
                    title: "Articles",
                    tabBarIcon: ({ color }) => (
                        <Ionicons name="document-text" size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="tools"
                options={{
                    title: "Tools",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="wrench" size={22} color={color} />
                    ),
                }}
            />

            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user" size={22} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
