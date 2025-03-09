export const adapterArticles = (data) => {
  return data.articulos.map((article) => adapterArticle(article || []));
};

export const adapterArticle = (data = {}) => {
  return {
    sku: data.Sku || "",
    name: data.Nombre_Comercial || "",
    price: data.Precio_SD || 0,
    discountedPrice: data.Precio_CD || 0,
    discount: data.Descuento_Porcentaje || 0,
    shortDescription: data.Descripcion_p || "",
    image: [data.Imagen_1] || [],
    images:
    [
      data.Imagen_1,
      data.Imagen_2,
      data.Imagen_3,
      data.Imagen_4,
      data.Imagen_5,

    ] || [],
    colors: data.colores || [],
    brands: data.marcas || [],
    tags: data.etiquetas || [],
    sizes: data.tallas || [],
    
  };
};



export const adapterArticleDetail = (articulo = {}) => {
  return {
    id: articulo.id || articulo.sku || "",
    sku: articulo.sku || "",
    name: articulo.name || "",
    price: parseFloat(articulo.price) || 0,
    discount: 0, // Aquí puedes calcular si tienes lógica de descuentos
    new: articulo.new || false, // Puedes cambiarlo si tienes info para detectarlo
    rating: 0, // Cambiar si hay rating
    saleCount: 0, // Cambiar si tienes número de ventas
    //stock: articulo.variation.reduce((total, variante) => total + (variante.stock || 0), 0),
    shortDescription: articulo.description || "",
    fullDescription: articulo.description || "",
    category: [], // Si tienes categoría para asignar
    tag: [], // Si tienes etiquetas
    image: articulo.images ? articulo.images.filter(Boolean) : [],
    stock: articulo.stock,
    sizes: articulo.sizes,
    colors: articulo.colors,
    variation:articulo.variation,
    relatedProducts: articulo.related || []
  };
};

