import { router, type Href } from "expo-router";
import { Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { DocumentCard } from "@/components/cards/DocumentCard";
import { DocumentCategoryCard } from "@/components/cards/DocumentCategoryCard";
import { AppScreen } from "@/components/layout/app-screen";
import { AmgTextInput } from "@/components/ui/amg-text-input";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { demoDocuments, documentCategories, getDocumentsForCategory } from "@/features/documents/document.demo";
import type { DocumentCategory } from "@/features/documents/document.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

type DocumentFilter = "all" | DocumentCategory;

export default function DocumentsTab() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<DocumentFilter>("all");
  const [isLoading] = useState(false);
  const [errorMessage] = useState<string | null>(null);

  const filteredDocuments = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return demoDocuments.filter((document) => {
      const matchesCategory = selectedCategory === "all" || document.category === selectedCategory;
      const matchesQuery =
        !normalizedQuery ||
        [
          document.title,
          document.category,
          document.fileType,
          document.relatedAircraftLabel,
          document.relatedRequestDisplayId,
          document.visibilityLabel,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });
  }, [query, selectedCategory]);

  if (isLoading) return <LoadingState message="Loading documents..." />;

  return (
    <AppScreen
      eyebrow="Documents"
      title="Documents"
      description="Approved account documents and support records will appear here after AMG confirms the portal storage mapping."
    >
      {errorMessage ? (
        <ErrorState title="Unable to load documents" message={errorMessage} />
      ) : (
        <>
          <QuietNotice message="Document access is limited to approved account permissions and AMG review context. This MVP does not expose file paths or create public file URLs." />

          <AmgTextInput
            label="Search documents"
            leftIcon={Search}
            onChangeText={setQuery}
            placeholder="Title, category, aircraft, or request"
            value={query}
          />

          <View style={styles.section}>
            <Text selectable style={styles.sectionTitle}>
              Categories
            </Text>
            <View style={styles.categoryGrid}>
              <DocumentCategoryCard
                category="Other"
                count={demoDocuments.length}
                label="All Documents"
                selected={selectedCategory === "all"}
                onPress={() => setSelectedCategory("all")}
              />
              {documentCategories.map((category) => (
                <DocumentCategoryCard
                  key={category}
                  category={category}
                  count={getDocumentsForCategory(category).length}
                  selected={selectedCategory === category}
                  onPress={() => setSelectedCategory(category)}
                />
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <Text selectable style={styles.sectionTitle}>
              Recent Documents
            </Text>
            <View style={styles.list}>
              {filteredDocuments.length ? (
                filteredDocuments.map((document) => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onPress={() => router.push(`/documents/${document.id}` as Href)}
                  />
                ))
              ) : (
                <EmptyState
                  title="No documents available"
                  message="No documents are currently available for this account."
                />
              )}
            </View>
          </View>
        </>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  list: {
    gap: spacing[3],
  },
  section: {
    gap: spacing[3],
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
