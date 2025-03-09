const adapterProduct = (product, idxProduct) => {
  return {
    id: product.SkuArt,
    sku: product?.SkuArt || "",
    name: product?.NombreComerArt || "",
    price: product?.price || 0,
    discount: product?.discount || 0,
    new: product?.new || false,
    rating: product?.rating || 0,
    saleCount: product?.saleCount || 0,
    category: product?.Categoria
      ? Array.from(product?.Categoria?.split(", "))
      : [],
    silueta: product.silueta || [],
    tag: product.Etiquetas?.split(", ") || [],
    stock: Number(product?.stock) || 0,
    image: [product?.Imagen1, product?.Imagen2] || [],
    variation: product.variation || [
      {
        color: product?.color || "solid",
        image: product?.image || "",
        size: product?.talla || [
          {
            name: product?.variation?.size || "OSFA",
            stock: product?.variation?.stock || 0,
          },
        ],
      },
    ],
    shortDescription: product.DescripPeq,
    fullDescription: product.Description || "",
  };
};


export const adapterArticleDetail2 = (data = {}, tallas = [], colores = [], marcas = [], etiquetas = []) => {
  console.log(data);
  return {
    sku: data.Sku || "",
    name: data.Nombre_Comercial || "",
    price: parseFloat(data.Precio_SD) || 0,
    discountedPrice: parseFloat(data.Precio_CD) || 0,
    discount: parseFloat(data.Descuento_Porcentaje) || 0,
    shortDescription: data.Descripcion_p || "",
    image: ["/ftp_imagenes/articulos/" + data.Imagen_1] || [],
    images: [
      "/ftp_imagenes/articulos/" + data.Imagen_1,
      "/ftp_imagenes/articulos/" + (data.Imagen_2 || undefined),
      "/ftp_imagenes/articulos/" + (data.Imagen_3 || undefined),
      "/ftp_imagenes/articulos/" + (data.Imagen_4 || undefined),
      "/ftp_imagenes/articulos/" + (data.Imagen_5 || undefined)
    ].filter(img => !img.endsWith("undefined")), // Evita rutas inválidas
    colors: colores.map(color => ({
      id: color.idColor,
      name: color.name
    })),
    sizes: tallas.map(talla => ({
      id: talla.idTalla,
      name: talla.Nombre
    })),
    brand: marcas.find(marca => marca.Nombre === data.Nombre_Comercial)?.Nombre || "",
    tags: etiquetas.map(etiqueta => etiqueta.value),
    stock: data.stock || 0,
    stockStatus: (data.stock && data.stock > 0) ? "instock" : "outofstock",
  
    url: data.Url || ""
  };
};

export const adapterArticleDetail = (data = {}, tallas = [], colores = [], marcas = [], etiquetas = []) => {
  console.log(data);
  return data;
};

export const adapterProductsCategories = (products) => {
  return products.map((product) => {});
};

export default adapterProduct;
