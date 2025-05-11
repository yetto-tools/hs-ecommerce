import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { lazy, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SwiperCore, { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { LazyLoadImage } from "react-lazy-load-image-component";

import PropTypes from "prop-types";
const  ProductModal = lazy(()=>import("../../components/product/ProductModal2"));

SwiperCore.use([Navigation]);

const ProductCard = ({ product, currency, openModal, index }) => {
  const { i18n } = useTranslation();
  const { configParams } = useSelector((state) => state.paramsWeb);
  const varsion = Date.now();
  
  return (
    <div className="container-fluid col-lg-9 col-md-12 col-sm-12 col-12 mx-auto my-5 slider-area">
      <Link to={product.url}>
        <div className="container row product-card mx-auto">
          <div className="d-flex align-items-center justify-content-center align-content-around">
            <div className="pro-same-action pro-quickview">
              <button onClick={openModal} title="Quick View" className="btn">
                <LazyLoadImage
                  src={`${configParams.RUTAIMAGENESPRINCIPALES}${product.image[0]}?v=${varsion}`}
                  alt={product.name}
                  className="img image-banner-principal"
                  width={192}
                  height={192}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </button>
            </div>
          </div>
          <div className="container-fluid d-flex flex-column justify-content-center flex-wrap mt-">
            <div className="row col-10 text-center mx-auto w-100 mt-4">
              <h5 className="text-md text-ellipsis mt-5">
                {product && product.name}
              </h5>

              <span className="text-lg">
                <span className="price border px-4 py-1.5 font-semibold rounded border-dark">
                  {Intl.NumberFormat(i18n.language, {
                    style: "currency",
                    currency: currency.currencyName,
                  }).format(product.priceDiscount)}
                </span>
              </span>

              {product.discountedPrice > 0 && (
                <p className="text-md font-semibold">
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

const BannerPrincipal = ({
  products,
  spaceLeftClass = "",
  spaceRightClass = "",
}) => {
  const { i18n } = useTranslation();
  const currency = useSelector((state) => state.currency);
  const [modalShow, setModalShow] = useState(null);

  return (
    <>
      <div className="container-fluid row mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-medium text-left uppercase mx-4">
          Nuevos Ingresos
        </h1>
      </div>

      <section
        className={clsx(
          "container-fluid align-self-center mx-auto px-5 sm:px-6 lg:px-8 slider-area",
          spaceLeftClass,
          spaceRightClass
        )}
      >
        <div className="slider-active-black nav-style-1-black">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".hs-custom-next",
              prevEl: ".hs-custom-prev",
            }}
            slidesPerView={4}
            loop={true}
            breakpoints={{
              0: { slidesPerView: 1, spaceBetween: 2 },
              576: { slidesPerView: 2, spaceBetween: 5 },
              768: { slidesPerView: 2, spaceBetween: 10 },
              901: { slidesPerView: 3, spaceBetween: 10 },
              1024: { slidesPerView: 4, spaceBetween: 10 },
            }}
          >
            {products.map((product, index) => (
              <SwiperSlide key={product.id || `product-${index}`}>
                <ProductCard
                  product={product}
                  currency={currency}
                  openModal={() => setModalShow(product)}
                  index={index}
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

export default BannerPrincipal;

BannerPrincipal.propTypes = {
  products: PropTypes.array,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};
