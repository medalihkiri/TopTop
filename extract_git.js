const fs = require("fs");
const { execSync } = require("child_process");

const f = "jpg_ultra_male_1.jpg";
const gitBuf = execSync(`git show HEAD:public/images/${f}`, { maxBuffer: 10 * 1024 * 1024 });
fs.writeFileSync("temp_git_ultra_proper.jpg", gitBuf);
console.log("Written", gitBuf.length, "bytes");
