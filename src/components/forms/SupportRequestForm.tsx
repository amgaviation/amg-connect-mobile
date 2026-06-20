import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import { AmgButton } from "@/components/ui/amg-button";
import { AmgTextInput } from "@/components/ui/amg-text-input";
import { InfoCard } from "@/components/ui/info-card";
import type { AircraftSummary } from "@/features/aircraft/aircraft.types";
import {
  hasValidationErrors,
  normalizeAirportCode,
  validateSupportRequestDraft,
} from "@/features/requests/request.mappers";
import type {
  SupportRequestDraft,
  SupportRequestValidationErrors,
  SupportType,
} from "@/features/requests/request.types";
import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

const supportTypeOptions: SupportType[] = [
  "Aircraft Support",
  "Crew Coordination",
  "Ferry / Repositioning",
  "Maintenance Movement Support",
  "Flight Operations Coordination",
  "Plan Review",
];

const contactOptions: SupportRequestDraft["contactPreference"][] = ["Portal message", "Email", "Phone"];

type SupportRequestFormProps = {
  aircraftOptions: AircraftSummary[];
  initialAircraftId?: string;
};

export function SupportRequestForm({ aircraftOptions, initialAircraftId }: SupportRequestFormProps) {
  const initialAircraft = aircraftOptions.find((aircraft) => aircraft.id === initialAircraftId);
  const [draft, setDraft] = useState<SupportRequestDraft>(() => ({
    aircraftId: initialAircraft?.id,
    contactPreference: "Portal message",
    crewNeeds: "",
    fromAirport: "",
    location: "",
    maintenanceMovement: false,
    notes: "",
    requestedDate: "",
    requestedTime: "",
    supportType: undefined,
    tailNumber: initialAircraft?.tailNumber ?? "",
    timingFlexibility: "",
    toAirport: "",
  }));
  const [errors, setErrors] = useState<SupportRequestValidationErrors>({});
  const [reviewed, setReviewed] = useState(false);

  const selectedAircraft = useMemo(
    () => aircraftOptions.find((aircraft) => aircraft.id === draft.aircraftId),
    [aircraftOptions, draft.aircraftId],
  );

  function updateDraft(update: Partial<SupportRequestDraft>) {
    setReviewed(false);
    setDraft((current) => ({
      ...current,
      ...update,
    }));
  }

  function handleReview() {
    const nextErrors = validateSupportRequestDraft(draft);
    setErrors(nextErrors);
    setReviewed(!hasValidationErrors(nextErrors));
  }

  return (
    <View style={styles.form}>
      <InfoCard>
        <View style={styles.sectionHeader}>
          <Text selectable style={styles.sectionTitle}>
            Support Type
          </Text>
          <Text selectable style={styles.sectionDescription}>
            Choose the AMG support area. This does not create an operational acceptance.
          </Text>
        </View>
        <View style={styles.optionGrid}>
          {supportTypeOptions.map((supportType) => (
            <SelectableChip
              key={supportType}
              label={supportType}
              selected={draft.supportType === supportType}
              onPress={() => updateDraft({ supportType })}
            />
          ))}
        </View>
        {errors.supportType ? <FieldError message={errors.supportType} /> : null}
      </InfoCard>

      <InfoCard>
        <View style={styles.sectionHeader}>
          <Text selectable style={styles.sectionTitle}>
            Aircraft
          </Text>
          <Text selectable style={styles.sectionDescription}>
            Select an aircraft connected to this demo workspace or enter a tail number manually.
          </Text>
        </View>
        <View style={styles.optionGrid}>
          {aircraftOptions.map((aircraft) => (
            <SelectableChip
              key={aircraft.id}
              label={`${aircraft.makeModel}${aircraft.tailNumber ? ` · ${aircraft.tailNumber}` : ""}`}
              selected={draft.aircraftId === aircraft.id}
              onPress={() =>
                updateDraft({
                  aircraftId: aircraft.id,
                  tailNumber: aircraft.tailNumber ?? "",
                })
              }
            />
          ))}
          <SelectableChip
            label="Enter tail manually"
            selected={!draft.aircraftId}
            onPress={() => updateDraft({ aircraftId: undefined })}
          />
        </View>
        <AmgTextInput
          autoCapitalize="characters"
          error={errors.tailNumber}
          label="Tail number"
          onChangeText={(tailNumber) => updateDraft({ tailNumber: tailNumber.toUpperCase() })}
          placeholder="N-number or aircraft reference"
          value={draft.tailNumber}
        />
        {selectedAircraft ? (
          <Text selectable style={styles.helperText}>
            Selected aircraft: {selectedAircraft.makeModel}, based at {selectedAircraft.baseAirport ?? "base pending"}.
          </Text>
        ) : null}
      </InfoCard>

      <InfoCard>
        <View style={styles.sectionHeader}>
          <Text selectable style={styles.sectionTitle}>
            Route or Location
          </Text>
          <Text selectable style={styles.sectionDescription}>
            Add a route for movement or coordination requests. Use location for local support or plan review.
          </Text>
        </View>
        <View style={styles.inlineFields}>
          <View style={styles.inlineField}>
            <AmgTextInput
              autoCapitalize="characters"
              error={undefined}
              label="From"
              maxLength={4}
              onChangeText={(fromAirport) => updateDraft({ fromAirport: normalizeAirportCode(fromAirport) })}
              placeholder="KTEB"
              value={draft.fromAirport}
            />
          </View>
          <View style={styles.inlineField}>
            <AmgTextInput
              autoCapitalize="characters"
              error={undefined}
              label="To"
              maxLength={4}
              onChangeText={(toAirport) => updateDraft({ toAirport: normalizeAirportCode(toAirport) })}
              placeholder="KMIA"
              value={draft.toAirport}
            />
          </View>
        </View>
        {errors.route ? <FieldError message={errors.route} /> : null}
        <AmgTextInput
          error={errors.location}
          label="Location"
          onChangeText={(location) => updateDraft({ location })}
          placeholder="Airport, FBO, or operating area"
          value={draft.location}
        />
      </InfoCard>

      <InfoCard>
        <View style={styles.sectionHeader}>
          <Text selectable style={styles.sectionTitle}>
            Timing
          </Text>
          <Text selectable style={styles.sectionDescription}>
            Add requested timing or explain the timing window AMG should review.
          </Text>
        </View>
        <View style={styles.inlineFields}>
          <View style={styles.inlineField}>
            <AmgTextInput
              error={errors.requestedDate}
              label="Requested date"
              onChangeText={(requestedDate) => updateDraft({ requestedDate })}
              placeholder="YYYY-MM-DD"
              value={draft.requestedDate}
            />
          </View>
          <View style={styles.inlineField}>
            <AmgTextInput
              label="Requested time"
              onChangeText={(requestedTime) => updateDraft({ requestedTime })}
              placeholder="Local time"
              value={draft.requestedTime}
            />
          </View>
        </View>
        <AmgTextInput
          label="Timing flexibility"
          onChangeText={(timingFlexibility) => updateDraft({ timingFlexibility })}
          placeholder="Flexible, firm, or timing note"
          value={draft.timingFlexibility}
        />
      </InfoCard>

      <InfoCard>
        <View style={styles.sectionHeader}>
          <Text selectable style={styles.sectionTitle}>
            Details
          </Text>
          <Text selectable style={styles.sectionDescription}>
            Keep details operational. Attachments will be added after the AMG storage contract is confirmed.
          </Text>
        </View>
        <AmgTextInput
          label="Crew needs"
          onChangeText={(crewNeeds) => updateDraft({ crewNeeds })}
          placeholder="Crew size, duty window, positioning context"
          value={draft.crewNeeds}
        />
        <SelectableChip
          label={draft.maintenanceMovement ? "Maintenance movement requested" : "No maintenance movement"}
          selected={draft.maintenanceMovement}
          onPress={() => updateDraft({ maintenanceMovement: !draft.maintenanceMovement })}
        />
        <View style={styles.textAreaField}>
          <Text selectable style={styles.inputLabel}>
            Notes/details
          </Text>
          <TextInput
            accessibilityLabel="Notes and details"
            multiline
            onChangeText={(notes) => updateDraft({ notes })}
            placeholder="Context AMG should review before accepting or coordinating support"
            placeholderTextColor={colors.dark.textMuted}
            style={styles.textArea}
            textAlignVertical="top"
            value={draft.notes}
          />
          <View style={styles.noteRow}>
            {errors.notes ? <FieldError message={errors.notes} /> : <View />}
            <Text selectable style={styles.counter}>
              {draft.notes.length}/800
            </Text>
          </View>
        </View>
      </InfoCard>

      <InfoCard>
        <View style={styles.sectionHeader}>
          <Text selectable style={styles.sectionTitle}>
            Contact Preference
          </Text>
          <Text selectable style={styles.sectionDescription}>
            AMG will use the confirmed backend workflow before any live request communication is enabled here.
          </Text>
        </View>
        <View style={styles.optionGrid}>
          {contactOptions.map((contactPreference) => (
            <SelectableChip
              key={contactPreference}
              label={contactPreference}
              selected={draft.contactPreference === contactPreference}
              onPress={() => updateDraft({ contactPreference })}
            />
          ))}
        </View>
      </InfoCard>

      <InfoCard>
        <View style={styles.sectionHeader}>
          <Text selectable style={styles.sectionTitle}>
            Submission
          </Text>
          <Text selectable style={styles.sectionDescription}>
            Request submission will be connected after AMG Connect backend mapping is confirmed.
          </Text>
        </View>
        {reviewed ? (
          <Text accessibilityLiveRegion="polite" selectable style={styles.deferredMessage}>
            Required frontend fields are complete. Submission remains deferred until AMG confirms the safe request
            table, fields, storage policy, and RLS path.
          </Text>
        ) : null}
        <View style={styles.actions}>
          <AmgButton label="Review request" onPress={handleReview} />
          <AmgButton disabled label="Submit to AMG" variant="secondary" />
        </View>
      </InfoCard>
    </View>
  );
}

