import { Redirect, router, useLocalSearchParams } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { useMemo } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { AppScreen } from "@/components/layout/app-screen";
import { MessageBubble } from "@/components/messages/MessageBubble";
import { AmgButton } from "@/components/ui/amg-button";
import { ErrorState } from "@/components/ui/error-state";
import { InfoCard } from "@/components/ui/info-card";
import { LoadingState } from "@/components/ui/loading-state";
import { QuietNotice } from "@/components/ui/QuietNotice";
import { useAuth } from "@/features/auth/useAuth";
import { getDemoMessageThreadById } from "@/features/messages/message.demo";
import { canEnterAppTabs, getRouteForAuthState } from "@/lib/auth/route-guards";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export default function MessageThreadScreen() {
  const auth = useAuth();
  const params = useLocalSearchParams<{ threadId?: string }>();
  const threadId = Array.isArray(params.threadId) ? params.threadId[0] : params.threadId;
  const thread = useMemo(() => (threadId ? getDemoMessageThreadById(threadId) : null), [threadId]);

  if (auth.isLoading) return <LoadingState />;
  if (!canEnterAppTabs(auth)) return <Redirect href={getRouteForAuthState(auth)} />;

  if (!thread) {
    return (
      <AppScreen eyebrow="Messages" title="Message thread not found">
        <BackButton />
        <ErrorState
          title="Unable to open thread"
          message="This message thread is not available in local demo data. Real message access requires confirmed backend mapping and RLS scope."
        />
      </AppScreen>
    );
  }

  return (
    <AppScreen eyebrow="Message Thread" title={thread.title} description={thread.lastMessagePreview}>
      <BackButton />

      <InfoCard>
        <SectionTitle title="Thread Context" />
        <DetailGrid
          rows={[
            ["Related request", thread.relatedRequestDisplayId ?? "Not linked"],
            ["Aircraft", thread.aircraftLabel ?? "Not linked"],
            ["Sender", thread.senderContext],
          ]}
        />
      </InfoCard>

      <View style={styles.messages}>
        {thread.messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </View>

      <InfoCard>
        <SectionTitle title="Reply" />
        <Text selectable style={styles.bodyCopy}>
          Reply composer is disabled until AMG confirms the safe messaging backend and send permissions.
        </Text>
        <AmgButton disabled label="Reply" />
      </InfoCard>

      <QuietNotice message="This demo thread does not expose cross-user messages or internal admin-only notes." />
    </AppScreen>
  );
}

function BackButton() {
  return (
    <Pressable accessibilityLabel="Go back" accessibilityRole="button" onPress={() => router.back()} style={styles.back}>
      <ArrowLeft color={colors.amg.lightGray} size={18} />
      <Text selectable={false} style={styles.backLabel}>
        Back
      </Text>
    </Pressable>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <Text selectable style={styles.sectionTitle}>
      {title}
    </Text>
  );
}

function DetailGrid({ rows }: { rows: [string, string][] }) {
  return (
    <View style={styles.detailGrid}>
      {rows.map(([label, value]) => (
        <View key={label} style={styles.detailRow}>
          <Text selectable style={styles.detailLabel}>
            {label}
          </Text>
          <Text selectable style={styles.detailValue}>
            {value}
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  back: {
    alignItems: "center",
    alignSelf: "flex-start",
    flexDirection: "row",
    gap: spacing[2],
    minHeight: 44,
  },
  backLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    fontWeight: "700",
  },
  bodyCopy: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  detailGrid: {
    gap: spacing[3],
  },
  detailLabel: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  detailRow: {
    gap: spacing[1],
  },
  detailValue: {
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    lineHeight: 22,
  },
  messages: {
    gap: spacing[3],
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
});
