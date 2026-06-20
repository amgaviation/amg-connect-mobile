import { Redirect, router, type Href } from "expo-router";
import { StyleSheet, View } from "react-native";

import { QuoteInvoiceCard } from "@/components/cards/QuoteInvoiceCard";
import { AppScreen } from "@/components/layout/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { demoQuotes } from "@/features/quotes/quote.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { spacing } from "@/lib/theme/spacing";

export default function QuotesScreen() {
  const auth = useAuth();
  const isLoading = false;
  const errorMessage: string | null = null;

  if (auth.isLoading || isLoading) return <LoadingState message="Loading quotes..." />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  return (
    <AppScreen
      eyebrow="Quotes"
      title="Quotes"
      description="Quotes connected to your support activity will appear here when available."
    >
      {errorMessage ? (
        <ErrorState title="Unable to load quotes" message={errorMessage} />
      ) : (
        <>
          <QuietNotice message="Quote review and approval actions are read-only until AMG confirms the portal quote workflow and safe backend route." />
          <View style={styles.list}>
            {demoQuotes.length ? (
              demoQuotes.map((quote) => (
                <QuoteInvoiceCard
                  key={quote.id}
                  item={quote}
                  kind="quote"
                  onPress={() => router.push(`/quotes/${quote.id}` as Href)}
                />
              ))
            ) : (
              <EmptyState
                title="No quotes available"
                message="Quotes connected to your support activity will appear here when available."
              />
            )}
          </View>
        </>
      )}
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing[3],
  },
});
