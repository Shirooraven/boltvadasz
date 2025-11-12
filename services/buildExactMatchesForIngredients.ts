// services/matchService.ts
import { get, ref, child } from "firebase/database";
import { db } from "../firebaseConfig";

type ProductItem = {
  id?: string;
  title?: string;
  name?: string;
  price?: number;
  category?: string;
  url?: string;
  [key: string]: any;
};

function normalizeText(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // diakritikus jelek eltávolítása
    .toLowerCase()
    .trim();
}

export async function buildExactMatchesForIngredients(ingredients: string[]) {
  const stores = ["tesco", "lidl"];
  const results: any[] = [];

  for (const ingredient of ingredients) {
    const candidates: any[] = [];
    const normalizedIngredient = normalizeText(ingredient);

    for (const store of stores) {
      const categoriesSnap = await get(child(ref(db), `categories/${store}`));
      if (!categoriesSnap.exists()) continue;
      const categories = categoriesSnap.val();

      for (const [categoryName, categoryData] of Object.entries<any>(categories)) {
        const products = categoryData.products;
        if (!products) continue;

        const productList: ProductItem[] = Object.values(products);

        // két lépcső: először exact match, aztán partial
        const exactMatches: ProductItem[] = [];
        const partialMatches: ProductItem[] = [];

        for (const p of productList) {
          const title = p.title || p.name || "";
          const normalizedTitle = normalizeText(title);

          if (normalizedTitle === normalizedIngredient) {
            exactMatches.push(p);
          } else if (normalizedTitle.includes(normalizedIngredient)) {
            partialMatches.push(p);
          }
        }

        // összefűzzük, de az exact előre kerül
        const sortedMatches = [...exactMatches, ...partialMatches];

        for (const m of sortedMatches.slice(0, 10)) {
          candidates.push({
            productId: m.id || m.url || Math.random().toString(36).slice(2),
            name: m.title || m.name || "Ismeretlen termék",
            store,
            price: m.price || null,
            category: categoryName,
            url: m.url || null,
            matchType: exactMatches.includes(m) ? "exact" : "partial", // opcionális debug
          });
        }
      }
    }

    const exactCount = candidates.filter((c) => c.matchType === "exact").length;
    console.log(`   pontos: ${exactCount}, részleges: ${candidates.length - exactCount}`);
    results.push({ name: ingredient, candidates });
  }
  return results;
}