// styles/storeStyles.ts
import { StyleSheet } from "react-native";

export const COLORS = {
  bg: "#f5a623", // háttér (narancs)
  surface: "#rgba(44, 43, 39, 0.2)", // világos kártyák
  cardBorder: "#e0a800",
  primary: "#f57c00", // fő narancs
  primaryText: "#fff",
  text: "#ffffffff",
  placeholder: "#8c6b3f",
  border: "#f0c36d",
  danger: "#ff4444",
};

export const styles = StyleSheet.create({
  // ===== Sor (konténer) =====
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
    gap: 12,
  },

  // ===== Gombok =====
  storeBtn: {
    flex: 1,
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingVertical: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
    opacity: 0.9,
  },

  storeBtnActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.cardBorder,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 5,
    opacity: 1,
  },

  // ===== Gomb szöveg =====
  storeBtnText: {
    color: COLORS.text,
    fontWeight: "700",
    fontSize: 16,
    textTransform: "uppercase",
  },

  storeBtnTextActive: {
    color: COLORS.primaryText,
  },
});
