export function slugify(text) {
  return text
    ? text
        .toString()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "") // Quitar acentos
        .replace(/\s+/g, "-") // Espacios por guion
        .replace(/[^\w\-]+/g, "") // Quitar caracteres raros
        .replace(/\-\-+/g, "-") // Multiples guiones por uno
        .trim()
    : "";
}

export const adapterMenu = (result) => {
  const flatMenu = result;
  const menuMap = new Map();

  flatMenu.forEach((row) => {
    // Nivel 1
    if (!menuMap.has(row.N1)) {
      menuMap.set(row.N1, {
        id: row.N1,
        title: row.N1_Nombre,
        slug: slugify(row.N1_Nombre),
        subitems: [],
      });
    }

    const nivel1 = menuMap.get(row.N1);

    // Nivel 2
    if (row.N2 && !nivel1.subitems.find((item) => item.id === row.N2)) {
      nivel1.subitems.push({
        id: row.N2,
        title: row.N2_Nombre,
        slug: `${nivel1.slug}/${slugify(row.N2_Nombre)}`,
        subitems: [],
      });
    }

    const nivel2 = nivel1.subitems.find((item) => item.id === row.N2);

    // Nivel 3
    if (
      row.N3 &&
      nivel2 &&
      !nivel2.subitems.find((item) => item.id === row.N3)
    ) {
      nivel2.subitems.push({
        id: row.N3,
        title: row.N3_Nombre,
        slug: `${nivel2.slug}/${slugify(row.N3_Nombre)}`,
      });
    }
  });

  const menu = Array.from(menuMap.values());

  return menu;
};
