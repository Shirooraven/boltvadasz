import React from "react";
import { ImageBackground, Text, View } from "react-native";
import { useAuth } from "../../services/AuthContext";
import BottomNavbar from "../../src/BottomNavbar";
import AuthGuard from "../../src/components/AuthGuard";
import { styles } from "../../styles/styles";

export default function Home() {
  const { user } = useAuth();

  return (
    <AuthGuard>
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        style={styles.background}
        imageStyle={{ resizeMode: "cover" }}
      >
        <View style={styles.centeredContainer}>
          <Text style={styles.title}>Üdvözöllek</Text>
          <Text style={styles.subtitle}>
            a <Text style={styles.bold}>Boltvadász - Főoldal</Text> oldalán
          </Text>
          {user && <Text style={styles.text}>Bejelentkezve: {user.email}</Text>}
        </View>
        <BottomNavbar />
      </ImageBackground>
    </AuthGuard>
  );
}
