// tescoProductScraper.ts
// Futtatás: npx ts-node tescoProductScraper.ts

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import path from "path";

puppeteer.use(StealthPlugin());

const categories = [
  {
    name: "Zöldség és gyümölcs",
    baseUrl: "https://bevasarlas.tesco.hu/groceries/hu-HU/shop/zoldseg-es-gyumolcs/all?sortBy=relevance&page=2&count=48",
  },
  {
    name: "Tejtermékek",
    baseUrl: "https://bevasarlas.tesco.hu/groceries/hu-HU/shop/tejtermek-tojas/all?sortBy=relevance&count=48",
  },
  {
    name: "Húsok",
    baseUrl: "https://bevasarlas.tesco.hu/groceries/hu-HU/shop/husaru/all?sortBy=relevance&count=48",
  },
  {
    name: "Alapvető élelmiszerek",
    baseUrl: "https://bevasarlas.tesco.hu/groceries/hu-HU/shop/alapveto-elelmiszerek/all?sortBy=relevance&count=48",
  },
  {
    name:"Pékáru",
    baseUrl: "https://bevasarlas.tesco.hu/groceries/hu-HU/shop/pekaru/all?sortBy=relevance&count=48"
  }
];

const outputPath = path.join(__dirname, "data", "tesco_products.json");

function randomDelay(min = 500, max = 1000) {
  return new Promise(r => setTimeout(r, Math.random() * (max - min) + min));
}

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: { width: 1280, height: 900 },
     slowMo: 200
  });

  const page = await browser.newPage();
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36"
  );

  const allProducts: any[] = [];

  // 🧭 Minden kategória bejárása
  for (const category of categories) {
    console.log(`\n🔎 Kategória feldolgozása: ${category.name}`);

    for (let pageNum = 1; pageNum <= 99; pageNum++) {
      const url = `${category.baseUrl}&page=${pageNum}`;
      console.log(`\n🌐 Betöltés: ${url}`);

      try {
        // Oldal betöltése
        await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
        await page.waitForSelector("#list-content", { timeout: 10000 });
        await randomDelay();
        // Görgetés, hogy minden betöltődjön
        await page.evaluate(async () => {
          window.scrollTo(0, document.body.scrollHeight);
          await new Promise((res) => setTimeout(res, 1500));
        });
        await randomDelay();

        // Termékek kinyerése
        const products = await page.evaluate(() => {
          const items = Array.from(document.querySelectorAll('#list-content > li'));

          return items.map((item) => {
            // 🔹 Terméknév kivonása
            const rawName =
              item.querySelector("h3")?.textContent?.trim() ??
              item.textContent?.split("Írj értékelést")[0]?.trim() ??
              "";

            // 🔹 Levágás az "A kategória többi termékre" résznél
            const name = rawName.split("A kategória többi termékre")[0].trim();

            // 🔹 Ár és egyéb adatok
            const priceEl =
              item.querySelector('p[data-auto="product-price"]') ||
              item.querySelector('.beans-price__text') ||
              item.querySelector('div:has(p):not(.clubcard)');

            const rawPrice = priceEl?.textContent?.match(/\d[\d\s]*Ft/)?.[0]?.trim() ?? "";

            const clubcard = item.textContent?.toLowerCase().includes('clubcard') ?? false;
            const available = !item.textContent?.toLowerCase().includes('jelenleg nem elérhető');

            const unitPriceMatch = item.textContent?.match(/\d[\d\s]*Ft\/(?:kg|db|l|cs|m|csomag)/i);
            const unitPrice = unitPriceMatch ? unitPriceMatch[0].trim() : null;

            return {
              name,
              rawPrice,
              clubcard,
              available,
              unitPrice,
            };
          });
        });

        console.log(`✅ ${products.length} termék mentve (${category.name}, oldal ${pageNum})`);

        // Ha nincs több termék, lépjünk a következő kategóriára
        if (products.length === 0) break;

        // Kategória hozzárendelése és hozzáadás a listához
        allProducts.push(...products.map((p) => ({ ...p, category: category.name })));

        // Kisebb várakozás két oldal között
        await new Promise((r) => setTimeout(r, 2000));
      } catch (err: any) {
        console.warn(`Hiba (${category.name} | oldal ${pageNum}): ${err.message}`);

        // Ha Puppeteer kontextus hibát dob, újrapróbálkozás
        if (err.message.includes("Execution context was destroyed")) {
          console.log("Újrapróbálkozás ugyanazzal az oldallal...");
          await new Promise((r) => setTimeout(r, 3000));
          pageNum--;
          continue;
        }

        // Egyéb hiba esetén lépj tovább
        break;
      }
    }
  }

  // 🧾 Fájl mentése
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(allProducts, null, 2), "utf-8");

  console.log(`\n💾 Összesen ${allProducts.length} termék mentve ide: ${outputPath}`);
  await browser.close();
})();
