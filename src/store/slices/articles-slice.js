const { createSlice } = require("@reduxjs/toolkit");

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [], // ✅ Debe estar definido como array desde el inicio
    loading: false,
    error: null,
    filters: {},
  },
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },

    setFilter(state, action) {
      const { filterType, value } = action.payload;
      // Si el valor es 'all', elimina el filtro para ese tipo
      if (value === "all") {
        delete state.filters[filterType];
      } else {
        // Establece o actualiza el filtro para el tipo especificado
        state.filters[filterType] = value;
      }
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

export const { setArticles, setFilter, setLoading, setError } =
  articlesSlice.actions;
export default articlesSlice.reducer;
