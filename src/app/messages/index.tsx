import { Redirect, router, type Href } from "expo-router";
import { StyleSheet, View } from "react-native";

import { MessageThreadItem } from "@/components/lists/MessageThreadItem";
import { AppScreen } from "@/components/layout/app-screen";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { demoMessageThreads } from "@/features/messages/message.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { spacing } from "@/lib/theme/spacing";

export default function MessagesScreen() {
  const auth = useAuth();
  const isLoading = false;
  const errorMessage: string | null = null;

  if (auth.isLoading || isLoading) return <LoadingState message="Loading messages..." />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  return (
    <AppScreen
      eyebrow="Messages"
      title="Messages"
      description="Updates from AMG Operations will appear here when available."
    >
      {errorMessage ? (
        <ErrorState title="Unable to load messages" message={errorMessage} />
      ) : (
        <>
          <QuietNotice message="Messaging is read-only in this MVP until AMG confirms the portal thread model, send workflow, and RLS behavior." />
          <View style={styles.list}>
            {demoMessageThreads.length ? (
              demoMessageThreads.map((thread) => (
                <MessageThreadItem
                  key={thread.id}
                  thread={thread}
                  onPress={() => router.push(`/messages/${thread.id}` as Href)}
                />
              ))
            ) : (
              <EmptyState
                title="No messages yet"
                message="No messages yet. Updates from AMG Operations will appear here when available."
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
