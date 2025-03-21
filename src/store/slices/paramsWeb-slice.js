const { createSlice } = require('@reduxjs/toolkit');

const paramsWebSlice = createSlice({
    name: "paramsWeb",
    initialState: {
        params: [],
        country: {},
        loading: false,
        error: null
    },
    reducers: {
        setParamsWeb: (state, action) => {
            state.params = action.payload
        },
        setCountry: (state, action) => {
            state.country = action.payload
        },
        setLoading(state, action) {
            state.loading = action.payload;
        },
        setError(state, action) {
            state.error = action.payload;
        },
    },
});

export const { setParamsWeb,setCountry, setLoading } = paramsWebSlice.actions;
export default paramsWebSlice.reducer;
