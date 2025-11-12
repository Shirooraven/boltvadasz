import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, ActivityIndicator, StyleSheet, Button, Alert } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { ref, child, get } from "firebase/database";
import BottomNavbar from "../BottomNavbar";
import AuthGuard from "../components/AuthGuard";
import { useLocalSearchParams, useRouter } from "expo-router"; 

export default function RecipeResult() {
  const { recipeId } = useLocalSearchParams(); // paraméter itt jön
  const router = useRouter(); // visszalépéshez
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState<any>(null);
  const [recipeName, setRecipeName] = useState<string>("");

  useEffect(() => {
    loadAiResult();
  }, []);

  async function loadAiResult() {
    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert("Hiba", "Be kell jelentkezned!");
        return;
      }

      const snap = await get(child(ref(db), `recipeSelections/${uid}/${recipeId}`));
      if (!snap.exists()) {
        Alert.alert("Hiba", "Nincs AI eredmény ehhez a recepthez!");
        return;
      }

      const val = snap.val();
      setAiResult(val.aiResult || {});
      setRecipeName(val.recipeName || "Ismeretlen recept");
    } catch (e: any) {
      console.error("loadAiResult error", e);
      Alert.alert("Hiba", e.message || "Nem sikerült betölteni az AI adatokat.");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <AuthGuard>
        <View style={styles.center}>
          <ActivityIndicator size="large" />
        </View>
      </AuthGuard>
    );
  }

  if (!aiResult) {
    return (
      <AuthGuard>
        <View style={styles.center}>
          <Text>Nincs AI adat ehhez a recepthez.</Text>
          <Button title="Vissza" onPress={() => router.back()} /> 
        </View>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>🍽️ {recipeName}</Text>
        <Text style={styles.subtitle}>AI által kiválasztott termékek</Text>

        {Object.entries(aiResult).map(([ingredient, data]: any) => (
          <View key={ingredient} style={styles.card}>
            <Text style={styles.ingredient}>{ingredient}</Text>

            {data.chosen ? (
              <View style={styles.infoBox}>
                <Text style={styles.itemName}>{data.chosen.name}</Text>
                <Text style={styles.text}>💰 Ár: {data.chosen.price ?? "N/A"} Ft</Text>
                <Text style={styles.text}>🏪 Bolt: {data.chosen.store}</Text>
                <Text style={styles.text}>🔗 Termék ID: {data.chosen.productId}</Text>
                <Text style={styles.reason}>🧠 Indoklás: {data.reason}</Text>
              </View>
            ) : (
              <Text style={styles.text}>❌ Ehhez a hozzávalóhoz nincs kiválasztott termék.</Text>
            )}
          </View>
        ))}

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNavbar />
    </AuthGuard>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 3,
  },
  ingredient: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
  },
  infoBox: {
    marginLeft: 10,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  text: {
    color: "#444",
    marginBottom: 3,
  },
  reason: {
    marginTop: 6,
    fontStyle: "italic",
    color: "#555",
  },
});
