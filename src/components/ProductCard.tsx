import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { productCardStyle as styles } from "../../styles/productCardStyle";

type ProductCardProps = {
  item: {
    name?: string;
    url?: string;
    store?: string;
    productId?: string;
    category?: string;
    rawprice?: number;
    unitPrice?: string | null;
    available?: boolean;
    clubcard?: boolean;
    price?: string;
  };
};

export default function ProductCard({ item }: ProductCardProps) {
  const openLink = (url?: string) => {
    if (!url) return;
    Linking.openURL(url).catch(() => {
      console.warn("Nem sikerült megnyitni a linket:", url);
    });
  };

  return (
    <View style={styles.card}>
      {/* Terméknév kattintható linkkel */}
      <TouchableOpacity onPress={() => openLink(item.url)}>
        <Text style={[styles.cardTitle, styles.cardTitleLink]} numberOfLines={2}>
          {item.name ?? "Ismeretlen termék"}
        </Text>
      </TouchableOpacity>

      {/* Meta adatok */}
      <View style={styles.metaRow}>
        <Text style={styles.metaText}>
          {item.store?.toUpperCase() ?? "?"} • {item.productId ?? "?"} • {item.category ?? "Ismeretlen kategória"}
        </Text>
      </View>

      {/* Kulcs-érték információk */}
      <View style={styles.kvRow}>
        <View style={styles.kvChip}>
          <Text style={styles.kvLabel}>Ár</Text>
          <Text style={styles.kvValue}>
            {item.price ?? "N/A"}
          </Text>
        </View>


        <View style={styles.kvChip}>
          <Text style={styles.kvLabel}>Egységár</Text>
          <Text style={styles.kvValue}>{item.unitPrice ?? "N/A"}</Text>
        </View>

        <View style={styles.kvChip}>
          <Text style={styles.kvLabel}>Elérhető</Text>
          <Text style={styles.kvValue}>{item.available ? "igen" : "nem"}</Text>
        </View>

        <View style={styles.kvChip}>
          <Text style={styles.kvLabel}>Clubcard</Text>
          <Text style={styles.kvValue}>{item.clubcard ? "igen" : "nem"}</Text>
        </View>
      </View>

      {/* Csak ha nem Tesco, jelenjen meg a CTA gomb */}
      {item.store?.toLowerCase() !== "tesco" && item.url && (
        <>
          <View style={styles.divider} />
          <View style={styles.ctaRow}>
            <TouchableOpacity onPress={() => openLink(item.url)} style={styles.ctaBtn}>
              <Text style={styles.ctaText}>Megnyitás böngészőben</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}
