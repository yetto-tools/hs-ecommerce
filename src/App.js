import { Suspense, lazy, useEffect, useState } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "./wrappers/ProtectedRoute";

// home pages

const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
// const HomeSelectedCategory = lazy(()=>import("./pages/home/HomeSelectedCategory"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// product pages
const Product = lazy(() => import("./pages/shop-product/Product"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));

const Cart = lazy(() => import("./pages/other/Cart"));

const Checkout = lazy(() => import("./pages/other/Checkout"));

const NotFound = lazy(() => import("./pages/other/NotFound"));

export const LoadingIndicator = (
  <div className="flone-preloader-wrapper">
    <div className="flone-preloader">
      <span></span>
      <span></span>
    </div>
  </div>
);

const App = () => {
  const { loading } = useSelector((state) => state.loader);

  // Indicador de carga

  return (
    <Router>
      <ScrollToTop>
        {loading && LoadingIndicator}
        <Suspense fallback={LoadingIndicator}>
          <Routes>
            <Route
              path={process.env.PUBLIC_URL + "/"}
              element={<HomeFashionTwo />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/inicio"}
              element={<HomeFashionTwo />}
            />

            {/* Shop pages */}
            {/* <Route
              path={process.env.PUBLIC_URL + "/productos"}
              element={<ShopGridStandard />}
            /> */}

            {/* Shop pages */}
            <Route
              path={process.env.PUBLIC_URL + "/:categoria/*"}
              element={<ShopGridStandard />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/busqueda:valor"}
              element={<ShopGridStandard />}
            />

            {/* Other pages */}
            <Route
              path={process.env.PUBLIC_URL + "/nosotros"}
              element={<About />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/contact"}
              element={<Contact />}
            />

            {/* <Route
              path={process.env.PUBLIC_URL + ""}
              element={
                <></>
                // <MyAccount />
                // <ProtectedRoute>
                // </ProtectedRoute>
              }
            /> */}

            <Route
              path={process.env.PUBLIC_URL + "/registrarse"}
              element={<LoginRegister />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/login"}
              element={<LoginRegister />}
            />

            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />

            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<Checkout />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
