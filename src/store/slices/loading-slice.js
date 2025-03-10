const { createSlice } = require("@reduxjs/toolkit");

const loadingSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = loadingSlice.actions;
export default loadingSlice.reducer;
