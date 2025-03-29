const { createSlice } = require("@reduxjs/toolkit");

const sendEmailSlice = createSlice({
  name: "sendEmail",
  initialState: {
    email: {},
    loading: false,
    error: null,
  },
  reducers: {
    setSetMail(state, action) {
      state.email = action.payload;
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

export const { setSetMail, setLoading, setError } = sendEmailSlice.actions;
export default sendEmailSlice.reducer;
