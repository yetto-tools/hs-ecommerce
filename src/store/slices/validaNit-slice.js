const { createSlice } = require("@reduxjs/toolkit");

const validaNitSlice = createSlice({
  name: "validarNit",
  initialState: {
    validacionNit: null,
    loading: false,
    error: null,
    
  },
  reducers: {
    setValidacionNit(state, action) {
        state.validacionNit = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },


  },
});

export const { setValidacionNit,setLoading, setError, } = validaNitSlice.actions;
export default validaNitSlice.reducer;
