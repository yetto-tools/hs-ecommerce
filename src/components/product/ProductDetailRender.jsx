import { useSelector } from "react-redux";
import { CurrencyFormatter } from "../../helpers/currencyFormatter";
import useProductDetailLogic from "../../hooks/useProductDetailLogic";
import { showToast } from "../../toast/toastManager";
import ProductImageGallery from "./ProductImage";
import { VariantSelector } from "./VariantSelector";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export const ProductDetailRender = ({ articleDetail }) => {
  const currency = useSelector((state) => state.currency);
  const { i18n } = useTranslation();
  const {
    selectedVariant,
    productStock,
    quantityCount,
    selectedVariantImage,
    maxQtyDisponible,
    canAddToCart,
    setSelectedVariant,
    setProductStock,
    setQuantityCount,
    setSelectedVariantImage,
    handleAddToCart,
  } = useProductDetailLogic(articleDetail);
  return (
    <>
      <div className="modal-body py-0">
        <div className="row">
          <div className="co-lg-5 col-md-6 col-sm-6 col-xs-12 px-lg-5 px-2">
            <div className="product-large-image-wrapper px-sm-3 px-md-1 px-lg-2">
              <div className="container">
                <ProductImageGallery images={selectedVariantImage} />
              </div>
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
                        {CurrencyFormatter(articleDetail.price, i18n, currency)}
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
                  <p className="text-break">{articleDetail.shortDescription}</p>
                </details>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
