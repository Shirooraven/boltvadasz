import { StyleSheet } from "react-native";

export const loginStyle = StyleSheet.create({
  /* ===== Háttér ===== */
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  /* ===== Konténer ===== */
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  /* ===== Cím ===== */
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#2b1b0e",
    textAlign: "center",
    marginBottom: 30,
  },

  /* ===== Input mezők ===== */
  textInput: {
    width: 300, // fix szélesség, nem arányos
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderColor: "#c8a97e",
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginBottom: 14,
    color: "#2b1b0e",
    fontSize: 16,
  },
  textInputPlaceholder: {
    color: "#7a6b5b",
  },

  /* ===== Gomb ===== */
  button: {
    width: 300,
    backgroundColor: "#8a623e",
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  /* ===== Szövegek ===== */
  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  subtitle: {
    color: "#2b1b0e",
    fontSize: 15,
    textAlign: "center",
    marginTop: 20,
  },
});
