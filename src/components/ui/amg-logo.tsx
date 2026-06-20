import { Image, StyleSheet, View } from "react-native";

type AmgLogoProps = {
  compact?: boolean;
};

export function AmgLogo({ compact = false }: AmgLogoProps) {
  return (
    <View style={[styles.frame, compact && styles.compactFrame]}>
      <Image
        accessibilityIgnoresInvertColors
        resizeMode="contain"
        source={require("@/assets/logo/amg-logo-white.png")}
        style={[styles.logo, compact && styles.compactLogo]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    height: 56,
    width: 220,
  },
  compactFrame: {
    height: 34,
    width: 136,
  },
  logo: {
    height: "100%",
    width: "100%",
  },
  compactLogo: {
    opacity: 0.92,
  },
});
