const { createSlice } = require("@reduxjs/toolkit");

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [], // ✅ Debe estar definido como array desde el inicio
    filteredArticles: [],
    loading: false,
    error: null,
    filters: {},
  },
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },

    setFilters(state, action) {
      state.filters = {
        ...state.filters,
        [action.payload.filterType]: action.payload.value,
      };
      // Aplica filtros cada vez que se actualizan
      state.filteredArticles = applyFilters(state.articles, state.filters);
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

// Función para aplicar filtros a los artículos
function applyFilters(articles, filters) {
  return articles.filter((article) => {
    return Object.entries(filters).every(([key, value]) => {
      // Ignorar el filtro si el valor es 'all', undefined o null
      if (value === "all" || value === undefined || value === null) return true;
      if (key === "brand") return article.brand === value;
      if (key === "color") return article.color === value;
      if (key === "size") return article.size === value;
      if (key === "tag") return article.tags.includes(value);
      return true;
    });
  });
}

export const { setArticles, setFilters, setLoading, setError } =
  articlesSlice.actions;
export default articlesSlice.reducer;
