const { createSlice } = require("@reduxjs/toolkit");

const articleDetailSlice = createSlice({
  name: "article",
  initialState: {
    articleDetail: [], // ✅ Debe estar definido como array desde el inicio
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setArticleDetail(state, action) {
      state.articleDetail = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setArticleDetail, setLoading, setError } =
  articleDetailSlice.actions;
export default articleDetailSlice.reducer;
