const fs = require('fs');
const path = require('path');

const versionPath = path.join(__dirname, '../public/version.json');

const versionFile = fs.readFileSync(versionPath, 'utf-8');
const versionData = JSON.parse(versionFile);

const currentVersion = versionData.version;
const [major, minor, patch] = currentVersion.split('.').map(Number);

// Aumentar el patch automáticamente
const newVersion = `${major}.${minor}.${patch + 1}`;

versionData.version = newVersion;
fs.writeFileSync(versionPath, JSON.stringify(versionData, null, 2));

console.log(`🔁 Versión actualizada: ${currentVersion} ➜ ${newVersion}`);
