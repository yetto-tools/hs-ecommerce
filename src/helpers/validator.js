export function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return  emailPattern.test(email);
}

export function validatePhone(phone) {
    const phoneRegex = /^\d{4}-\d{4}$/
;
    return phoneRegex.test(phone);
}

export const validarIdentificacion = (valor) => {
    if (!valor) return { valor: "", tipo: "Inválido" };
  
    // Eliminar espacios y convertir a mayúsculas
    const input = valor.trim().toUpperCase();
  
    // Validar C/F (Consumidor Final)
    if (input === "C/F" || input === "CF") return { valor, tipo: "C/F" } ;
  
    // Validar DPI (13 dígitos numéricos)
    if (/^\d{13}$/.test(input)) return { valor, tipo:"DPI"};
  
    // Validar NIT (Formato: números + guion + número final)
    if (/^\d{6,10}-\d$/.test(input)) return  { valor, tipo:"NIT"};
  
    return { valor, tipo: "Inválido" }  // Si no cumple con ningún formato
  };




export function  jsonToXml(json) {
    let xml = '<detalles>\n';
    let hasData = false;

    Object.keys(json).forEach(key => {
        if (json[key] && json[key].length > 0) {
            hasData = true;
            json[key].forEach(value => {
                xml += `<detalle>\n`;
                xml += `<Tipo>${key}</Tipo>\n`;
                xml += `<Valor>${value.replace(/-/g, " ").replace(/&/g, "&amp;")}</Valor>\n`;
                xml += `</detalle>\n`;
            });
        }
    });

    xml += '</detalles>';
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
