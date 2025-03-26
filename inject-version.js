const fs = require('fs');
const path = require('path');

const swPath = path.join(__dirname, '../build/sw.js'); // ruta final del SW en CRA
const versionPath = path.join(__dirname, '../public/version.json');

const version = JSON.parse(fs.readFileSync(versionPath, 'utf8')).version;
let swContent = fs.readFileSync(swPath, 'utf8');

swContent = swContent.replace('__VERSION__', version);

fs.writeFileSync(swPath, swContent);

console.log(`✅ Versión ${version} inyectada en service-worker.js`);
