// orlando rashon
// Modificado 2023-12-12
// modal con datos del producto

import { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Autoplay, EffectFade, Lazy, Navigation, Thumbs } from "swiper";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import Swiper, { SwiperSlide } from "../../components/swiper";

import { getProductCartQuantity } from "../../helpers/product";
import { addToCart } from "../../store/slices/cart-slice";
import { useTranslation } from "react-i18next";
import { CurrencyFormatter } from "../../helpers/currencyFormatter";
import { useNavigate } from "react-router-dom";
import { ROOT_IMAGE } from "../../config";
// import { LazyLoadImage } from 'react-lazy-load-image-component';

function ProductModal2({ currency, show, onHide }) {
  const { articleDetail } = useSelector((state) => state.articleDetail);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const { i18n } = useTranslation();

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  /* filtros de colores y tallas */

  const [selectedProductColor, setSelectedProductColor] = useState("");
  const [selectedProductSize, setSelectedProductSize] = useState("");

  const [productStock, setProductStock] = useState(articleDetail.stock || 0);
  const [quantityCount, setQuantityCount] = useState(1);

  const productCartQty = getProductCartQuantity(
    cartItems,
    articleDetail,
    selectedProductColor,
    selectedProductSize
  );

  const Navigate = useNavigate();

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

  const onCloseModal = () => {
    setThumbsSwiper(null);
    onHide();
  };

  const handleAddToCart = () => {
    console.log({ handleAddToCart: selectedVariant });
    if (selectedVariant) {
      dispatch(
        addToCart({
          ...selectedVariant,
          quantity: quantityCount,
        })
      );
    }
  };

  const handleGoToCart = () => {
    console.log({ handleGoToCart: selectedVariant });
    if (selectedVariant) {
      dispatch(
        addToCart({
          ...selectedVariant,
          quantity: quantityCount,
        })
      );
      Navigate("/cart");
    }
  };

  useEffect(() => {
    if (selectedProductSize && selectedProductColor) {
      const variant = articleDetail.variation.find(
        (v) =>
          v.size.name === selectedProductSize &&
          v.colors.some((c) => c.name === selectedProductColor)
      );

      setSelectedVariant(variant || null);

      if (variant) {
        setProductStock(variant.stock);
      } else {
        setProductStock(0);
      }
    } else {
      setSelectedVariant(null);
      setProductStock(0);
    }
  }, [selectedProductSize, selectedProductColor, articleDetail]);

  const updateVariant = (size, color) => {
    if (size && color) {
      const variant = articleDetail.variation.find(
        (v) => v.size.name === size && v.colors.some((c) => c.name === color)
      );

      setSelectedVariant(variant || null);
      setProductStock(variant ? variant.stock : 0);
    } else {
      setSelectedVariant(null);
      setProductStock(0);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton></Modal.Header>

      <div className="modal-body">
        <div className="row">
          <div className="col-md-5 col-sm-12 col-xs-12">
            <div className="product-large-image-wrapper px-4">
              <Swiper options={gallerySwiperParams}>
                {articleDetail.image &&
                  articleDetail.image.map((image, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <div className="single-image px-4">
                          <img
                            src={ROOT_IMAGE + image}
                            className="img-fluid object-fit-cover"
                            alt={articleDetail.name}
                            style={{
                              objectFit: "cover",
                              resize: "cover",
                            }}
                            width={480}
                            height={480}
                          />
                        </div>
                      </SwiperSlide>
                    );
                  })}
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
              <h2 className="text-break">{articleDetail.name}</h2>
              <div className="product-details-price">
                {articleDetail?.discountedPrice !== null ||
                articleDetail?.discountedPrice !== 0 ? (
                  <Fragment>
                    <span>
                      {CurrencyFormatter(
                        articleDetail?.discountedPrice,
                        i18n,
                        currency
                      )}
                    </span>{" "}
                    <span className="old">
                      {CurrencyFormatter(articleDetail.price, i18n, currency)}
                    </span>
                  </Fragment>
                ) : (
                  <span>
                    {CurrencyFormatter(articleDetail.price, i18n, currency)}
                  </span>
                )}
              </div>

              {articleDetail.variation ? (
                <div className="pro-details-size-color">
                  <div className="d-flex flex-column ">
                    <div className="pro-details-size mb-4">
                      <span className="fw-bold">Talla</span>
                      <div className="pro-details-size-content">
                        {articleDetail.sizes &&
                          articleDetail.sizes.map((sizes, key) => (
                            <label
                              className={`pro-details-size-content--single`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={sizes.name}
                                checked={sizes.name === selectedProductSize}
                                onChange={() => {
                                  setSelectedProductSize(sizes.name);
                                  setQuantityCount(1);
                                  updateVariant(
                                    sizes.name,
                                    selectedProductColor
                                  );
                                }}
                              />
                              <span className="size-name d-flex inline-block align-items-end justify-content-center">
                                {sizes.name}
                                <small className="lowercase fs-6">
                                  {sizes.unit || ""}
                                </small>
                              </span>
                            </label>
                          ))}
                      </div>
                    </div>

                    <div className="pro-details-color-wrap">
                      <span className="fw-bold">Color</span>
                      <div className="pro-details-color-content">
                        {articleDetail.colors &&
                          articleDetail.colors.map((singleColor, key) => (
                            <label
                              className={`pro-details-color-content--single ${singleColor.name}`}
                              key={key}
                            >
                              <input
                                type="radio"
                                value={singleColor.id}
                                className="font-regular"
                                checked={
                                  singleColor.name === selectedProductColor
                                    ? "checked"
                                    : ""
                                }
                                onChange={() => {
                                  setSelectedProductColor(singleColor.name); // O `singleColor.id`, dependiendo de cómo tengas en `variation`
                                  setQuantityCount(1);
                                  updateVariant(
                                    selectedProductSize,
                                    singleColor.name
                                  );
                                }}
                              />
                              <span
                                className="color-name"
                                style={{
                                  backgroundColor: `${singleColor.hex}`,
                                }}
                              ></span>
                            </label>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}

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
                    onClick={() =>
                      setQuantityCount(
                        quantityCount > 1 ? quantityCount - 1 : 1
                      )
                    }
                    className="dec qtybutton text-black"
                  >
                    -
                  </button>
                  <input
                    className="cart-plus-minus-box text-black"
                    type="text"
                    value={quantityCount}
                    readOnly
                  />
                  <button
                    onClick={() =>
                      setQuantityCount(
                        quantityCount < productStock - productCartQty
                          ? quantityCount + 1
                          : quantityCount
                      )
                    }
                    className="inc qtybutton text-black"
                  >
                    +
                  </button>
                </div>
                <div className="pro-details-cart ">
                  {productStock && productStock > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        className="px-4 py-3"
                        onClick={handleAddToCart}
                        disabled={productCartQty >= productStock}
                      >
                        Añadir al carrito{" "}
                      </button>

                      <button
                        type="button"
                        className="px-4 py-3"
                        onClick={handleGoToCart}
                        disabled={productCartQty >= productStock}
                      >
                        Comprar Ahora{" "}
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        gap: "0.5rem",
                      }}
                    >
                      <button disabled className="px-4 py-3">
                        {!selectedProductSize
                          ? "Seleccionar Talla"
                          : !selectedProductColor
                          ? "Seleccionar Color"
                          : "Seleccionar Color y Talla"}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="pro-details-list container-md h-25 overflow-y-scroll">
                <details className="">
                  <summary>Descripción</summary>
                  <p className="text-break">{articleDetail.shortDescription}</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

ProductModal2.propTypes = {
  currency: PropTypes.shape({}),
  onHide: PropTypes.func,
  articleDetail: PropTypes.shape({}),
  show: PropTypes.bool,
  wishlistItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
};

export default ProductModal2;
