import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { db } from "../../firebaseConfig";
import { ref, onValue } from "firebase/database";
import {ProductListStyle as styles} from "../../styles/productListStyle"

export default function ProductList({ store }: any) {
  const [products, setProducts] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const productsRef = ref(db, "products/" + store);
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Object.values(data);
        setProducts(list);
        const cats = Array.from(new Set(list.map((p: any) => p.category)));
        setCategories(cats);
      }
      setLoading(false);
    });
  }, [store]);

  const filtered = products.filter(
    (p) =>
      (category === "" || p.category === category) &&
      p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="orange" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.header}>{store.toUpperCase()} termékek</Text>

      <TextInput
        style={styles.input}
        placeholder="Keresés..."
        value={search}
        onChangeText={setSearch}
      />

      <Picker
        selectedValue={category}
        onValueChange={(v) => setCategory(v)}
        style={styles.picker}
      >
        {categories.map((c) => (
          <Picker.Item label={c} value={c} key={c} />
        ))}
      </Picker>

      <FlatList
        data={filtered}
        keyExtractor={(item, i) => item.name + i}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>{item.rawPrice} ({item.unitPrice})</Text>
            <Text style={{ color: item.available ? "green" : "red" }}>
              {item.available ? "Elérhető" : "Nem elérhető"}
            </Text>
            {item.clubcard && <Text style={{ color: "purple" }}>Clubcard</Text>}
          </View>
        )}
      />
    </View>
  );
}