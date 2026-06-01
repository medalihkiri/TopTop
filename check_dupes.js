const fs = require("fs");
const crypto = require("crypto");

function hashFile(p) {
  return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
}

const pairs = [
  ["temp_git_images/jpg_ultra_male_1.jpg", "public/images/homme acqua di gio.jpg"],
  ["temp_git_images/dior_sauvage_1.jpg", "public/images/homme terre d'hermes (1).jpg"],
  ["temp_git_images/lacoste_blanc_1.jpg", "public/images/homme ysl l'homme (1).jpg"],
  ["temp_git_images/prada_paradoxe_1.jpg", "public/images/femme gucci bambo.jpg"],
];

for (const [a, b] of pairs) {
  try {
    const same = hashFile(a) === hashFile(b);
    console.log(`${same ? "SAME" : "DIFF"}: ${a.split("/").pop()} vs ${b.split("/").pop()}`);
  } catch (e) {
    console.log("ERR:", a, b, e.message);
  }
}
