import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addToCart } from "../../store/slices/cart-slice";
import { Modal } from "react-bootstrap";
import { CurrencyFormatter } from "../../helpers/currencyFormatter";
import { VariantSelector } from "./VariantSelector";
import { EffectFade, Thumbs } from "swiper";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductImageGallery from "./ProductImage";
import { showToast } from "../../toast/toastManager";

function ProductModal2({ show, onHide, currency }) {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const { articleDetail } = useSelector((state) => state.articleDetail);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [productStock, setProductStock] = useState(0);
  const [quantityCount, setQuantityCount] = useState(1);
  const { i18n } = useTranslation();
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const { cartItems } = useSelector((state) => state.cart);
  const [selectedVariantImage, setSelectedVariantImage] = useState([]);
  const cartItem = cartItems.find(
    (item) =>
      item.id === selectedVariant?.id &&
      item.selectedProductColor === selectedVariant?.selectedProductColor &&
      item.selectedProductSize === selectedVariant?.selectedProductSize
  );

  const cartQty = cartItem?.quantity || 0;
  const maxQtyDisponible = productStock - cartQty;

  // const handleAddToCart = () => {
  //   if (selectedVariant && productStock > 0) {
  //     dispatch(addToCart({ ...selectedVariant, quantity: quantityCount }));
  //   }
  // };
  const handleAddToCart = () => {
    if (!selectedVariant || productStock === 0) return;

    const existingItem = cartItems.find(
      (item) =>
        item.id === selectedVariant.id &&
        item.selectedProductColor === selectedVariant.selectedProductColor &&
        item.selectedProductSize === selectedVariant.selectedProductSize
    );

    const currentCartQty = existingItem?.quantity || 0;
    const newTotalQty = currentCartQty + quantityCount;

    if (newTotalQty > productStock) {
      showToast("Cantidad excede el stock disponible", "warn", "top-center");
      return;
    }

    dispatch(addToCart({ ...selectedVariant, quantity: quantityCount }));
  };

  const handleBuyNow = () => {
    const exist = cartItems.find((cart) => cart.id === selectedVariant.id);
    if (selectedVariant && productStock > 0 && exist.length === 0) {
      dispatch(addToCart({ ...selectedVariant, quantity: quantityCount }));
      Navigate("/cart");
    } else {
      Navigate("/cart");
    }
  };

  const canAddToCart = productStock > 0 && quantityCount <= productStock;

  const onCloseModal = () => {
    setThumbsSwiper(null);
    onHide();
  };

  useEffect(() => {
    if (articleDetail && articleDetail?.variants?.length > 0) {
      setSelectedVariant(articleDetail.variants[0]);
      setProductStock(articleDetail.variants[0].stock);
      setSelectedVariantImage(articleDetail.variants[0].images);
    }
  }, [articleDetail]);

  return (
    <Modal
      show={show}
      onHide={onCloseModal}
      className="product-quickview-modal-wrapper"
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className="modal-body py-0">
          <div className="row">
            <div className="co-lg-5 col-md-6 col-sm-6 col-xs-12">
              <div className="product-large-image-wrapper px-sm-3 px-md-1 lg-2">
                <ProductImageGallery images={selectedVariantImage} />
              </div>
            </div>
            <div className="co-lg-7 col-md-6 col-sm-6 col-xs-12">
              <div className="product-details-content quickview-content">
                <Link to={`/producto/${articleDetail.sku}`}>
                  <h2>{articleDetail.name}</h2>
                </Link>
                <div className="product-details-price gap-4">
                  <span className="fs-4 fw-bold">
                    {CurrencyFormatter(
                      articleDetail.discountedPrice || articleDetail.price,
                      i18n,
                      currency
                    )}
                  </span>
                  <span>
                    {articleDetail && articleDetail?.discount > 0 && (
                      <del>
                        <small className="text-muted">
                          {CurrencyFormatter(
                            articleDetail.price,
                            i18n,
                            currency
                          )}
                        </small>
                      </del>
                    )}
                  </span>
                </div>

                <VariantSelector
                  articleDetail={articleDetail}
                  setSelectedVariant={setSelectedVariant}
                  setProductStock={setProductStock}
                  setQuantityCount={setQuantityCount}
                  setSelectedVariantImage={setSelectedVariantImage}
                />

                <small>
                  <b>SKU:</b> {articleDetail.sku}
                </small>

                <div
                  className="pro-details-quality"
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(1, 1fr)",
                    gridRowGap: "1.5rem",
                  }}
                >
                  {articleDetail.stock > 0 ? (
                    <div className="cart-plus-minus">
                      <>
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
                          onClick={() => {
                            if (quantityCount >= maxQtyDisponible) {
                              showToast(
                                `Cantidad excede el stock, 
                                Disponible ${quantityCount} unidades`,
                                "warn",
                                "top-center"
                              );
                              return;
                            }
                            setQuantityCount((count) =>
                              Math.min(maxQtyDisponible, count + 1)
                            );
                          }}
                        >
                          +
                        </button>
                      </>
                    </div>
                  ) : (
                    <span className="d-flex justify-content-start align-items-center">
                      <span className=" border fs-4 fw-bold p-2">
                        Sin Existencias
                      </span>
                    </span>
                  )}
                  <div className="pro-details-cart ">
                    <div className="d-flex align-items-center justify-content-start gap-5 mt-3">
                      <button
                        className="px-4 py-3 button-active-hs btn-black"
                        onClick={handleAddToCart}
                        disabled={!canAddToCart}
                      >
                        Añadir al carrito{" "}
                      </button>
                      {/* <button
                        className="px-4 py-3 button-active-hs btn-black"
                        onClick={handleBuyNow}
                        disabled={!canAddToCart}
                      >
                        Comprar Ahora{" "}
                      </button>
                       */}
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
