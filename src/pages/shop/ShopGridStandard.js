// orlando
// 2023-12-02
// vista de productos con filtros

import { Fragment, useState, useEffect, lazy } from "react";
import Paginator from "react-hooks-paginator";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { getIdsFromUrl, getSortedProducts } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import ShopSidebar from "../../wrappers/product/ShopSidebar";
import ShopTopbar from "../../wrappers/product/ShopTopbar";

import {
  fetchArticles,
  fetchSearchArticles,
} from "../../hooks/use-FetchArticles";

const ShopProducts = lazy(() => import("../../wrappers/product/ShopProducts"));
const ShopSidebarFilters = lazy(() => import("../shop/ShopSidebarFilters"));

const ShopGridStandard = () => {
  const [layout, setLayout] = useState("grid three-column");
  const [sortType, setSortType] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [filterSortType, setFilterSortType] = useState("");
  const [filterSortValue, setFilterSortValue] = useState("");
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);

  const { articles } = useSelector((state) => state.articles);
  const { filters } = useSelector((state) => state.filters);
  const { filteredArticles } = useSelector((state) => state.articles);

  const menu = useSelector((state) => state.menu.menu);
  const location = useLocation();
  const pathname = location.pathname;

  const dispatch = useDispatch();

  const { n1, n2, n3 } = getIdsFromUrl(menu, pathname);

  useEffect(() => {
    if (!pathname.includes("busqueda")) {
      dispatch(fetchArticles(n1, n2, n3));
    } else {
      dispatch(fetchSearchArticles(pathname.split("=")[1]));
    }
  }, [dispatch, n1, n2, n3]);

  useEffect(() => {
    console.log(filters);
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Tienda en Línea"
        description="Tienda en Línea de New Era"
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Tienda", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container-fluid">
            <div className="row col-lg-11 mx-auto">
              <div className="col-lg-3 order-2 order-lg-1">
                {/* shop sidebar */}

                <ShopSidebarFilters filters={filters} sideSpaceClass="" />
              </div>
              <div className="col-lg-9 order-1 order-lg-2">
                {/* shop topbar */}
                {/* <ShopTopbar
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  productCount={articles.length}
                  sortedProductCount={currentData.length}
                /> */}

                {/* shop products */}

                <ShopProducts layout={layout} products={articles} />

                {/* pagination */}
                <div className="pro-pagination-style text-center mt-30">
                  {/* <Paginator
                    totalRecords={sortedProducts.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  /> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default ShopGridStandard;
