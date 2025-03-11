import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../../store/slices/cart-slice";
import { Modal } from "react-bootstrap";
import { CurrencyFormatter } from "../../helpers/currencyFormatter";
import { VariantSelector } from "./VariantSelector";
import Swiper, { SwiperSlide } from "../../components/swiper";

import { ROOT_IMAGE } from "../../config";
import { EffectFade, Navigation, Thumbs } from "swiper";

function ProductModal2({ show, onHide, currency }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { articleDetail } = useSelector((state) => state.articleDetail);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [productStock, setProductStock] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  const { i18n } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const handleAddToCart = () => {
    if (selectedVariant && productStock > 0) {
      dispatch(addToCart({ ...selectedVariant, quantity: quantityCount }));
    }
  };

  const handleBuyNow = () => {
    if (selectedVariant && productStock > 0) {
      dispatch(addToCart({ ...selectedVariant, quantity: quantityCount }));
      Navigate("/cart");
    }
  };

  const canAddToCart = productStock > 0 && quantityCount <= productStock;
  const gallerySwiperParams = {
    spaceBetween: 10,
    loop: true,
    effect: "fade",
    fadeEffect: {
      crossFade: true,
    },
    thumbs: { swiper: thumbsSwiper },
    modules: [EffectFade, Thumbs],
  };

  const thumbnailSwiperParams = {
    onSwiper: setThumbsSwiper,
    spaceBetween: 10,
    slidesPerView: 2,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    autoplay: true,
    slideToClickedSlide: true,
    navigation: true,
    modules: [Thumbs, Navigation],
  };
  return (
    <Modal
      show={show}
      onHide={onHide}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper px-4">
                <Swiper options={gallerySwiperParams}>
                  {articleDetail.images &&
                    articleDetail.images.map((image, index) => (
                      <SwiperSlide key={index}>
                        <img
                          src={`${ROOT_IMAGE}${image}`}
                          alt={articleDetail.name}
                          className="img-fluid"
                        />
                      </SwiperSlide>
                    ))}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-40" id="thumbnail">
                <Swiper options={thumbnailSwiperParams}>
                  {articleDetail.image &&
                    articleDetail.images.map((image, i) => {
                      return (
                        <SwiperSlide key={i} className="svg-slider-arrow-black">
                          <div className="single-image">
                            <img
                              src={ROOT_IMAGE + image}
                              className="img-fluid object-fit-cover"
                              alt={articleDetail.name}
                            />
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-7 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{articleDetail.name}</h2>
                <div className="product-details-price">
                  {CurrencyFormatter(
                    articleDetail.discountedPrice || articleDetail.price,
                    i18n,
                    currency
                  )}
                </div>
                <VariantSelector
                  articleDetail={articleDetail}
                  setSelectedVariant={setSelectedVariant}
                  setProductStock={setProductStock}
                />

                <div
                  className="pro-details-quality"
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(1, 1fr)",
                    gridRowGap: "1.5rem",
                  }}
                >
                  <div className="cart-plus-minus">
                    <button
                      className="dec qtybutton text-black"
                      disabled={quantityCount <= 1}
                      onClick={() =>
                        setQuantityCount((count) => Math.max(1, count - 1))
                      }
                    >
                      -
                    </button>
                    <input
                      className="cart-plus-minus-box text-black text-center"
                      type="number"
                      value={quantityCount}
                      readOnly
                    />

                    <button
                      className="inc qtybutton text-black"
                      disabled={quantityCount >= productStock}
                      onClick={() =>
                        setQuantityCount((count) =>
                          Math.min(productStock, count + 1)
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <div className="pro-details-cart ">
                    <div className="d-flex align-items-center justify-content-start gap-5 mt-3">
                      <button
                        className="px-4 py-3 bg-black text-white fw-semibold"
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}
                      >
                        Añadir al carrito{" "}
                      </button>
                      <button
                        className="px-4 py-3 bg-black text-white fw-semibold"
                        onClick={handleBuyNow}
                        disabled={!canAddToCart}
                      >
                        Comprar Ahora{" "}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="pro-details-list container-md mt-4 max-h-25 overflow-y-scroll">
                  <details className="">
                    <summary>Descripción</summary>
                    <p className="text-break">
                      {articleDetail.shortDescription}
                    </p>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ProductModal2.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  currency: PropTypes.shape({}),
};

export default ProductModal2;
