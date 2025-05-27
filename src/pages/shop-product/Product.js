import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, Link } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import RelatedProductSlider from "../../wrappers/product/RelatedProductSlider";
import ProductDescriptionTab from "../../wrappers/product/ProductDescriptionTab";
import ProductImageDescription from "../../wrappers/product/ProductImageDescription";
import { fetchProductById } from "../../hooks/use-FetchDataProducts";
import { fetchArticleDetail } from "../../hooks/use-FetchArticles";
import useProductDetailLogic from "../../hooks/useProductDetailLogic";
import { ProductDetailRender } from "../../components/product/ProductDetailRender";
import { t } from "i18next";

const Product = () => {
  const { slug: id } = useParams();
  const dispatch = useDispatch();
  const { articleDetail, loading } = useSelector(
    (state) => state.articleDetail
  );
  const { pathname } = useLocation();

  useEffect(() => {
    if (id) {
      dispatch(fetchArticleDetail(id));
    }
  }, [dispatch, id]);

  return (
    <Fragment>
      <SEO
        titleTemplate={`Producto ${
          articleDetail?.name
            ? articleDetail.name
            : "Articulo no disponible" + id
        }`}
        description={
          articleDetail?.name
            ? articleDetail.shortDescription
            : "Articulo no disponible" + id
        }
        image={
          articleDetail?.images?.[0]
            ? `${process.env.REACT_APP_IMAGE_ROOT}${articleDetail.images[0]}`
            : null
        }
        url={`${process.env.REACT_APP_URL}${pathname}`}
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Producto", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <main className="container-xxl pt-60 pb-60 bg">
          <section className="row">
            <div className="col-lg-12">
              {articleDetail?.images?.length > 0 ? (
                <div className="product-large-image-wrapper">
                  <div className="container">
                    <ProductDetailRender articleDetail={articleDetail} />
                  </div>
                </div>
              ) : (
                <section className="row" style={{ minHeight: "28rem" }}>
                  <div className="container">
                    <div className="col-lg-12 text-center mb-5">
                      <h1>Articulo no disponible</h1>
                    </div>

                    <div className="row justify-content-center mt-5">
                      <div className="col-xl-7 col-lg-8 text-center">
                        <div className="error">
                          <p>
                            {t("page_not_found.description_message")
                              ? t("page_not_found.description_message")
                              : "OOPS! PAGE NOT FOUND"}
                          </p>

                          <form
                            className="searchform mb-50"
                            action={process.env.PUBLIC_URL + "/productos"}
                          >
                            <input
                              type="search"
                              name="busqueda"
                              id="error_search"
                              placeholder={
                                t("page_not_found.placeholder_search")
                                  ? t("page_not_found.placeholder_search")
                                  : "Search..."
                              }
                              className="searchform__input"
                            />
                            <button
                              type="submit"
                              className="searchform__submit text-black fw-bold"
                            >
                              <i className="fa fa-search" />
                            </button>
                          </form>
                          <Link
                            to={process.env.PUBLIC_URL + "/"}
                            className="btn-hover text-black fw-bold fs-1 my-5"
                          >
                            {t("page_not_found.placeholder_search")
                              ? t("page_not_found.back_to_home")
                              : "Volver a la página principal"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </section>
        </main>

        {/* product description with image */}
        {/* <ProductImageDescription
          spaceTopClass="pt-100"
          spaceBottomClass="pb-100"
          product={articleDetail}
        /> */}

        {/* product description tab */}
        {/* <ProductDescriptionTab
          spaceBottomClass="pb-90"
          productFullDesc={articleDetail.fullDescription}
        /> */}

        {/* related product slider */}
        {/* <RelatedProductSlider
          spaceBottomClass="pb-95"
          category={articleDetail.category[0]}
        /> */}
      </LayoutOne>
    </Fragment>
  );
};

export default Product;
