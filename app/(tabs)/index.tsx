import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/header";
import { COLORS } from "@/constants/colors";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <Header />
    </SafeAreaView>
  );
}