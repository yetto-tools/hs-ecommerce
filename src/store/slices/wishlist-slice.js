import { showToast } from "../../toast/toastManager";

const { createSlice } = require("@reduxjs/toolkit");

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlistItems: [],
  },
  reducers: {
    addToWishlist(state, action) {
      const isInWishlist = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (isInWishlist > -1) {
        showToast("Producto ya en wishlist", "info", "bottom-left");
      } else {
        state.wishlistItems.push(action.payload);

        showToast("Agregado a wishlist", "success", "bottom-left");
      }
    },
    deleteFromWishlist(state, action) {
      state.wishlistItems = state.wishlistItems.filter(
        (item) => item.id !== action.payload
      );

      showToast("Eliminado de wishlist", "success", "bottom-left");
    },
    deleteAllFromWishlist(state) {
      state.wishlistItems = [];
    },
  },
});

export const { addToWishlist, deleteFromWishlist, deleteAllFromWishlist } =
  wishlistSlice.actions;
export default wishlistSlice.reducer;
