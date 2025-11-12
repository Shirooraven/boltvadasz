import { StyleSheet } from "react-native";

export const productCardStyle = StyleSheet.create({
  card: {
    backgroundColor: "rgba(44, 43, 39, 1)", // sötétebb, kontrasztosabb
    borderWidth: 1,
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    elevation: 4,
  },

  cardTitle: {
    color: "#fef9ec",
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 2,
  },
  cardTitleLink: {
    textDecorationLine: "underline",
    color: "#ffb347", // lágy arany link
  },

  metaRow: {
    marginTop: 4,
  },
  metaText: {
    color: "#c2b597", // halvány meta
    fontSize: 12,
  },

  kvRow: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  kvChip: {
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
    margin: 4,
  },
  kvLabel: {
    color: "#c2b597",
    fontSize: 12,
    fontWeight: "600",
  },
  kvValue: {
    color: "#fef9ec",
    fontSize: 13,
    fontWeight: "700",
  },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginVertical: 8,
  },

  ctaRow: {
    alignItems: "center",
  },
  ctaBtn: {
    backgroundColor: "#e07127ff",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  ctaText: {
    color: "#fff4f0ff",
    fontWeight: "700",
  },
});
