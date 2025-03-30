import CryptoJS from "crypto-js";

export function EncriptarTransaccion(data, keyToken) {
  const orderid = data.orderid;
  const amount = data.amount;
  const key = keyToken || "Y4qNwKDv7yW858GdU96bSK7u43bvCytc"; // ⚠️ Nunca exponer esto en producción
  const time =
    Math.floor(new Date(data.time) / 1000) || Math.floor(Date.now() / 1000);
  const cadena = `${orderid}|${amount}|${time}|${key}`;
  const hash = CryptoJS.MD5(cadena).toString();
  return hash;
}

export function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

export function validatePhone(phone) {
  const phoneRegex = /^\d{4}-\d{4}$/;
  return phoneRegex.test(phone);
}

export const validarIdentificacion = (valor) => {
  if (!valor) return { valor: "", tipo: "Inválido" };

  // Eliminar espacios y convertir a mayúsculas
  const input = valor.trim().toUpperCase();

  // Validar C/F (Consumidor Final)
  if (input === "C/F" || input === "CF") return { valor, tipo: "C/F" };

  // Validar DPI (13 dígitos numéricos)
  if (/^\d{13}$/.test(input)) return { valor, tipo: "DPI" };

  // Validar NIT (Formato: números + guion + número final)
  if (/^\d{6,10}-\d$/.test(input)) return { valor, tipo: "NIT" };

  return { valor, tipo: "Inválido" }; // Si no cumple con ningún formato
};

export function jsonToXml(json, grupo) {
  let xml = `
  <encabezados>
    <encabezado>
    ${`<Grupo>${grupo}</Grupo>`}
    </encabezado>
  </encabezados>
  <detalles>\n`;
  let hasData = false;

  Object.keys(json).forEach((key) => {
    if (json[key] && json[key].length > 0) {
      hasData = true;
      json[key].forEach((value) => {
        xml += `<detalle>\n`;
        xml += `<Tipo>${key}</Tipo>\n`;
        xml += `<Valor>${value
          .replace(/-/g, " ")
          .replace(/&/g, "&amp;")}</Valor>\n`;
        xml += `</detalle>\n`;
      });
    }
  });

  xml += "</detalles>";
  // Si no hay datos en ninguna variante, mostrar "Todo"
  if (!hasData) {
    xml = null;
  }

  return xml;
}

// Pruebas
//   console.log(validarIdentificacion("1234567-8")); // NIT
//   console.log(validarIdentificacion("1234567890123")); // DPI
//   console.log(validarIdentificacion("C/F")); // C/F
//   console.log(validarIdentificacion("cf")); // C/F
//   console.log(validarIdentificacion("1234-5678")); // Inválido

export function generarBase64ParaSQLServer(objeto) {
  const jsonString = JSON.stringify(objeto);
  const base64 = btoa(unescape(encodeURIComponent(jsonString))); // maneja caracteres especiales
  return base64;
}

export const generarCorrelativoFactura = () => {
  const now = new Date();

  const pad = (num, size = 2) => num.toString().padStart(size, "0");

  const year = now.getFullYear(); // 2025
  const month = pad(now.getMonth() + 1); // 01-12
  const day = pad(now.getDate()); // 01-31
  const hour = pad(now.getHours()); // 00-23
  const minute = pad(now.getMinutes()); // 00-59
  const second = pad(now.getSeconds()); // 00-59
  const millis = pad(now.getMilliseconds(), 2); // 000-999

  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0"); // 4 dígitos aleatorios

  const correlativo = `${year}${month}${day}${hour}${minute}${second}${millis}-${random}`;

  return correlativo; // Máx. 37 caracteres
};
