const { createSlice } = require("@reduxjs/toolkit");

const filtersSlice = createSlice({
  name: "filters",
  initialState: {
    filters: {},
    loading: false,
    error: null,
  },
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
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

export const { setFilters, setDataFilter, setLoading, setError } =
  filtersSlice.actions;
export default filtersSlice.reducer;
