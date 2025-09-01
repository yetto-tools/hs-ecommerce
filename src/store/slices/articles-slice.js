const { createSlice } = require("@reduxjs/toolkit");

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],           // todos los artículos cargados desde API
    filteredArticles: [],   // artículos después de aplicar filtros
    loading: false,
    error: null,
    filters: {},            // objeto dinámico { brand: [], color: [], size: [], tag: [] }
  },
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
      state.filteredArticles = applyFilters(state.articles, state.filters);
    },
    setFilters(state, action) {
      const { filterType, value } = action.payload;
      const normalized = value.toUpperCase();

      if (normalized === "ALL") {
        const { [filterType]: removed, ...rest } = state.filters;
        state.filters = rest;
      } else {
        const existingFilters = state.filters[filterType] || [];
        if (existingFilters.includes(normalized)) {
          state.filters[filterType] = existingFilters.filter(
            (item) => item !== normalized
          );
          if (state.filters[filterType].length === 0) {
            delete state.filters[filterType];
          }
        } else {
          state.filters[filterType] = [...existingFilters, normalized];
        }
      }

      state.filteredArticles = applyFilters(state.articles, state.filters);
    },
    resetFilters(state) {
      state.filters = {};
      state.filteredArticles = state.articles;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});



// 🔎 Función que filtra en memoria según los filtros activos
function applyFilters(products, filters) {
  let results = products;

  results = results.filter((product) => {
    const { TagFacetas } = product;

    // Normalizamos todo a mayúsculas para evitar problemas de casing
    const marca = (TagFacetas?.Marca || "").toUpperCase();
    const colores = (TagFacetas?.Colores || "").toUpperCase();
    const tallas = (TagFacetas?.Tallas || "").toUpperCase();
    const etiquetas = (TagFacetas?.Etiquetas || "").toUpperCase();

    // Revisión de coincidencias
    const brandMatch =
      !filters.brand ||
      filters.brand.some((b) => marca.includes(b));

    const colorMatch =
      !filters.color ||
      filters.color.some((c) => colores.includes(c));

    const sizeMatch =
      !filters.size ||
      filters.size.some((s) => tallas.includes(s));

    const tagMatch =
      !filters.tag ||
      filters.tag.some((t) => etiquetas.includes(t));

    return brandMatch && colorMatch && sizeMatch && tagMatch;
  });

  return results;
}


export const { setArticles, setFilters, resetFilters, setLoading, setError } =
  articlesSlice.actions;
export default articlesSlice.reducer;
