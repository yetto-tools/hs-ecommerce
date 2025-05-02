import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import { getDiscountPrice } from "../../helpers/product";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  addToCart,
  decreaseQuantity,
  deleteFromCart,
  deleteAllFromCart,
  markItemAsSoldOut,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import { useTranslation } from "react-i18next";
import { fetchStock } from "../../hooks/use-FetchStock";

import clsx from "clsx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import { showToast } from "../../toast/toastManager";
import { Loader2 } from "lucide-react";

const Cart = () => {
  const { t, i18n } = useTranslation();

  let cartTotalPrice = 0;

  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [readyToCheckout, setReadyToCheckout] = useState(false);
  const { configParams } = useSelector((state) => state.paramsWeb);
  const navigate = useNavigate();
  const [isVerifyingStock, setIsVerifyingStock] = useState(false);

  useEffect(() => {
    verifyStockAndSetReady();
  }, [cartItems]);

  const verifyStockAndSetReady = async () => {
    setIsVerifyingStock(true);
    let allItemsAvailable = true;
    for (const item of cartItems) {
      const stock = await fetchStock(item.code);
      if (stock === 0) {
        dispatch(
          markItemAsSoldOut({ cartItemId: item.cartItemId, isSoldOut: true })
        );
        allItemsAvailable = false;
      } else if (item.quantity > stock) {
        dispatch(
          markItemAsSoldOut({ cartItemId: item.cartItemId, isSoldOut: true })
        );
        allItemsAvailable = false;
      } else {
        dispatch(
          markItemAsSoldOut({ cartItemId: item.cartItemId, isSoldOut: false })
        );
      }
    }
    setReadyToCheckout(allItemsAvailable);
    setIsVerifyingStock(false);
    console.log(cartItems);
  };

  const handleCheckout = () => {
    if (!readyToCheckout) {
      handleAlert();
      return;
    }
    navigate("/checkout");
  };

  const MySwal = withReactContent(Swal);

  const handleAlert = () => {
    MySwal.fire({
      position: "center",
      icon: "warning",
      title: "Hay productos sin existencia, debe de quitarlos del carrito",
      showConfirmButton: true,
      timer: 2500,
      customClass: {
        confirmButton: "button-active-hs btn-black fw-bold mt-1 px-4 py-2",
      },
    });
  };
  return (
    <Fragment>
      <SEO titleTemplate={t("seo.title")} description={t("seo.cart")} />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            {
              label: t("page_cart.label_home"),
              path: process.env.PUBLIC_URL + "/",
            },
            {
              label: t("page_cart.label_Cart"),
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="cart-main-area pt-90 pb-100">
          <div className="container-xxl px-5">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">
                  {t("page_cart.cart_page_title")}
                </h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <section className="container-xxl mx-auto">
                        <div className="col-lg-12 col-md-12">
                          <div className="row col-lg-12 col-md-12 mx-auto mb-3">
                            <div className="header-title-cart">
                              <div
                                className="title-preview"
                                style={{ textTransform: "capitalize" }}
                              >
                                <span className="title-column"></span>
                              </div>
                              <div
                                className="title-detials"
                                style={{ textTransform: "capitalize" }}
                              >
                                <span className="title-column"></span>
                              </div>
                              <div
                                className="title-price"
                                style={{ textTransform: "capitalize" }}
                              >
                                <span className="text-medium title-column">
                                  {t("page_cart.price")}
                                </span>
                              </div>
                              <div
                                className="title-quantity"
                                style={{ textTransform: "capitalize" }}
                              >
                                <span className="title-column">
                                  {t("page_cart.div_quantity")}
                                </span>
                              </div>
                              <div
                                className="title-total"
                                style={{ textTransform: "capitalize" }}
                              >
                                <span className="title-column">
                                  {t("page_cart.div_subtotal")}
                                </span>
                              </div>
                              <div
                                className="title-action"
                                style={{ textTransform: "capitalize" }}
                              >
                                <span className="title-column">Acción</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <main className="col-lg-12 col-md-12">
                          {cartItems.map((cartItem, key) => {
                            const discountedPrice = getDiscountPrice(
                              cartItem.price,
                              cartItem.discount
                            );

                            const finalProductPrice = (
                              cartItem.price * currency.currencyRate
                            ).toFixed(2);
                            const finalDiscountedPrice = (
                              discountedPrice * currency.currencyRate
                            ).toFixed(2);

                            discountedPrice != null
                              ? (cartTotalPrice +=
                                  finalDiscountedPrice * cartItem.quantity)
                              : (cartTotalPrice +=
                                  finalProductPrice * cartItem.quantity);
                            return (
                              <section
                                key={key}
                                className={clsx(
                                  "product-line",
                                  cartItem.isSoldOut ? "sold-out" : ""
                                )}
                              >
                                <article className="product-item">
                                  <div className="product-thumbnail">
                                    <Link
                                      to={"/productos?busqueda=" + cartItem.sku}
                                    >
                                      <img
                                        name="image"
                                        className="product-image"
                                        src={
                                          configParams.RUTAIMAGENESARTICULOS +
                                          cartItem.images[0]
                                        }
                                        alt=""
                                        width={128}
                                        height={128}
                                      />
                                    </Link>
                                  </div>
                                  <div className="product-info">
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/productos?busqueda=" +
                                        cartItem.sku
                                      }
                                    >
                                      <span className="product-title fw-semibold">
                                        {cartItem.name}
                                      </span>
                                    </Link>
                                    {cartItem.color && cartItem.size ? (
                                      <div className="cart-item-variation">
                                        <span className="">
                                          {t("page_cart.cart_color")}:{" "}
                                          <small className="fw-semibold">
                                            {cartItem.color}
                                          </small>
                                        </span>
                                        <span className="">
                                          {t("page_cart.cart_size")}:{" "}
                                          <small className="fw-semibold">
                                            {cartItem.size}
                                          </small>
                                        </span>
                                        <span className="code">
                                          {cartItem.code}
                                        </span>
                                      </div>
                                    ) : (
                                      ""
                                    )}
                                  </div>
                                  <div className="product-price-cart">
                                    {discountedPrice !== null ? (
                                      <Fragment>
                                        <span className="amount old">
                                          {new Intl.NumberFormat(
                                            i18n.language,
                                            {
                                              style: "currency",
                                              currency: currency.currencyName,
                                            }
                                          ).format(finalProductPrice)}
                                        </span>
                                        <span className="amount">
                                          {new Intl.NumberFormat(
                                            i18n.language,
                                            {
                                              style: "currency",
                                              currency: currency.currencyName,
                                            }
                                          ).format(finalDiscountedPrice)}
                                        </span>
                                      </Fragment>
                                    ) : (
                                      <span className="amount">
                                        {new Intl.NumberFormat(i18n.language, {
                                          style: "currency",
                                          currency: currency.currencyName,
                                        }).format(finalProductPrice)}
                                      </span>
                                    )}
                                  </div>
                                  <div className="product-quantity">
                                    <div className="cart-plus-minus">
                                      <button
                                        className="dec qtybutton"
                                        onClick={() =>
                                          dispatch(decreaseQuantity(cartItem))
                                        }
                                      >
                                        -
                                      </button>
                                      {!cartItem.isSoldOut ? (
                                        <input
                                          className="cart-plus-minus-box"
                                          type="text"
                                          value={cartItem.quantity}
                                          readOnly
                                        />
                                      ) : (
                                        <>
                                          <input
                                            className="cart-plus-minus-box border-danger text-danger fw-semibold"
                                            type="text"
                                            value={0}
                                            readOnly
                                          />
                                          <small className="text-danger fw-semibold">
                                            {t("page_cart.cart_out_of_stock")}
                                          </small>
                                        </>
                                      )}
                                      <button
                                        className="inc qtybutton"
                                        onClick={() => {
                                          if (
                                            cartItem.isSoldOut ||
                                            (cartItem !== undefined &&
                                              cartItem.quantity &&
                                              cartItem.quantity >=
                                                cartItemStock(
                                                  cartItem,
                                                  cartItem.selectedProductColor,
                                                  cartItem.selectedProductSize
                                                ))
                                          ) {
                                            showToast(
                                              `Cantidad excede el stock, Disponible ${quantityCount} unidades.`,
                                              "warn",
                                              "top-center",
                                              20000
                                            );
                                            return;
                                          }
                                          dispatch(
                                            addToCart({
                                              ...cartItem,
                                              quantity: quantityCount,
                                            })
                                          );
                                        }}
                                      >
                                        +
                                      </button>
                                    </div>
                                  </div>
                                  <div className="product-subtotal">
                                    <span>
                                      {discountedPrice !== null
                                        ? new Intl.NumberFormat(i18n.language, {
                                            style: "currency",
                                            currency: currency.currencyName,
                                          }).format(
                                            finalDiscountedPrice *
                                              cartItem.quantity
                                          )
                                        : new Intl.NumberFormat(i18n.language, {
                                            style: "currency",
                                            currency: currency.currencyName,
                                          }).format(
                                            finalProductPrice *
                                              cartItem.quantity
                                          )}
                                    </span>
                                  </div>
                                </article>
                                <aside className="product-remove">
                                  <div className="button-remove">
                                    <button
                                      onClick={() =>
                                        dispatch(
                                          deleteFromCart(cartItem.cartItemId)
                                        )
                                      }
                                    >
                                      <i
                                        className="fa fa-times"
                                        style={{ fontSize: "1.5rem" }}
                                      ></i>
                                    </button>
                                  </div>
                                </aside>
                              </section>
                            );
                          })}
                        </main>
                      </section>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="cart-shiping-update-wrapper ">
                      <div className="cart-shiping-update ">
                        <Link
                          to={process.env.PUBLIC_URL + "/productos"}
                          className="text-black"
                        >
                          {t("page_cart.continue_shopping")}
                        </Link>
                      </div>
                      <div className="cart-clear ">
                        <button
                          onClick={() => dispatch(deleteAllFromCart())}
                          className="text-black"
                        >
                          {t("page_cart.clear_shopping_cart")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-12"></div>
                  <div className="col-lg-6 col-md-12">
                    <div className="grand-totall">
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          {""}
                        </h4>
                      </div>
                      <div className="row">
                        <div className="col-md-6">
                          <h4 className="cart-bottom-title section-bg-gary-cart fw-bold ">
                            {"Monto Total"}
                          </h4>
                        </div>
                        <div className="col-md-6">
                          <h4 className="grand-totall-title mb-5">
                            <span className="mb-4">
                              {new Intl.NumberFormat(i18n.language, {
                                style: "currency",
                                currency: currency.currencyName,
                              }).format(cartTotalPrice)}
                            </span>
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="row">
                      <div className="col-lg-6"></div>
                      <div className="col-lg-6 text-center mx-auto">
                        <button
                          className={clsx(
                            "button-active-hs btn-black fw-bold w-75",
                            {
                              "btn-disabled":
                                !readyToCheckout || isVerifyingStock,
                            }
                          )}
                          onClick={handleCheckout}
                          disabled={!readyToCheckout || isVerifyingStock}
                        >
                          {isVerifyingStock ? (
                            <>
                              Verificando Stock{" "}
                              <Loader2 className="animate-spin w-5 h-5 mx-auto" />
                            </>
                          ) : (
                            "Comprar Ahora"
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cart"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No se han encontrado artículos en el carrito <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/productos"}>
                        Comprar Ahora
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Cart;
