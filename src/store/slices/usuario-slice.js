const { createSlice } = require("@reduxjs/toolkit");

const usuarioSlice = createSlice({
  name: "usuario",
  initialState: {
    usuario: null,
    loading: false,
    error: null,
    isLoggedIn: false,
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
    login(state, action) {
      state.usuario = action.payload;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.usuario = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUsuario, setError, login, logout } = usuarioSlice.actions;
export default usuarioSlice.reducer;
