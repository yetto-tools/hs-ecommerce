const { createSlice } = require("@reduxjs/toolkit");

const socialMediaSlice = createSlice({
  name: "socialMedia",
  initialState: {},
  reducers: {
    setSocialMedia(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setSocialMedia, socialMedia } = socialMediaSlice.actions;
export default socialMediaSlice.reducer;
