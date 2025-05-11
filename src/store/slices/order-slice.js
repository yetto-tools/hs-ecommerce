const { createSlice } = require("@reduxjs/toolkit");

const orderSlice = createSlice({
  name: "order",
  initialState: {
    order: {},

    paymentReponse: {},
    loading: false,
    error: null,
  },
  reducers: {
    setOrder(state, action) {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    },
    setOrderPayment(state, action) {
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
  },
});

export const { setOrder, setLoading, setError } = orderSlice.actions;
export default orderSlice.reducer;
