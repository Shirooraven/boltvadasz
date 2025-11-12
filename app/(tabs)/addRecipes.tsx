import React, { useState } from "react";
import {Text,TextInput,TouchableOpacity,ScrollView,KeyboardAvoidingView,Platform,ImageBackground,Alert,} from "react-native";
import { ref, push, set } from "firebase/database";
import { auth, db } from "../../firebaseConfig";
import { useRouter } from "expo-router";
import BottomNavbar from "../BottomNavbar";
import AuthGuard from "../components/AuthGuard";
import { styles, COLORS } from "../../styles/addRecipe";

export default function AddRecipe() {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function saveRecipe() {
    if (!name.trim() || !ingredients.trim()) {
      Alert.alert("Hiba", "Kérlek add meg a recept nevét és hozzávalóit! ");
      return;
    }

    try {
      setLoading(true);
      const uid = auth.currentUser?.uid;
      if (!uid) {
        Alert.alert("Bejelentkezés szükséges!");
        return;
      }

      const newRef = push(ref(db, `recipes/${uid}`));
      await set(newRef, {
        id: newRef.key,
        name,
        createdAt: Date.now(),
        ingredients: ingredients
          .split(",")
          .map((x) => ({ baseName: x.trim() }))
          .filter((x) => x.baseName),
      });

      Alert.alert("Siker!", "A recept sikeresen mentve.");
      router.replace("/recipes");
    } catch (err: any) {
      Alert.alert("Hiba", err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthGuard>
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        style={styles.screen}
      >
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>📝 Új recept hozzáadása</Text>
            <Text style={{ color: "#4d2900ff", textAlign: "center", marginBottom: 16 }}>
              Add meg a recept nevét és a hozzávalókat vesszővel elválasztva. Kérlek ügyelj arra, hogy pontos hozzávalóneveket írj! (Pl. "bors" helyett "feketebors" vagy "paprika" helyett "őrölt paprika")
            </Text>

            <TextInput
              placeholder="Recept neve"
              placeholderTextColor={COLORS.placeholder}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />

            <TextInput
              placeholder="Hozzávalók (pl. csirke, paprika, paradicsom)"
              placeholderTextColor={COLORS.placeholder}
              value={ingredients}
              onChangeText={setIngredients}
              multiline
              style={[styles.input, { height: 100, textAlignVertical: "top" }]}
            />

            <TouchableOpacity
              style={[styles.saveBtn, { marginTop: 10, opacity: loading ? 0.7 : 1 }]}
              onPress={saveRecipe}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Mentés..." : "Recept mentése"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.addRowBtn, { backgroundColor: "#b0a69b" }]}
              onPress={() => router.back()}
            >
              <Text style={styles.buttonText}>Mégse</Text>
            </TouchableOpacity>
          </ScrollView>
        </KeyboardAvoidingView>

        <BottomNavbar />
      </ImageBackground>
    </AuthGuard>
  );
}
