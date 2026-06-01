const fs = require("fs");
const { execSync } = require("child_process");
const crypto = require("crypto");

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
];

function hash(buf) {
  return crypto.createHash("sha256").update(buf).digest("hex").slice(0, 16);
}

for (const f of files) {
  const current = fs.readFileSync(`public/images/${f}`);
  let gitBuf;
  try {
    gitBuf = execSync(`git show HEAD:public/images/${f}`, { maxBuffer: 10 * 1024 * 1024 });
  } catch {
    gitBuf = null;
  }
  const curHash = hash(current);
  const gitHash = gitBuf ? hash(gitBuf) : "N/A";
  const same = gitBuf && curHash === gitHash;
  console.log(`${f}: current=${current.length}b git=${gitBuf ? gitBuf.length + "b" : "missing"} same=${same}`);
}
