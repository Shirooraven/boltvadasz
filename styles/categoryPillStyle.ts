import { StyleSheet } from "react-native";

export const categoryPillStyle = StyleSheet.create({
  pill: {
    backgroundColor: "rgba(40, 28, 5, 0.55)", // meleg, barnás háttér
    borderColor: "rgba(255, 255, 255, 0.1)",
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 6,
    marginBottom: 6,
     minHeight: 30
  },

  pillActive: {
    backgroundColor: "#f57c00", // melegebb aranybarna aktív
    borderColor: "rgba(255, 255, 255, 0.2)",
  },

  pillText: {
    color: "#f1e8cf", // kellemes törtfehér
    fontSize: 13,
    fontWeight: "600",
  },

  pillTextActive: {
    color: "#fffaf0", // világosabb, olvashatóbb aktív szöveg
    fontWeight: "700",
  },
});
