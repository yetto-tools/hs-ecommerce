import { Fragment, useState, useEffect, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";

import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import {
  fetchArticles,
  fetchSearchArticles,
} from "../../hooks/use-FetchArticles";
import ShopSidebarFilters from "./ShopSidebarFilters";

const ShopProducts = lazy(() => import("../../wrappers/product/ShopProducts"));

const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");

  // ✅ usamos filteredArticles
  const { filteredArticles, articles } = useSelector((state) => state.articles);
  const { params } = useSelector((state) => state.urlParams);
  const filters = useSelector((state) => state.filters);

  const location = useLocation();
  const [searchParams] = useSearchParams();
  const busqueda = searchParams.get("busqueda");

  const { pathname } = location;
  const dispatch = useDispatch();

  const [n1 = 0, n2 = 0, n3 = 0] = params?.split("/").map(Number) || [];

  useEffect(() => {
    if (!busqueda) {
      dispatch(fetchArticles(n1 || 0, n2 || 0, n3 || 0));
    } else {
      dispatch(fetchSearchArticles(busqueda));
    }
  }, [dispatch, searchParams, params]);

  const getLayout = (layout) => {
    setLayout(layout);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Tienda en Línea"
        description="Adidas, Nike, New balance, Jordan, Puma, Reebok."
        image={`${process.env.REACT_APP_IMAGE_ROOT}/logo-w-colors.png`}
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Tienda", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-10 pb-100">
          <div className="container-fluid">
            <div className="row col-lg-12 mx-auto">
              <div className="col-xl-2 col-lg-3 order-2 order-lg-1 border-right">
                {/* shop sidebar */}
                <ShopSidebarFilters filters={filters} sideSpaceClass="" />
              </div>

              <div className="col-xl-10 col-lg-9 order-1 order-lg-2 mx-auto">
                {/* shop products */}
                <ShopProducts
                  layout={layout}
                  products={filteredArticles.length ? filteredArticles : null}
                />

                {/* pagination */}
                <div className="pro-pagination-style text-center mt-30"></div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
