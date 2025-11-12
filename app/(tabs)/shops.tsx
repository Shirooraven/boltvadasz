import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import { productBrowserStyle as styles } from "../../styles/productBrowserStyle";
import { fetchCategories, loadProductsByCategory } from "../utils/products";
import StoreSwitch from "../components/StoreSwitch";
import CategoryPill from "../components/CategoryPill";
import ProductCard from "../components/ProductCard";
import AuthGuard from "../components/AuthGuard";

export type StoreType = "tesco" | "lidl";

export interface Category {
  id: string;
  name: string;
}

export interface Product {
  productId: string;
  name?: string;
  title?: string;
  category?: string;
  categoryLabel?: string;
  rawPrice?: string;
  unitPrice?: string;
  available?: boolean;
  clubcard?: boolean;
}

export default function ProductBrowserScreen() {
  const [store, setStore] = useState<StoreType>("tesco");
  const [query, setQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("__ALL__");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // 🔄 ADATOK BETÖLTÉSE
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const categoryData: Category[] = await fetchCategories(store);
        setCategories(categoryData);

        const categoryToLoad =
          selectedCategory === "__ALL__" ? undefined : selectedCategory;

        const productData: Product[] = await loadProductsByCategory(
          store,
          categoryToLoad
        );
        setProducts(productData);
      } catch (error) {
        console.warn("Hiba a betöltés közben:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [store, selectedCategory]);

  // SZŰRÉS LOGIKA
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "__ALL__" ||
      product.category?.toLowerCase() === selectedCategory.toLowerCase() ||
      product.categoryLabel?.toLowerCase() === selectedCategory.toLowerCase();

    const matchesSearch =
      query === "" ||
      product.name?.toLowerCase().includes(query.toLowerCase()) ||
      product.title?.toLowerCase().includes(query.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <AuthGuard>
      <ImageBackground
        source={require("../../assets/images/Background.png")}
        style={styles.background}
      >
        <View style={styles.overlay}>
          <SafeAreaView style={styles.screen}>
            <Text style={styles.title}>Termékek</Text>

            <Text style={styles.label}>Bolt</Text>
            <StoreSwitch store={store} setStore={setStore} />

            <Text style={styles.label}>Kategória</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.row}
            >
              {categories.map((cat) => (
                <CategoryPill
                  key={cat.id}
                  opt={cat}
                  active={selectedCategory === cat.id}
                  onPress={() => setSelectedCategory(cat.id)}
                />
              ))}
            </ScrollView>

            <Text style={styles.label}>Keresés</Text>
            <TextInput
              style={styles.input}
              placeholder="Keresés..."
              placeholderTextColor="#aaa"
              value={query}
              onChangeText={setQuery}
            />

            {loading ? (
              <ActivityIndicator style={{ marginTop: 5 }} size="large" color="#fff" />
            ) : (
              <FlatList
                data={filteredProducts}
                keyExtractor={(item) => item.productId}
                renderItem={({ item }) => <ProductCard item={item} />}
                ListEmptyComponent={
                  <Text style={{ color: "#fff", textAlign: "center", marginTop: 5 }}>
                    Nincs találat
                  </Text>
                }
              />
            )}
          </SafeAreaView>
        </View>
      </ImageBackground>

    </AuthGuard>
  );
}
