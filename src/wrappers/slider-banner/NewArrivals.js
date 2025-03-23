import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ProductModal from "../../components/product/ProductModal2";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ROOT_IMAGE } from "../../config";
import {
  fetchArticleDetail,
  fetchNewArticles,
} from "../../hooks/use-FetchArticles";

SwiperCore.use([Navigation]);

const ProductCard = ({ product, currency, openModal }) => {
  const { i18n } = useTranslation();
  return (
    <div className="container-fluid col-lg-9 col-md-12 col-sm-12 col-12 mx-auto my-5 slider-area"  onClick={openModal} style={{cursor: "pointer"}}>
      <Link to={product.url} className="">
        <div className="container row product-card mx-auto">
          <div className="d-flex align-items-center justify-content-center align-content-around">
            <div className="pro-same-action pro-quickview">
              <button onClick={openModal} title="Quick View" className="btn">
                <LazyLoadImage
                  src={ROOT_IMAGE + product.images[0]}
                  alt={product.name}
                  className="img"
                  width={192}
                  height={192}
                  style={{
                    objectFit: "cover",
                    backgroundColor: "transparent",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    aspectRatio: "8/7",
                    transform: "scaleX(-1)",
                    transition: "transform 0.5s ease-in-out",
                    transformOrigin: "center center",
                  }}
                />
              </button>
            </div>
          </div>
          <div className="container-fluid d-flex flex-column justify-content-center flex-wrap mt-">
            <div className="row col-10 text-center mx-auto w-100 mt-1">
              <h5 className="text-md text-ellipsis mt-1">
                {product && product.name}
              </h5>

              <span className="text-lg">
                <button
                  className="price border px-4 font-semibold button-active-hs btn-white border-black"
                  style={{ paddingBlock: "0.3rem" , color: "black", borderRadius: "8px", }}
                >
                  {Intl.NumberFormat(i18n.language, {
                    style: "currency",
                    currency: currency.currencyName,
                  }).format(product.discountedPrice)}
                </button>
              </span>

              {product.discount > 0 && (
                <p className="text-md font-semibold mt-2 pb-4">
                  <del>
                    {Intl.NumberFormat(i18n.language, {
                      style: "currency",
                      currency: currency.currencyName,
                    }).format(product.price)}
                  </del>
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

const NewArrivals = ({ spaceLeftClass = "", spaceRightClass = "" }) => {
  const currency = useSelector((state) => state.currency);
  const [modalShow, setModalShow] = useState(null);
  const dispatch = useDispatch();
  const { newArrivals } = useSelector((state) => state.newArrivals);
  const { loading } = useSelector((state) => state.articleDetail);

  useEffect(() => {
    dispatch(fetchNewArticles());
  }, [dispatch]);

  const handleClickProductModal = (product) => {
    
    dispatch(fetchArticleDetail(product.sku));
    if (loading === false) {
      setModalShow(product);
    }
  };

  return (
    <>
      <div
        className="container-fluid row mx-auto sm:px-6 lg:px-8"
        style={{ height: "96dvh" }}
      >
        <section
          className={clsx(
            "container-fluid align-self-center mx-auto sm:px-6 lg:px-8 slider-area",
            spaceLeftClass,
            spaceRightClass
          )}
        >
          <h1 className="text-5xl font-medium text-left uppercase mx-4">
            {"Nuevos Ingresos"}
          </h1>
          <div className="slider-active-black nav-style-1-black">
            <Swiper
              modules={[Navigation]}
              navigation={{
                nextEl: ".hs-custom-next",
                prevEl: ".hs-custom-prev",
              }}
              slidesPerView={4}
              loop={true}
              autoplay={{ delay: 5000 }}
              speed={1500}
              breakpoints={{
                0: { slidesPerView: 1, spaceBetween: 2 },
                576: { slidesPerView: 2, spaceBetween: 5 },
                768: { slidesPerView: 2, spaceBetween: 10 },
                901: { slidesPerView: 3, spaceBetween: 10 },
                1024: { slidesPerView: 4, spaceBetween: 10 },
              }}
            >
              {newArrivals.map((product, index) => (
                <SwiperSlide key={product.id || `product-${index}`}>
                  <ProductCard
                    product={product}
                    currency={currency}
                    openModal={() => {
                      handleClickProductModal(product);
                    }}
                  />
                </SwiperSlide>
              ))}

              {/* Botones personalizados */}
              <button className="hs-custom-prev hs-custom-next-black">
                <ChevronLeft size={48} />
              </button>
              <button className="hs-custom-next hs-custom-prev-black">
                <ChevronRight size={48} />
              </button>
            </Swiper>
          </div>
        </section>
      </div>

      {/* Product Modal */}
      {modalShow && (
        <ProductModal
          show={!!modalShow}
          onHide={() => setModalShow(null)}
          product={modalShow}
          currency={currency}
          discountedPrice={modalShow.priceDiscount}
          finalProductPrice={modalShow.price}
          finalDiscountedPrice={modalShow.priceDiscount}
        />
      )}
    </>
  );
};

export default NewArrivals;
