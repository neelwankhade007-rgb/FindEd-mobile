import React, { useState, useCallback, useMemo } from "react";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  StyleSheet,
  Pressable,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";
import { COURSE_CATEGORIES, LIBRARY_COURSES } from "./courseData";

import CoursesHeader from "./components/CoursesHeader";
import SearchBar from "./components/SearchBar";
import CourseCategoryChips from "./components/CourseCategoryChips";
import CourseLibraryCard from "./components/CourseLibraryCard";

export default function CoursesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Filter library courses by category and search query
  const filteredLibrary = useMemo(() => {
    let courses = LIBRARY_COURSES;
    if (selectedCategory !== "All") {
      courses = courses.filter((c) => c.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      courses = courses.filter(
        (c) =>
          c.title.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q)
      );
    }
    return courses;
  }, [selectedCategory, searchQuery]);

  const hasNoResults = filteredLibrary.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <CoursesHeader />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Search Bar */}
        <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

        {/* Category Filter Chips */}
        <CourseCategoryChips
          categories={COURSE_CATEGORIES}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* No Results State */}
        {hasNoResults && (
          <View style={styles.emptyState}>
            <View style={styles.emptyIconWrap}>
              <Ionicons
                name="school-outline"
                size={48}
                color={COLORS.primary}
              />
            </View>
            <Text style={styles.emptyTitle}>No courses found</Text>
            <Text style={styles.emptySubtitle}>
              Try adjusting your search or selecting a different category.
            </Text>
          </View>
        )}

        {/* Course Library Section */}
        {filteredLibrary.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Course Library</Text>
            </View>

            <View style={styles.sectionContent}>
              {filteredLibrary.map((course) => (
                <CourseLibraryCard key={course.id} course={course} />
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  section: {
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  viewAll: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
  sectionContent: {
    paddingHorizontal: 20,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
    paddingHorizontal: 32,
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: COLORS.border,
    backgroundColor: COLORS.surface,
  },
  emptyIconWrap: {
    padding: 16,
    borderRadius: 999,
    backgroundColor: `${COLORS.primary}10`,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 6,
  },
  emptySubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
