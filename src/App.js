import { Suspense, lazy, useEffect } from "react";
import ScrollToTop from "./helpers/scroll-top";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ProtectedRoute } from "./wrappers/ProtectedRoute";
import { fetchMenu } from "./hooks/use-FetchMenu";
import { fetchCountry, fetchParamsWeb } from "./hooks/use-FetchParams";
import { PageSuccessPayment } from "./pages/payment/PageSuccessPayment";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import BacCheckout from "./pages/other/BacCheckout";
import ShopGridMarcas from "./pages/shop/ShopGridMarcas";
import CheckoutWithoutLogin from "./pages/other/WitoutLogin/CheckoutWithoutLogin";

import Product from "./pages/shop-product/Product";

const PageReturnPolicy = lazy(() => import("./pages/other/PageReturnPolicy"));
const PagePreguntasFrecuentes = lazy(() =>
  import("./pages/other/PagePreguntasFrecuentes")
);
const PageUbicaciones = lazy(() => import("./pages/other/PageUbicaciones"));

const PageVersion = lazy(() => import("./pages/other/PageVersion"));

// home pages

const HomeFashionTwo = lazy(() => import("./pages/home/HomeFashionTwo"));
// const HomeSelectedCategory = lazy(()=>import("./pages/home/HomeSelectedCategory"));

// shop pages
const ShopGridStandard = lazy(() => import("./pages/shop/ShopGridStandard"));

// other pages
const About = lazy(() => import("./pages/other/About"));
const Contact = lazy(() => import("./pages/other/Contact"));
const MyAccount = lazy(() => import("./pages/other/MyAccount"));
const LoginRegister = lazy(() => import("./pages/other/LoginRegister"));
const Cart = lazy(() => import("./pages/other/Cart"));
const Checkout = lazy(() => import("./pages/other/Checkout"));
const PageTerminosYCondiciones = lazy(() =>
  import("./pages/other/PageTerminosYCondiciones")
);
const PaymentPage = lazy(() => import("./pages/payment/PaymentPage"));
const NotFound = lazy(() => import("./pages/other/NotFound"));

export const LoadingIndicator = (
  <div className="flone-preloader-wrapper">
    <div className="flone-preloader center-loader">
      <span></span>
      <span></span>
    </div>
  </div>
);

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchMenu());
    dispatch(fetchParamsWeb());
    dispatch(fetchCountry());
  }, [dispatch]);
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
              path={process.env.PUBLIC_URL + "/producto/:slug"}
              element={<Product />}
            /> */}

            <Route
              path={process.env.PUBLIC_URL + "/productos"}
              element={<ShopGridStandard />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/marca/:slug"}
              element={<ShopGridMarcas />}
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

            <Route
              path={process.env.PUBLIC_URL + "/mi-cuenta"}
              element={
                <ProtectedRoute>
                  <MyAccount />
                </ProtectedRoute>
              }
            />

            <Route
              path={process.env.PUBLIC_URL + "/registrarse"}
              element={<LoginRegister />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/pago"}
              element={<PaymentPage />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/login"}
              element={<LoginRegister />}
            />

            <Route path={process.env.PUBLIC_URL + "/cart"} element={<Cart />} />

            <Route
              path={process.env.PUBLIC_URL + "/checkout"}
              element={<CheckoutWithoutLogin />}
            />

            <Route
              path={process.env.PUBLIC_URL + "/checkout-bac"}
              element={<BacCheckout />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/terminos-y-condiciones"}
              element={<PageTerminosYCondiciones />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/preguntas-frecuentes"}
              element={<PagePreguntasFrecuentes />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/politicas-de-devolucion"}
              element={<PageReturnPolicy />}
            />
            <Route
              path={process.env.PUBLIC_URL + "/ubicaciones"}
              element={<PageUbicaciones />}
            />
            <Route path="/confirmar-pago" element={<PageSuccessPayment />} />
            <Route path="/pago-exito" element={<PageSuccessPayment />} />

            <Route path="/version" element={<PageVersion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ScrollToTop>
    </Router>
  );
};

export default App;
