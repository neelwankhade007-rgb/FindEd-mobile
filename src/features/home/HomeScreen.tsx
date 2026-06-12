import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "@/constants/colors";
import Header from "./components/Header";
import ProfileCard from "./components/ProfileCard";
import ContinueLearningCard from "./components/ContinueLearningCard";
import FeaturedCard from "./components/FeaturedCard";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
      <ScrollView 
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 12, paddingBottom: 40 }} 
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-col gap-4 w-full">
          <ProfileCard />
          <FeaturedCard />
          <ContinueLearningCard />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
