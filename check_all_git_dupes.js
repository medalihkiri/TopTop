const fs = require("fs");
const crypto = require("crypto");

function hashFile(p) {
  try {
    return crypto.createHash("sha256").update(fs.readFileSync(p)).digest("hex");
  } catch {
    return null;
  }
}

const gitDir = "temp_git_images";
const publicDir = "public/images";
const gitFiles = fs.readdirSync(gitDir);

const publicHashes = {};
for (const f of fs.readdirSync(publicDir)) {
  publicHashes[hashFile(`${publicDir}/${f}`)] = f;
}

for (const gf of gitFiles) {
  const h = hashFile(`${gitDir}/${gf}`);
  const match = publicHashes[h];
  console.log(`${gf} -> ${match || "no public match"}`);
}