type SelectableChipProps = {
  label: string;
  onPress: () => void;
  selected: boolean;
};

function SelectableChip({ label, onPress, selected }: SelectableChipProps) {
  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={({ pressed }) => [styles.chip, selected && styles.chipSelected, pressed && styles.pressed]}
    >
      <Text selectable={false} style={[styles.chipLabel, selected && styles.chipLabelSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <Text accessibilityLiveRegion="polite" selectable style={styles.errorText}>
      {message}
    </Text>
  );
}

const styles = StyleSheet.create({
  actions: {
    gap: spacing[3],
  },
  chip: {
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[3],
  },
  chipLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: "700",
  },
  chipLabelSelected: {
    color: colors.amg.white,
  },
  chipSelected: {
    backgroundColor: colors.amg.deepBlue,
    borderColor: colors.amg.accentBlue,
  },
  counter: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.xs,
    textAlign: "right",
  },
  deferredMessage: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  errorText: {
    color: colors.amg.lightGray,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  form: {
    gap: spacing[4],
  },
  helperText: {
    color: colors.dark.textMuted,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  inlineField: {
    flex: 1,
    minWidth: 132,
  },
  inlineFields: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[3],
  },
  inputLabel: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    fontWeight: "600",
  },
  noteRow: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  optionGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing[2],
  },
  pressed: {
    opacity: 0.82,
  },
  sectionDescription: {
    color: colors.dark.textSecondary,
    fontSize: typography.sizes.sm,
    lineHeight: 20,
  },
  sectionHeader: {
    gap: spacing[1],
  },
  sectionTitle: {
    color: colors.dark.text,
    fontSize: typography.sizes.lg,
    fontWeight: "700",
  },
  textArea: {
    backgroundColor: colors.dark.input,
    borderColor: colors.dark.border,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    color: colors.dark.text,
    fontSize: typography.sizes.md,
    minHeight: 132,
    padding: spacing[3],
  },
  textAreaField: {
    gap: spacing[2],
  },
});
