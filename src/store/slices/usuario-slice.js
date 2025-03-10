const { createSlice } = require("@reduxjs/toolkit");

const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    usuario: null,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setUsuario(state, action) {
      state.usuario = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setUsuario, setError } = usuarioSlice.actions;
export default usuarioSlice.reducer;
