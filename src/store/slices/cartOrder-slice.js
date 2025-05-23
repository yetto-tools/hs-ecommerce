const { createSlice } = require("@reduxjs/toolkit");

const cartOrderSlice = createSlice({
  name: "cartOrder",
  initialState: {
    cartOrder: {},

    paymentReponse: {},
    loading: false,
    error: null,
  },
  reducers: {
    
    setcartOrder(state, action) {
      state.cartOrder = action.payload;
      state.loading = false;
      state.error = null;
    },
    setcartOrderPayment(state, action) {
      state.paymentReponse = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
     cleanCartOrder(state) {
      state.cartOrder = {};
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setcartOrder, cartOrder,cleanCartOrder, setLoading, setError } = cartOrderSlice.actions;
export default cartOrderSlice.reducer;
