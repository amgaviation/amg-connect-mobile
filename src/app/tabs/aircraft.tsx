import { router, type Href } from "expo-router";
import { Search } from "lucide-react-native";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { AircraftCard } from "@/components/cards/AircraftCard";
import { AppScreen } from "@/components/layout/app-screen";
import { AmgButton } from "@/components/ui/amg-button";
import { AmgTextInput } from "@/components/ui/amg-text-input";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { demoAircraft } from "@/features/aircraft/aircraft.demo";
import { spacing } from "@/lib/theme/spacing";

export default function AircraftTab() {
  const [query, setQuery] = useState("");
  const [isLoading] = useState(false);
  const [errorMessage] = useState<string | null>(null);

  const filteredAircraft = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return demoAircraft.filter((aircraft) => {
      if (!normalizedQuery) return true;

      return [aircraft.makeModel, aircraft.tailNumber, aircraft.baseAirport, aircraft.category, aircraft.latestActivity]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);
    });
  }, [query]);

  if (isLoading) return <LoadingState message="Loading aircraft..." />;

  return (
    <AppScreen
      eyebrow="Aircraft"
      title="Aircraft"
      description="Aircraft connected to this account will appear here after AMG confirms the portal aircraft data mapping and client scope."
    >
      {errorMessage ? (
        <ErrorState title="Unable to load aircraft" message={errorMessage} />
      ) : (
        <>
          <AmgTextInput
            label="Search aircraft"
            leftIcon={Search}
            onChangeText={setQuery}
            placeholder="Tail number, model, base, or activity"
            value={query}
          />

          <View style={styles.list}>
            {filteredAircraft.length ? (
              filteredAircraft.map((aircraft) => (
                <AircraftCard
                  key={aircraft.id}
                  aircraft={aircraft}
                  onPress={() => router.push(`/aircraft/${aircraft.id}` as Href)}
                />
              ))
            ) : (
              <EmptyState
                title="No aircraft found"
                message="No aircraft match the current search. Aircraft visibility must come from the shared AMG Supabase backend and approved account scope."
                action={<AmgButton label="Clear Search" variant="secondary" onPress={() => setQuery("")} />}
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
