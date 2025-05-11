const { createSlice } = require("@reduxjs/toolkit");

const newArrivalsSlice = createSlice({
  name: "newArrivals",
  initialState: {
    newArrivals: [], // ✅ Debe estar definido como array desde el inicio
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setNewArrivals(state, action) {
      state.newArrivals = action.payload;
    },

    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setNewArrivals, setLoading, setError } =
  newArrivalsSlice.actions;
export default newArrivalsSlice.reducer;
