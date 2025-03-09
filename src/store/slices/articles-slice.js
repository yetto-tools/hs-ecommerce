const { createSlice } = require("@reduxjs/toolkit");

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [], // ✅ Debe estar definido como array desde el inicio
  },
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
    },
  },
});

export const { setArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
