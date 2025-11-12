// styles/recipesStyle.ts
import { StyleSheet } from "react-native";

export const COLORS = {
  bg: "#f5a623",
  surface: "#fff3cd",
  cardBorder: "#e0a800",
  primary: "#f57c00",
  primaryText: "#fff",
  text: "#2b1b0e",
  placeholder: "#8c6b3f",
  border: "#f0c36d",
  danger: "#ff4444",
};

export const recipesStyle = StyleSheet.create({
  // ===== Háttér =====
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: COLORS.bg, // fallback, ha nem tölti be a képet
    justifyContent: "space-between",
  },

  // ===== Tartalom konténer =====
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "rgba(0,0,0,0.35)", // 🟤 áttetsző sötét réteg a háttérképen!
  },

  // ===== Címek =====
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
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

  // ===== Receptdoboz =====
  recipeBox: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 16,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },
  delete: {
    fontSize: 18,
    color: COLORS.danger,
  },

  ingredients: {
    color: COLORS.placeholder,
    marginBottom: 8,
  },

  // ===== Gombok =====
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: COLORS.primaryText,
    fontWeight: "700",
  },

  // ===== Lebegő + gomb =====
  fab: {
    position: "absolute",
    bottom: 120,
    right: 20,
    backgroundColor: COLORS.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 5,
  },
  fabText: {
    color: COLORS.primaryText,
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "900",
  },
});
