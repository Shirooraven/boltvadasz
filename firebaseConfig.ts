import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';         
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseConfig = {
  apiKey: "AIzaSyBbQs9wQxmJy131uE2Lg1lIog8358hBwfw",
  authDomain: "boltvadasz-d6363.firebaseapp.com",
  projectId: "boltvadasz-d6363",
  storageBucket: "boltvadasz-d6363.appspot.com",
  messagingSenderId: "426459374129",
  appId: "1:426459374129:web:81ac7f155c6380ee756b10",
  databaseURL: 'https://boltvadasz-d6363-default-rtdb.europe-west1.firebasedatabase.app',
};

export const app = initializeApp(firebaseConfig);

// 🔐 Auth init
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// ✅ Használj Realtime Database-t!
export const db = getDatabase(app);
