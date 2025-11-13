import { Link, useRouter } from "expo-router";
import { child, get, ref, remove, set } from "firebase/database";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, ImageBackground, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../../firebaseConfig";
import { buildExactMatchesForIngredients } from "../../services/buildExactMatchesForIngredients";
import BottomNavbar from "../../src/BottomNavbar";
import AuthGuard from "../../src/components/AuthGuard";
import { recipesStyle as styles } from "../../styles/recipesStyle";

export default function RecipesSimple() {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [running, setRunning] = useState<string | null>(null);
  const router = useRouter();

  // Az AI szerver URL-je (Render deploy)
  const AI_URL = "https://boltvadasz.onrender.com/aiMatch";

  // Receptek betöltése Firebase-ből
  async function loadRecipes() {
    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      const snap = await get(child(ref(db), `recipes/${uid}`));
      if (!snap.exists()) {
        setRecipes([]);
        return;
      }

      const val = snap.val();
      const arr = Object.keys(val).map((k) => ({ id: k, ...val[k] }));
      setRecipes(arr);
    } catch (err) {
      console.error(err);
      Alert.alert("Hiba", "Nem sikerült betölteni a recepteket.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadRecipes();
  }, []);

  //  AI futtatása adott receptre
  async function runAi(recipe: any) {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert("Bejelentkezés szükséges!");
        return;
      }

      setRunning(recipe.id);

      // Lekérjük a pontos terméklistát a hozzávalók alapján
      const ingredientNames = recipe.ingredients.map((i: any) => i.baseName);
      const ingredientsWithCandidates = await buildExactMatchesForIngredients(ingredientNames);

      // Elküldjük az AI-nak, hogy ezek közül válasszon
      const res = await fetch(AI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipeName: recipe.name,
          ingredients: ingredientsWithCandidates, // <<< itt már benne vannak a konkrét termékek
        }),
      });

      if (!res.ok) throw new Error("AI hívás sikertelen.");
      const data = await res.json();

      // Mentés Firebase-be
      await set(ref(db, `recipeSelections/${uid}/${recipe.id}`), {
        recipeName: recipe.name,
        aiResult: data.result,
        originalIngredients: ingredientsWithCandidates, // <<< itt is megőrizzük a teljes listát
        updatedAt: Date.now(),
      });

      Alert.alert("Siker!", "Az AI válasza elmentve az adatbázisba.");
    } catch (err: any) {
      console.error("runAi error", err);
      Alert.alert("Hiba", err.message ?? "Ismeretlen hiba.");
    } finally {
      setRunning(null);
    }
  }

  // Recept törlése (recept + AI-eredmény)
  async function deleteRecipe(recipeId: string) {
    try {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      Alert.alert("Recept törlése", "Biztosan törlöd ezt a receptet?", [
        { text: "Mégse", style: "cancel" },
        {
          text: "Igen, töröld",
          style: "destructive",
          onPress: async () => {
            await remove(ref(db, `recipes/${uid}/${recipeId}`));
            await remove(ref(db, `recipeSelections/${uid}/${recipeId}`));
            loadRecipes();
            Alert.alert("Törölve", "A recept sikeresen törölve.");
          },
        },
      ]);
    } catch (err: any) {
      Alert.alert("Hiba", err.message ?? "Nem sikerült törölni.");
    }
  }

  // Egy recept megjelenítése a listában
  function renderItem({ item }: { item: any }) {
    const ingredients = (item.ingredients || [])
      .map((i: any) => i.baseName)
      .join(", ");

    return (
      <View style={styles.recipeBox}>
        <View style={styles.headerRow}>
          <Text style={styles.recipeName}>{item.name}</Text>
          <TouchableOpacity onPress={() => deleteRecipe(item.id)}>
            <Text style={styles.delete}>X</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.ingredients}>Hozzávalók: {ingredients}</Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.actionButton, { backgroundColor: "#f57c00" }]}
            onPress={() =>
              router.push({
                pathname: "/recipeResult",
                params: { recipeId: item.id },
              })
            }
          >
            <Text style={styles.buttonText}>Megnyitás</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              running === item.id && { backgroundColor: "#c98200", opacity: 0.7 },
            ]}
            onPress={() =>
              Alert.alert(
                "AI párosítás",
                `Biztosan lefuttatod az AI-t a(z) "${item.name}" recepthez?`,
                [
                  { text: "Mégse", style: "cancel" },
                  { text: "Igen", onPress: () => runAi(item) },
                ]
              )
            }
            disabled={running !== null}
          >
            <Text style={styles.buttonText}>
              {running === item.id ? "AI fut..." : "AI futtatása"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //Fő render
  return (
    <AuthGuard>
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        style={styles.background}
      >
        <View style={styles.container}>
          <Text style={styles.title}>🍲 Receptek</Text>
          <Text style={styles.subtitle}>A mentett receptek listája</Text>

          {loading ? (
            <ActivityIndicator size="large" color="#f3bb21ff" />
          ) : recipes.length === 0 ? (
            <Text style={{ color: "#777", marginTop: 20 }}>
              Nincs mentett recept.
            </Text>
          ) : (
            <FlatList
              data={recipes}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingBottom: 120 }}
            />
          )}
        </View>

        {/* ➕ Új recept gomb */}
        <Link href="/addRecipes" asChild>
          <TouchableOpacity style={styles.fab}>
            <Text style={styles.fabText}>＋</Text>
          </TouchableOpacity>
        </Link>

        <BottomNavbar />
      </ImageBackground>
    </AuthGuard>
  );
}
