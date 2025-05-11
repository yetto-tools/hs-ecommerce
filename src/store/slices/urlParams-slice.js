const { createSlice } = require("@reduxjs/toolkit");

const urlParamsSlice = createSlice({
  name: "urlParams",
  initialState: {
    params: null,
    loading: false,
    error: false,
    
  },
  reducers: {
    setUrlParams(state, action) {
        state.params = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },


  },
});

export const { setUrlParams, setLoading, setError, } = urlParamsSlice.actions;
export default urlParamsSlice.reducer;
