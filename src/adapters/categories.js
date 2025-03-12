const categoryAdapter = (category) => {
  return {
    id: Number(category.id) || 0,
    name: category.NombreCategoria,
    image: category.image || null,
    url: category.url || "#",
  };
};

export function convertUrlToIds(group, genre) {
  const genreMapping = {
    hombre: 1,
    mujer: 2,
    unisex: 3,
  };

  const groupMapping = {
    sneakers: 1,
    ropa: 2,
    accesorios: 3,
    marcas: 4,
  };
  const genreName = genre || null;
  const groupName = group || null;

  const genreId = genreMapping[genreName] || null;
  const groupId = groupMapping[groupName] || null;

  // Reemplaza los nombres con IDs en los parámetros
  let params = {};
  if (genreId) {
    params.idGenre = genreId || null;
  }
  if (groupId) {
    params.idGroup = groupId || null;
  }
  
  // Devuelve la nueva URL formateada con IDs
  return params;
}

export default categoryAdapter;
