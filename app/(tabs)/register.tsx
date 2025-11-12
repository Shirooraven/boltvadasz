// app/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { loginStyle as styles } from '../../styles/loginStyle';

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (userCredential.user) {
        router.replace('/home');
      }
    } catch (error: any) {
      alert('Regisztráció sikertelen: ' + error.message);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Background.png')}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>Regisztráció</Text>

        <TextInput
          style={styles.textInput}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          style={styles.textInput}
          placeholder="Jelszó"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Fiók létrehozása</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.replace('/')}>
          <Text style={{ color: '#000000ff', marginTop: 15 }}>Már van fiókom, bejelentkezek</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
