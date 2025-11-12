// styles/homeStyle.ts
import { StyleSheet } from "react-native";

export const COLORS = {
  bg: "#f5a623", // háttér (narancs)
  surface: "#fff3cd", // világos kártyák
  cardBorder: "#e0a800",
  primary: "#f57c00", // fő narancs
  primaryText: "#fff",
  text: "#2b1b0e",
  placeholder: "#8c6b3f",
  border: "#f0c36d",
  danger: "#ff4444",
};

export const styles = StyleSheet.create({
  // ===== Háttér =====
  background: {
    flex: 1,
    backgroundColor: COLORS.bg,
    justifyContent: "space-between",
  },

  // ===== Tartalom középre igazítása =====
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // ===== Cím és alcím =====
  title: {
    fontSize: 32,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 3 },
    textShadowRadius: 5,
  },

  subtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },

  bold: {
    fontWeight: "bold",
    color: COLORS.primaryText,
  },

  // ===== Egyszerű szöveg =====
  text: {
    color: COLORS.surface,
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
    backgroundColor: "rgba(0,0,0,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
});
