import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import currencyReducer from "./slices/currency-slice";
import cartReducer from "./slices/cart-slice";
import compareReducer from "./slices/compare-slice";
import wishlistReducer from "./slices/wishlist-slice";
import menuReduce from "./slices/menu-slice";
import articlesReducer from "./slices/articles-slice";
import articleDetailReducer from "./slices/articleDetail-slice";
import loadingReducer from "./slices/loading-slice";
import newArrivalsReducer from "./slices/newArrivals-slice";
import usuarioReducer from "./slices/usuario-slice";
import filtersReducer from "./slices/filters-slice";
const persistConfig = {
  key: "flone",
  version: 1.1,
  storage,
  blacklist: ["currency", "compare", "wishlist"],
  // blacklist: ["currency", "cart", "compare", "wishlist", "menu", "articles"],
};

const rootReducer = combineReducers({
  currency: currencyReducer,
  cart: cartReducer,
  compare: compareReducer,
  wishlist: wishlistReducer,
  menu: menuReduce,
  articles: articlesReducer,
  articleDetail: articleDetailReducer,
  loader: loadingReducer,
  filters: filtersReducer,
  newArrivals: newArrivalsReducer,
  usuario: usuarioReducer,
  address: usuarioReducer,
  token: usuarioReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(), // Aquí puedes agregar middleware adicional si es necesario
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
