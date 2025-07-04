import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./store/store";
import PersistProvider from "./store/providers/persist-provider";
// import { setProducts } from "./store/slices/product-slice"
// import products from "./data/products.json";
import "animate.css";
import "swiper/swiper-bundle.min.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "./assets/scss/style.scss";
import "./i18n";
import { ToastProvider } from "./toast/ToastContext";
import "./toast/_toast.css";

// store.dispatch(setProducts(products));

const container = document.getElementById("root");
const root = createRoot(container);

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => console.log("✅ SW registrado:", reg.scope))
      .catch((err) => console.error("❌ Falló el registro del SW:", err));
  });
}

root.render(
  <Provider store={store}>
    <PersistProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </PersistProvider>
  </Provider>
);
