import React, { useEffect, useState, ReactNode } from "react";
import { View } from "react-native";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { router, usePathname } from "expo-router";

// Típusosan jelezzük, hogy children fogadható
interface AuthGuardProps {
  children?: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [checked, setChecked] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const auth = getAuth();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && pathname === "/") {
        router.replace("/home");
      } else if (!user && pathname !== "/") {
        router.replace("/");
      }
      setLoggedIn(!!user);
      setChecked(true);
    });
    return unsubscribe;
  }, [pathname]);

  // 🔸 Amíg nem tudjuk az auth állapotot → ne rendereljen semmit
  if (!checked) return <View style={{ flex: 1, backgroundColor: "transparent" }} />;

  // ✅ Csak akkor jelenít meg gyerekeket, ha be van jelentkezve
  if (loggedIn || pathname === "/") return <>{children}</>;

  return null;
}
