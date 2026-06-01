const fs = require("fs");
const { execSync } = require("child_process");
const path = require("path");

const files = [
  "jpg_ultra_male_1.jpg",
  "jpg_ultra_male_2.jpg",
  "dior_sauvage_1.jpg",
  "dior_sauvage_2.jpg",
  "armani_my_way_1.jpg",
  "armani_my_way_2.jpg",
  "armani_stronger_intensely_1.jpg",
  "armani_stronger_intensely_2.jpg",
  "lacoste_blanc_1.jpg",
  "lacoste_blanc_2.jpg",
  "prada_paradoxe_1.jpg",
  "prada_paradoxe_2.jpg",
  "mancera_coco_vanille_1.jpg",
  "mancera_coco_vanille_2.jpg",
];

const outDir = "temp_git_images";
fs.mkdirSync(outDir, { recursive: true });

for (const f of files) {
  try {
    const buf = execSync(`git show HEAD:public/images/${f}`, { maxBuffer: 10 * 1024 * 1024 });
    fs.writeFileSync(path.join(outDir, f), buf);
    console.log("OK", f, buf.length);
  } catch (e) {
    console.log("MISSING in git:", f);
  }
}
