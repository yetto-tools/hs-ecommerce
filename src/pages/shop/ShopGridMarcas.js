// orlando
// 2023-12-02
// vista de productos con filtros

import { Fragment, useState, useEffect, lazy } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams, useSearchParams } from "react-router-dom";

import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import {
  fetchArticles,
  fetchFilterAritcle,
  fetchSearchArticles,
} from "../../hooks/use-FetchArticles";
import { jsonToXml } from "../../helpers/validator";

import ShopProducts from "../../wrappers/product/ShopProducts";

const ShopGridMarcas = () => {
  const [layout, setLayout] = useState("grid three-column");
  const { articles } = useSelector((state) => state.articles);
  const { params } = useSelector((state) => state.urlParams);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Obtener la categoría desde la URL

  const dispatch = useDispatch();

  const { slug: marca } = useParams(); // ✅ captura la marca desde la URL dinámica
  const { pathname } = useLocation();

  useEffect(() => {
    const loadData = async () => {
      if (!marca) {
        dispatch(fetchArticles());
      } else {
        const filtersToSend = {
          marca: [marca],
        };

        const xml = jsonToXml(filtersToSend, "955");
        if (xml) {
          await dispatch(fetchFilterAritcle(xml));
        }
      }
    };

    loadData();
  }, [dispatch, marca]);

  return (
    <Fragment>
      <SEO
        titleTemplate="Tienda en Línea"
        description="Adidas, Nike, New balance, Jordan, Puma, Reebok."
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: marca, path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container-fluid">
            <div className="row col-lg-12 mx-auto">
              <div className="col-lg-3 order-2 order-lg-1 hidden" hidden>
                {/* shop sidebar */}

                {/* <ShopSidebarFilters filters={filters} sideSpaceClass="" /> */}
              </div>
              <div className="col-lg-12 order-1 order-lg-2 mx-auto">
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

export default ShopGridMarcas;
