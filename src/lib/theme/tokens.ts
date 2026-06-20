import { colors } from "@/lib/theme/colors";
import { spacing } from "@/lib/theme/spacing";
import { typography } from "@/lib/theme/typography";

export const themeTokens = {
  radius: {
    sm: 6,
    md: 8,
    lg: 12,
  },
  colors,
  spacing,
  typography,
  buttons: {
    primary: {
      background: colors.amg.accentBlue,
      text: colors.amg.white,
      border: colors.amg.accentBlue,
    },
    secondary: {
      background: "transparent",
      text: colors.dark.text,
      border: colors.dark.border,
    },
  },
  cards: {
    dark: {
      background: colors.dark.surface,
      border: colors.dark.border,
      text: colors.dark.text,
    },
    light: {
      background: colors.light.surface,
      border: colors.light.border,
      text: colors.light.text,
    },
  },
} as const;
