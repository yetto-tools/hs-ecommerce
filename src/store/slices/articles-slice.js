const { createSlice } = require("@reduxjs/toolkit");

const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    filteredArticles: [],
    loading: false,
    error: null,
    filters: {},
  },
  reducers: {
    setArticles(state, action) {
      state.articles = action.payload;
      state.filteredArticles = applyFilters(state.articles, state.filters); // Reapply filters when articles change
    },
    setFilters(state, action) {
      const { filterType, value } = action.payload;

      // If the filter value is "all", reset the filter type
      if (value === "all") {
        const { [filterType]: removed, ...rest } = state.filters;
        state.filters = rest;
      } else {
        // Ensure the filter type array exists
        const existingFilters = state.filters[filterType] || [];

        // Check if the value is already included, if so, remove it, if not, add it
        if (existingFilters.includes(value)) {
          state.filters[filterType] = existingFilters.filter(
            (item) => item !== value
          );
          if (state.filters[filterType].length === 0) {
            delete state.filters[filterType]; // Remove the key if no filters are left
          }
        } else {
          state.filters[filterType] = [...existingFilters, value];
        }
      }

      // Reapply filters to the articles
      state.filteredArticles = applyFilters(state.articles, state.filters);
    },

    resetFilters(state) {
      state.filters = {};
      state.filteredArticles = state.articles;
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

function applyFilters(products, filters) {
  let results = products;

  // Filtrar por color
  if (filters.color) {
    results = results.filter((product) =>
      product.colors.some((color) =>
        filters.color.includes(color.name.toUpperCase())
      )
    );
  }

  // Filtrar por tamaño
  if (filters.size) {
    results = results.filter((product) =>
      product.sizes.some((size) => filters.size.includes(size.name))
    );
  }

  // Filtrar por marca
  if (filters.brand) {
    results = results.filter((product) =>
      product.brands.some((brand) =>
        filters.brand.includes(brand.name.toUpperCase())
      )
    );
  }

  return results;
}

export const { setArticles, setFilters, resetFilters, setLoading, setError } =
  articlesSlice.actions;
export default articlesSlice.reducer;
