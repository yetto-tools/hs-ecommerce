export const adapterFilterData = (data) => {
    return {
        categories: data.categorias || [],
        //tags: data.etiquetas || [],
        subcategories: data.subcategorias || [],
        brands: data.marcas || [],
        colors: data.colores || [],
        //sizes: data.tallas || [],
    }


}



