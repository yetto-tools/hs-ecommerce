export const adapterSearchArticles = (data) => {
  const articulos = data.articulos.map((article) =>
    adapterArticle(article || [])
  );

  return articulos;
};

export const adapterArticles = (data) => {
  const articulos = data.articulos.map((article) =>
    adapterArticle(article || [])
  );

  return articulos;
};

export const adapterArticle = (data = {}) => {
  return {
    sku: data?.Sku || "",
    name: data?.Nombre_Comercial || "",
    price: data?.Precio_SD || 0,
    discountedPrice: data?.Precio_CD || 0,
    discount: data?.Descuento_Porcentaje || 0,
    shortDescription: data?.Descripcion_p || "",
    image: [data?.Imagen_1, data?.Imagen_2].filter(Boolean) || [],
    stock: data?.Cantidad || 0,
    images:
      [
        data.Imagen_1,
        data.Imagen_2,
        data.Imagen_3,
        data.Imagen_4,
        data.Imagen_5,
      ].filter(Boolean) || [],
    colors: data.colores || [],
    brands: data.marcas || [],
    tags: data.etiquetas || [],
    sizes: data.tallas || [],
  };
};

export const adapterArticleDetail = (data) => {
  function adapterArticle(relacionados) {
    // Ensure this function is properly defined to handle related products
    return relacionados.map((item) => ({
      id: item.IdArticulo,
      sku: item.Sku,
      name: item.Nombre_Comercial,
      description: item.Descripcion_p,
      price: parseFloat(item.Precio_SD),
      discount: parseFloat(item.Descuento_Porcentaje),
      discountedPrice: parseFloat(item.Precio_CD),
      image: [item.Imagen_1, item.Imagen_2].filter(Boolean),
    }));
  }

  function adapterVariants(variants) {
    // Ensure this function is properly defined to handle related products
    return variants.map((item) => ({
      id: item.IdArticulo,
      sku: item.Sku,
      name: item.Nombre_Comercial,
      description: item.Descripcion_p,
      price: parseFloat(item.Precio_SD),
      discount: parseFloat(item.Descuento_Porcentaje),
      discountedPrice: parseFloat(item.Precio_CD),
      image: [item.Imagen_1, item.Imagen_2].filter(Boolean),
      color: item.Color,
      idcolor: item.idColor,
      size: item.Talla,
      idSize: item.idTalla,
      images: [
        item.Imagen_1,
        item.Imagen_2,
        item.Imagen_3,
        item.Imagen_4,
        item.Imagen_5,
      ].filter(Boolean),
      stock: item.Cantidad,
    }));
  }

  function adapterSizes(sizes) {
    // Ensure this function is properly defined to handle related products
    return sizes.map((item) => ({
      id: item.idTalla,
      name: item.Nombre,
      stock: item.Cantidad,
    }));
  }
  function adapterColors(colors) {
    // Ensure this function is properly defined to handle related products
    return colors.map((item) => ({
      id: item.idColor,
      name: item.Nombre,
      colorRGB: item.Codigo_RGB,
      colorHex: item.Codigo_HEX,
      stock: item.Cantidad || 0,
    }));
  }

  return {
    id: data.articulo.Sku || "",
    sku: data.articulo.Sku || "",
    name: data.articulo.Nombre_Comercial || "",
    price: parseFloat(data.articulo.Precio_SD) || 0,
    discount: parseFloat(data.articulo.Descuento_Porcentaje) || 0,
    discountedPrice: parseFloat(data.articulo.Precio_CD) || 0,
    new: !!data.articulo.new, // Cast to boolean if `new` flag exists

    // Assuming that stock needs to be calculated if 'stock' is not available in 'variantes'
    stock: data.variantes.reduce(
      (total, variante) => total + (variante.Cantidad || 0),
      0
    ),

    shortDescription: data.articulo.Descripcion_p || "",
    fullDescription: data.articulo.Descripcion_g || "", // Assuming 'Descripcion_g' exists
    category: [], // Populate this if category data becomes available
    tag: [], // Populate this if tag data becomes available
    image: [data.articulo.Imagen_1, data.articulo.Imagen_2].filter(Boolean),
    images: [
      data.articulo.Imagen_1,
      data.articulo.Imagen_2,
      data.articulo.Imagen_3,
      data.articulo.Imagen_4,
      data.articulo.Imagen_5,
    ].filter(Boolean),

    sizes: adapterSizes(data.talla || []),
    colors: adapterColors(data.color || []),
    variation: adapterVariants(data.variantes || []),
    relatedProducts: adapterArticle(data.relacionados || []),
  };
};

export const adapterNewArrivals = (data) => {
  console.log(data);
  const articulos = data.map((article) => adapterNewArrival(article || []));
  return articulos;
};

export const adapterNewArrival = (data) => {
  return {
    id: data.idArticulo,
    code: data.CodigoInterno,
    sku: data.Sku,
    name: data.Nombre_Comercial,
    shortDescription: data.Descripcion_p,
    price: data.Precio_SD,
    discount: data.Descuento_Porcentaje,
    discountedPrice: data.Precio_CD,
    image: data.Imagen_1,
    images: [data.Imagen_1],
    stock: data.Cantidad,
  };
};

export const adapterFilters = (data) => {
  return {
    categories: data.categorias || [],
    tags: adapterTags(data.etiquetas) || [],
    brands: adapterBrands(data.marcas) || [],
    colors: adapterColors(data.colores) || [],
    sizes: adapterSizes(data.tallas) || [],
  };
};

export const adapterSizes = (data) => {
  return data.map((item) => {
    return {
      id: item.idSize,
      name: item.Nombre,
    };
  });
};

export const adapterColors = (data) => {
  return data.map((item) => {
    return {
      id: item.idColor,
      name: item.Nombre,
      hex: item.Codigo_HEX,
      rgb: item.Codigo_RGB,
    };
  });
};

export const adapterBrands = (data) => {
  return data.map((item) => {
    return {
      id: item.idFabricante,
      name: item.Nombre,
    };
  });
};

export const adapterTags = (data) => {
  return data.map((item) => {
    return {
      tag: item.Etiqueta,
    };
  });
};
