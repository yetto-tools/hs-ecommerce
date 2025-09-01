import { createSlice } from "@reduxjs/toolkit";

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState: {
    items: [],     // aquí guardamos el array de redes
    loading: false // flag opcional de carga
  },
  reducers: {
    setSocialMedia(state, action) {
      state.items = Array.isArray(action.payload) ? action.payload : [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    }
  }
});

export const { setSocialMedia, setLoading } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
