import React, { useState } from 'react'; 
import {View,  Text, TextInput,TouchableOpacity, ImageBackground, } from 'react-native';  
import { loginStyle as styles } from "../../styles/loginStyle";
import { signInWithEmailAndPassword } from 'firebase/auth'; 
import { auth } from '../../firebaseConfig';
import { router } from 'expo-router';


export default function Login() {
  const [email, setEmail] = useState(''); //empty string at first
  const [password, setPassword] = useState(''); //empty string at first

  const signIn = async () => {
    try {
      //look for user 
      const user = await signInWithEmailAndPassword(auth, email, password); 
      //if logged in user go to 'home'
      if (user) router.replace('/home');
    } catch (error: any) { //if any error is present, give an error message
      alert('Hiba lépett fel: ' + error.message);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/Background.png')}
      style={styles.background}
      imageStyle={{ resizeMode: 'cover' }}
    >
      <View style={styles.centeredContainer}>
        <Text style={styles.title}>Bejelentkezés</Text>

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

        <TouchableOpacity style={styles.button} onPress={signIn}>
          <Text style={styles.text}>Belépés</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/register')}>
          <Text style={[styles.subtitle]}>Még nincs fiókom, regisztrálok</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}
