// styles/addRecipe.ts
import { StyleSheet } from "react-native";

export const COLORS = {
  bg: "#f5a623", // háttér (narancs)
  surface: "#rgba(40, 28, 5, 0.55", // világos kártyák
  cardBorder: "#e0a800",
  primary: "#f57c00", // fő narancs gomb
  primaryText: "#fff",
  text: "#2b1b0e",
  placeholder: "#8c6b3f",
  border: "#f0c36d",
  danger: "#ff4444",
};

export const styles = StyleSheet.create({
  // ===== Képernyő és tartalom =====
  screen: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 80,
  },

  // ===== Címek =====
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 20,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
  },

  // ===== Input mezők =====
  input: {
    backgroundColor: "#fff9e6",
    color: COLORS.text,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    elevation: 2,
  },

  // ===== Gombok =====
  saveBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addRowBtn: {
    backgroundColor: "#b0a69b",
    borderRadius: 12,
    paddingVertical: 13,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: COLORS.primaryText,
    fontWeight: "700",
    fontSize: 16,
  },
});
