import { StyleSheet } from "react-native";

export const ProductListStyle  = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    margin: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    margin: 16,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  picker: {
    marginHorizontal: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  item: {
    backgroundColor: "#f8f8f8",
    marginHorizontal: 16,
    marginVertical: 6,
    padding: 12,
    borderRadius: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
