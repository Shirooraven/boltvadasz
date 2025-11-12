// upload_tesco_to_firebase_v4.ts
// Futtatás: npx ts-node upload_tesco_to_firebase_v4.ts

import fs from "fs";
import path from "path";
import { initializeApp, cert, deleteApp } from "firebase-admin/app";
import { getDatabase } from "firebase-admin/database";
import { firebaseConfig } from "./adminConfig";

const serviceAccount = require("../services/boltvadasz-d6363-firebase-adminsdk-fbsvc-f7fe7144fb.json");

// 🔐 Firebase inicializálás
const app = initializeApp({
  credential: cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
});
const db = getDatabase();

// 📦 Tesco JSON fájl beolvasása
const filePath = path.join(__dirname, "data", "tesco_products.json");
if (!fs.existsSync(filePath)) {
  console.error("❌ Nem található a fájl:", filePath);
  process.exit(1);
}
const products = JSON.parse(fs.readFileSync(filePath, "utf-8")) as any[];

// 🔤 Kulcsgeneráló segédfüggvény
function normalizeKey(str: string): string {
  return str
    .normalize("NFD") // ékezetek eltávolítása
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]/g, "_")
    .toLowerCase()
    .slice(0, 100);
}

(async () => {
  const baseRef = db.ref("categories/tesco");
  const seenCats = new Set<string>();
  let newCount = 0;
  let updatedCount = 0;
  let skippedCount = 0;

  for (const [i, p] of products.entries()) {
    try {
      const name = (p.name || "").trim();
      const category = (p.category || "egyéb").trim().toLowerCase();
      if (!name) {
        skippedCount++;
        continue;
      }

      //Kategória létrehozása
      if (!seenCats.has(category)) {
        await baseRef.child(category).update({ id: category });
        seenCats.add(category);
      }

      const productKey = normalizeKey(name);
      const productRef = baseRef.child(`${category}/products/${productKey}`);
      const snap = await productRef.get();

      //Feltöltendő adatok
      const updateData = {
        title: name,
        price: p.rawPrice && p.rawPrice.trim() !== "" ? p.rawPrice : null,
        unitPrice: p.unitPrice ?? null,
        available: typeof p.available === "boolean" ? p.available : true,
        clubcard: typeof p.clubcard === "boolean" ? p.clubcard : false,
        category: p.category ?? null,
        updatedAt: new Date().toISOString(),
      };

      if (!snap.exists()) {
        //Új termék
        await productRef.set({
          ...updateData,
          uploadedAt: updateData.updatedAt,
        });
        newCount++;
      } else {
        //Létező termék → frissítés
        await productRef.update(updateData);
        updatedCount++;
      }
    } catch (err: any) {
      skippedCount++;
    }
  }

  console.log(`Kész! ${newCount} új, ${updatedCount} frissített, ${skippedCount} kihagyott termék ${seenCats.size} kategóriában.`);

  await deleteApp(app);
})().catch(async (e) => {
  console.error("🔥 Hiba:", e);
  await deleteApp(app).catch(() => {});
});
