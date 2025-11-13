import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { auth } from '../firebaseConfig';
import { useAuth } from '../services/AuthContext';

export default function BottomNavbar() {
  const router = useRouter();
  const { user } = useAuth();
  const insets = useSafeAreaInsets(); 
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/');
    } catch (error) {
      console.error('Hiba a kijelentkezésnél:', error);
    }
  };

  return (
    <View style={[styles.navbar, { paddingBottom: insets.bottom || 10 }]}>
      {user && (
        <>
          <TouchableOpacity style={styles.frame} onPress={() => router.push('/home')}>
            <Image source={require('../assets/images/icons/home-icon0.png')} style={styles.icon} />
            <Text style={styles.label}>Főoldal</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.frame} onPress={() => router.push('/recipes')}>
            <Image source={require('../assets/images/icons/recipe-icon0.png')} style={styles.icon} />
            <Text style={styles.label}>Receptek</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.frame} onPress={() => router.push('/shops')}>
            <Image source={require('../assets/images/icons/shops-icon0.png')} style={styles.icon} />
            <Text style={styles.label}>Boltok</Text>
          </TouchableOpacity>
        </>
      )}

      {user ? (
        <TouchableOpacity style={styles.frame} onPress={handleLogout}>
          <Image source={require('../assets/images/icons/login-icon0.png')} style={styles.icon} />
          <Text style={styles.label}>Kijelentkezés</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.frame} onPress={() => router.push('/')}>
          <Image source={require('../assets/images/icons/login-icon0.png')} style={styles.icon} />
          <Text style={styles.label}>Bejelentkezés</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 98,
    backgroundColor: 'rgba(255,139,29,1)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 10,
    // paddingBottom: dinamikusan jön az insets.bottom alapján
  },
  frame: {
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    color: '#000',
  },
});
