const { createSlice } = require("@reduxjs/toolkit");

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [], // ✅ Debe estar definido como array desde el inicio
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setArticles(state, action) {
      state.articles = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
