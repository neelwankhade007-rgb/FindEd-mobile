import React, { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "@/constants/colors";
import { MOCK_ARTICLES, CATEGORIES } from "./articleData";
import ArticlesHeader from "./components/ArticlesHeader";
import FeaturedArticleCard from "./components/FeaturedArticleCard";
import CategoryChips from "./components/CategoryChips";
import ArticleListItem from "./components/ArticleListItem";

export default function ArticlesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [refreshing, setRefreshing] = useState<boolean>(false);

  // Pull-to-refresh placeholder
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  // Separate the featured article
  const featuredArticle = MOCK_ARTICLES.find((article) => article.isFeatured);

  // Filter latest articles: exclude featured, then filter by category if needed
  const latestArticles = MOCK_ARTICLES.filter(
    (article) => article.id !== featuredArticle?.id
  ).filter(
    (article) => selectedCategory === "All" || article.category === selectedCategory
  );

  const handleArticlePress = (articleId: string) => {
    router.push({
      pathname: "/article-detail",
      params: { id: articleId },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ArticlesHeader />

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
        {/* Featured Article - Only show when "All" category is selected or when it matches the category */}
        {featuredArticle && (selectedCategory === "All" || featuredArticle.category === selectedCategory) && (
          <View className="px-5">
            <Text className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: COLORS.textSecondary }}>
              Featured Article
            </Text>
            <FeaturedArticleCard
              article={featuredArticle}
              onPress={() => handleArticlePress(featuredArticle.id)}
            />
          </View>
        )}

        {/* Category Filter Chips */}
        <View>
          <Text className="text-xs font-bold uppercase tracking-wider px-5 mb-1" style={{ color: COLORS.textSecondary }}>
            Explore Categories
          </Text>
          <CategoryChips
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </View>

        {/* Latest Articles List */}
        <View className="px-5 pt-2 flex-1">
          <Text className="text-xs font-bold uppercase tracking-wider mb-3.5" style={{ color: COLORS.textSecondary }}>
            Latest Articles
          </Text>

          {latestArticles.length > 0 ? (
            latestArticles.map((article) => (
              <ArticleListItem
                key={article.id}
                article={article}
                onPress={() => handleArticlePress(article.id)}
              />
            ))
          ) : (
            <View className="items-center justify-center py-12 px-6 rounded-[28px] border border-dashed" style={{ borderColor: COLORS.border, backgroundColor: COLORS.surface }}>
              <View className="p-4 rounded-full mb-3" style={{ backgroundColor: `${COLORS.primary}10` }}>
                <Ionicons name="document-text-outline" size={48} color={COLORS.primary} />
              </View>
              <Text className="text-lg font-extrabold mb-1" style={{ color: COLORS.text }}>
                No articles found
              </Text>
              <Text className="text-sm text-center" style={{ color: COLORS.textSecondary }}>
                Try selecting a different category from the filters above.
              </Text>
            </View>
          )}
        </View>
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
});
