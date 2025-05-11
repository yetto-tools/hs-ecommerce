import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import storageSession from "redux-persist/lib/storage/session"; // sessionStorage
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
import validaNitReducer from "./slices/validaNit-slice";
import urlParamsReducer from "./slices/urlParams-slice";
import paramsWebReducer from "./slices/paramsWeb-slice";
import orderReducer from "./slices/order-slice";
import sendEmailReducer from "./slices/emailSend-slice";

const persistConfig = {
  key: "flone",
  version: 1.1,
  storage,
  blacklist: [
    "currency",
    "compare",
    "wishlist",
    "menu",
    "articles",
    "usuario",
    "validarNit",
    "urlParams",
    "sendEamil",
    "address",
    "newArrivals",
  ],
};

// Configuración específica para el reducer del usuario (usa sessionStorage)
const usuarioPersistConfig = {
  key: "usuario",
  storage: storageSession,
};

// Configuración específica para el reducer de address (usa sessionStorage)
const addressPersistConfig = {
  key: "address",
  storage: storageSession,
};
const newArrivalsPersistConfig = {
  key: "newArrivals",
  storage: storageSession,
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
  newArrivals: persistReducer(newArrivalsPersistConfig, newArrivalsReducer),
  usuario: persistReducer(usuarioPersistConfig, usuarioReducer),
  address: persistReducer(addressPersistConfig, usuarioReducer),
  token: usuarioReducer,
  validarNit: validaNitReducer,
  urlParams: urlParamsReducer,
  paramsWeb: paramsWebReducer,
  order: orderReducer,
  sendEmail: sendEmailReducer,
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
