const fs = require("fs");
const path = require("path");
const packageJson = require("./package.json");

// Ruta al archivo .env
const envPath = path.resolve(__dirname, ".env");

// Leer el contenido actual del archivo .env o inicializarlo si no existe
let envConfig = fs.existsSync(envPath)
  ? fs.readFileSync(envPath, "utf8").split("\n")
  : [];

// Buscar la línea que contiene REACT_APP_VERSION, si no existe, agregarla
const versionIndex = envConfig.findIndex((line) =>
  line.startsWith("REACT_APP_VERSION=")
);
if (versionIndex !== -1) {
  envConfig[versionIndex] = `REACT_APP_VERSION=${packageJson.version}`;
} else {
  envConfig.push(`REACT_APP_VERSION=${packageJson.version}`);
}

// Escribir de vuelta al archivo .env actualizado
fs.writeFileSync(envPath, envConfig.join("\n"));

console.log(
  `Updated REACT_APP_VERSION to ${packageJson.version} in ${envPath}`
);
