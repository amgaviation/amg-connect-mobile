import { Redirect, router, type Href } from "expo-router";
import { StyleSheet, View } from "react-native";

import { QuoteInvoiceCard } from "@/components/cards/QuoteInvoiceCard";
import { AppScreen } from "@/components/layout/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { demoInvoices } from "@/features/invoices/invoice.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { spacing } from "@/lib/theme/spacing";

export default function InvoicesScreen() {
  const auth = useAuth();
  const isLoading = false;
  const errorMessage: string | null = null;

  if (auth.isLoading || isLoading) return <LoadingState message="Loading invoices..." />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  return (
    <AppScreen
      eyebrow="Invoices"
      title="Invoices"
      description="Invoices and receipts will appear here when available."
    >
      {errorMessage ? (
        <ErrorState title="Unable to load invoices" message={errorMessage} />
      ) : (
        <>
          <QuietNotice message="Payment details are managed through AMG-approved invoice instructions. This MVP does not collect card data or process payments." />
          <View style={styles.list}>
            {demoInvoices.length ? (
              demoInvoices.map((invoice) => (
                <QuoteInvoiceCard
                  key={invoice.id}
                  item={invoice}
                  kind="invoice"
                  onPress={() => router.push(`/invoices/${invoice.id}` as Href)}
                />
              ))
            ) : (
              <EmptyState title="No invoices available" message="Invoices and receipts will appear here when available." />
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
