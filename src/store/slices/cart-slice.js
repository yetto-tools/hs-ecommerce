import { v4 as uuidv4 } from "uuid";
import { showToast } from "../../toast/toastManager";

const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      if (!product.variation) {
        const cartItem = state.cartItems.find((item) => item.id === product.id);
        if (!cartItem) {
          state.cartItems.push({
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4(),
          });
        } else {
          state.cartItems = state.cartItems.map((item) => {
            if (item.cartItemId === cartItem.cartItemId) {
              return {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
              };
            }
            return item;
          });
        }
      } else {
        const cartItem = state.cartItems.find(
          (item) =>
            item.id === product.id &&
            product.selectedProductColor &&
            product.selectedProductColor === item.selectedProductColor &&
            product.selectedProductSize &&
            product.selectedProductSize === item.selectedProductSize &&
            (product.cartItemId ? product.cartItemId === item.cartItemId : true)
        );
        if (!cartItem) {
          state.cartItems.push({
            ...product,
            quantity: product.quantity ? product.quantity : 1,
            cartItemId: uuidv4(),
          });
        } else if (
          cartItem !== undefined &&
          (cartItem.selectedProductColor !== product.selectedProductColor ||
            cartItem.selectedProductSize !== product.selectedProductSize)
        ) {
          state.cartItems = [
            ...state.cartItems,
            {
              ...product,
              quantity: product.quantity ? product.quantity : 1,
              cartItemId: uuidv4(),
            },
          ];
        } else {
          state.cartItems = state.cartItems.map((item) => {
            if (item.cartItemId === cartItem.cartItemId) {
              return {
                ...item,
                quantity: product.quantity
                  ? item.quantity + product.quantity
                  : item.quantity + 1,
                selectedProductColor: product.selectedProductColor,
                selectedProductSize: product.selectedProductSize,
              };
            }
            return item;
          });
        }
      }

      showToast("Añadio al Carrito", "success", "top-left");
    },
    deleteFromCart(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.cartItemId !== action.payload
      );
      showToast("Eliminado del Carrito", "info", "top-left");
    },
    decreaseQuantity(state, action) {
      const product = action.payload;
      if (product.quantity === 1) {
        state.cartItems = state.cartItems.filter(
          (item) => item.cartItemId !== product.cartItemId
        );

        showToast("Eliminado del Carrito", "info", "top-left");
      } else {
        state.cartItems = state.cartItems.map((item) =>
          item.cartItemId === product.cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );

        showToast("Eliminado del Carrito", "info", "top-left");
      }
    },
    deleteAllFromCart(state) {
      state.cartItems = [];
    },
    updateCartItemQuantity(state, action) {
      const { cartItemId, quantity } = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.cartItemId === cartItemId
      );
      if (index !== -1) {
        state.cartItems[index].quantity = quantity;
      }
    },
    markItemAsSoldOut(state, action) {
      const { cartItemId, isSoldOut } = action.payload;
      const index = state.cartItems.findIndex(
        (item) => item.cartItemId === cartItemId
      );
      if (index !== -1) {
        state.cartItems[index].isSoldOut = isSoldOut;
      }
    },
  },
});

export const {
  addToCart,
  deleteFromCart,
  decreaseQuantity,
  deleteAllFromCart,
  updateCartItemQuantity,
  markItemAsSoldOut,
} = cartSlice.actions;
export default cartSlice.reducer;
