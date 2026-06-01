const fs = require("fs");
const path = require("path");

const productsFile = fs.readFileSync("src/data/products.ts", "utf8");
const productBlocks = [...productsFile.matchAll(/id:\s*"([^"]+)"[\s\S]*?images:\s*\[([\s\S]*?)\]/g)];

const imageDir = "public/images";
const files = new Set(fs.readdirSync(imageDir));

const allRefs = [];
const byProduct = [];

for (const [, id, imagesBlock] of productBlocks) {
  const images = [...imagesBlock.matchAll(/"(\/images\/[^"]+)"/g)].map((m) => m[1]);
  byProduct.push({ id, images });
  allRefs.push(...images);
}

const missing = allRefs.filter((ref) => !files.has(ref.replace("/images/", "")));
console.log("=== MISSING FILES ===");
missing.forEach((m) => console.log(m));

const dupes = {};
allRefs.forEach((ref) => {
  dupes[ref] = (dupes[ref] || 0) + 1;
});
console.log("\n=== SHARED IMAGES (used by multiple products) ===");
Object.entries(dupes)
  .filter(([, count]) => count > 1)
  .forEach(([ref, count]) => {
    const users = byProduct.filter((p) => p.images.includes(ref)).map((p) => p.id);
    console.log(`${ref} (${count}x): ${users.join(", ")}`);
  });

const unused = [...files].filter((f) => !allRefs.some((ref) => ref.endsWith(f)));
console.log("\n=== UNUSED FILES IN public/images ===");
unused.forEach((f) => console.log(f));

console.log("\n=== OLD SNAKE_CASE PRODUCTS ===");
byProduct
  .filter((p) => p.images.some((img) => /_[12]\.jpg$/.test(img)))
  .forEach((p) => console.log(`${p.id}: ${p.images.join(", ")}`));
