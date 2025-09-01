const { createSlice } = require("@reduxjs/toolkit");

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    brands: [],
    colors: [],
    sizes: [],
    tags: [],
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      return { ...state, ...action.payload }; // machaca solo lo que traiga el payload
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

export const { setFilters, setLoading, setError } = filtersSlice.actions;
export default filtersSlice.reducer;