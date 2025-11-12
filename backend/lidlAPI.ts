import { writeFile } from "node:fs/promises";

const FETCHSIZE = 96;
const OUT = "./data/lidl_products.json";


// Kategóriák (key -> {id, label})
const CATEGORIES = {
  hus: { id: "10071016", label: "Hús" },
  tejtermek: { id: "10071017", label: "Tejtermék" },
  hal : {id: "10071050", label: "Hal és tenger gyümölcsei"},
  tojas :{id:"10071045", label: "Tojás és szárazáru"},
  zoldgyum :{id:"10071012", label: "Zöldség és gyümölcs"}

} as const;

// URL generálás
function buildUrl(categoryId: string, offset: number) {
  const u = new URL("https://www.lidl.hu/q/api/search");
  u.searchParams.set("offset", String(offset));
  u.searchParams.set("fetchsize", String(FETCHSIZE));
  u.searchParams.set("locale", "hu_HU");
  u.searchParams.set("assortment", "HU");
  u.searchParams.set("version", "2.1.0");
  u.searchParams.set("category.id", categoryId);
  return u.toString();
}

// Adatlekérés
async function fetchPage(categoryId: string, offset: number) {
  const res = await fetch(buildUrl(categoryId, offset), {
    headers: {
      Accept: "application/mindshift.search+json;version=2",
      "User-Agent": "Mozilla/5.0",
      Referer: "https://www.lidl.hu/",
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} @ ${categoryId}`);
  return res.json();
}

// Rövid várakozás (ne tiltsanak le)
const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

// Termékadatok egyszerűsítése
function simplify(items: any[], label: string) {
  return items
    .filter((i) => i?.resultClass === "product")
    .map((i) => {
      const d = i.gridbox?.data ?? {};
      const p = d.price ?? {};
      const disc = p.discount ?? {};
      const path = d.canonicalPath;

      return {
        title: d.keyfacts?.fullTitle || d.keyfacts?.title,
        category: d.category,
        price: p.price,
        oldPrice: p.oldPrice,
        currency: p.currencySymbol || "Ft",
        pack: p.basePrice?.text,
        discountPct: disc.percentageDiscount,
        url: path ? `https://www.lidl.hu${path}` : undefined,
        label,
      };
    });
}

// ====== Fő folyamat ======
(async () => {
  const all: any[] = [];

  for (const [key, { id, label }] of Object.entries(CATEGORIES)) {
    console.log(`Kategória: ${label}`);
    let offset = 0;

    for (let page = 0; page < 100; page++) {
      const data = await fetchPage(id, offset);
      const items = Array.isArray(data.items) ? data.items : [];
      if (!items.length) break;

      all.push(...simplify(items, label));

      console.log(`  → ${items.length} elem (page ${page})`);
      if (items.length < FETCHSIZE) break;

      offset += FETCHSIZE;
      await sleep(400);
    }
  }

  await writeFile(OUT, JSON.stringify(all, null, 2), "utf-8");
  console.log(`\n✓ Kész! Mentve: ${OUT} | Termékek: ${all.length}`);
})();
