import { db } from "../../firebaseConfig";
import { get, ref, child } from "firebase/database";

export const normalizeId = (v: string) =>
  v?.toLowerCase().replace(/\s+/g, "_").trim();

export const prettyCategory = (raw: string) => {
  const s = (raw ?? "")
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return s.charAt(0).toUpperCase() + s.slice(1);
};

export function parseFtToNumber(v: any): number | undefined {
  if (typeof v === "number") return v;

  if (typeof v === "string") {
    v = v.replace(/\u00A0/g, " "); // nem törhető szóköz cseréje
    const digits = v.replace(/\D+/g, "");
    return digits ? Number(digits) : undefined;
  }

  return undefined;
}

export async function fetchCategories(store: "tesco" | "lidl"): Promise<any[]> {
  const snap = await get(ref(db, `categories/${store}`));
  if (!snap.exists()) return [];

  const cats = snap.val() as Record<string, { id?: string }>;
  const arr = Object.entries(cats).map(([key, val]) => {
    const label = val?.id ?? prettyCategory(key);
    return {
      id: normalizeId(label),
      label,
      keyPath: key,
    };
  });

  arr.sort((a, b) => a.label.localeCompare(b.label, "hu"));
  return [{ id: "__ALL__", label: "Mind" }, ...arr];
}

/**
 * Lekéri az adott bolt (tesco/lidl) termékeit.
 * Ha categoryPath nincs megadva, az összes kategóriát beolvassa.
 */
export async function loadProductsByCategory(
  store: "tesco" | "lidl",
  categoryPath?: string
): Promise<any[]> {
  const root = ref(db);
  const products: any[] = [];

  // 🔹 Segédfüggvény egy termék formázásához
const makeProduct = (catKey: string, raw: any, prodKey: string) => ({
  store,
  productId: prodKey,
  name: raw?.title ?? raw?.name ?? "",
  price: raw?.price ?? raw?.rawPrice ?? "N/A",
  rawPrice: raw?.price ?? raw?.rawPrice ?? "N/A",
  category: catKey,
  categoryLabel: prettyCategory(catKey),
  unitPrice: raw?.unitPrice ?? null,
  available: raw?.available ?? true,
  clubcard: raw?.clubcard ?? false,
  url: raw?.url ?? null,
});


  if (categoryPath && categoryPath !== "__ALL__") {
    const catSnap = await get(
      child(root, `categories/${store}/${categoryPath}/products`)
    );
    if (catSnap.exists()) {
      const val = catSnap.val() as Record<string, any>;
      for (const [prodKey, raw] of Object.entries(val)) {
        products.push(makeProduct(categoryPath, raw, prodKey));
      }
    }
  } else {
    const allSnap = await get(child(root, `categories/${store}`));
    if (allSnap.exists()) {
      const allCats = allSnap.val() as Record<string, any>;
      for (const [catKey, catVal] of Object.entries(allCats)) {
        const productsObj = catVal.products ?? {};
        for (const [prodKey, raw] of Object.entries(productsObj)) {
          products.push(makeProduct(catKey, raw, prodKey));
        }
      }
    }
  }

  return products;
}
