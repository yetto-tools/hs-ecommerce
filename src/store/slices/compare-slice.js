import { showToast } from "../../toast/toastManager";

const { createSlice } = require("@reduxjs/toolkit");

const compareSlice = createSlice({
  name: "compare",
  initialState: {
    compareItems: [],
  },
  reducers: {
    addToCompare(state, action) {
      state.compareItems.push(action.payload);

      showToast("Agregado a comparar", "success", "bottom-left");
    },
    deleteFromCompare(state, action) {
      state.compareItems = state.compareItems.filter(
        (item) => item.id !== action.payload
      );

      showToast("Eliminado de comparar", "success", "bottom-left");
    },
  },
});

export const { addToCompare, deleteFromCompare } = compareSlice.actions;
export default compareSlice.reducer;
