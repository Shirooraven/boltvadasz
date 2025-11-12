// styles/productBrowserStyle.ts
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

export const productBrowserStyle = StyleSheet.create({

  // a többi stílus fölé/elé illesztheted
overlay: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.35)", 
},

  // ===== Háttér, képernyő =====
  background: {
    flex: 1,
    resizeMode: "cover",
    backgroundColor: COLORS.bg,
  },
  screen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },

  // ===== Címek =====
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
label: {
  color: "#000000ff",
  fontSize: 16,
  fontWeight: "600",
  marginTop: 10,
  marginBottom: 6
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

  // ===== Görgethető kategória sor =====
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 8,
  },

  // ===== Üres lista üzenet =====
  emptyText: {
    color: "#fff",
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    fontWeight: "600",
  },

  // ===== Betöltés indikátor =====
  loader: {
    marginTop: 20,
  },

  // ===== Kártyák / listaelemek alap beállításai (opcionális) =====
  cardContainer: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 16,
    color: COLORS.text,
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.placeholder,
  },
});
