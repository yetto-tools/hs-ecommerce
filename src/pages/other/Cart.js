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
  updateCartItemQuantity,
  markItemAsSoldOut,
} from "../../store/slices/cart-slice";
import { cartItemStock } from "../../helpers/product";
import { useTranslation } from "react-i18next";
import { ROOT_IMAGE } from "../../config";
import { fetchStock } from "../../hooks/use-FetchStock";
import cogoToast from "cogo-toast";
import { Button } from "react-bootstrap";
import clsx from "clsx";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

const Cart = () => {
  const { t, i18n } = useTranslation();

  let cartTotalPrice = 0;

  const [quantityCount] = useState(1);
  const dispatch = useDispatch();
  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [readyToCheckout, setReadyToCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    verifyStockAndSetReady();
  }, [cartItems]);

  const verifyStockAndSetReady = async () => {
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
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <Fragment>
                <h3 className="cart-page-title">
                  {t("page_cart.cart_page_title")}
                </h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive cart-table-content">
                      <table>
                        <thead>
                          <tr>
                            <th style={{ width: "10rem" }}>&nbsp;</th>
                            <th>&nbsp;</th>
                            <th style={{ textTransform: "capitalize" }}>
                              {t("page_cart.th_unit_price")}
                            </th>
                            <th style={{ textTransform: "capitalize" }}>
                              {t("page_cart.th_qty")}
                            </th>
                            <th style={{ textTransform: "capitalize" }}>
                              {t("page_cart.th_subtotal")}
                            </th>
                            <th style={{ textTransform: "capitalize" }}>
                              {t("page_cart.th_action")}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
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
                              <tr
                                key={key}
                                className={cartItem.isSoldOut ? "sold-out" : ""}
                              >
                                <td className="product-thumbnail">
                                  <Link
                                    to={"/productos?busqueda=" + cartItem.sku}
                                  >
                                    <img
                                      className="img-fluid"
                                      src={ROOT_IMAGE + cartItem.images[0]}
                                      alt=""
                                    />
                                  </Link>
                                </td>

                                <td className="product-name">
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
                                      <span className="text-xs">
                                        {cartItem.code}
                                      </span>
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </td>

                                <td className="product-price-cart">
                                  {discountedPrice !== null ? (
                                    <Fragment>
                                      <span className="amount old">
                                        {new Intl.NumberFormat(i18n.language, {
                                          style: "currency",
                                          currency: currency.currencyName,
                                        }).format(finalProductPrice)}
                                      </span>
                                      <span className="amount">
                                        {new Intl.NumberFormat(i18n.language, {
                                          style: "currency",
                                          currency: currency.currencyName,
                                        }).format(finalDiscountedPrice)}
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
                                </td>

                                <td className="product-quantity">
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
                                      onClick={() =>
                                        dispatch(
                                          addToCart({
                                            ...cartItem,
                                            quantity: quantityCount,
                                          })
                                        )
                                      }
                                      disabled={
                                        cartItem.isSoldOut ||
                                        (cartItem !== undefined &&
                                          cartItem.quantity &&
                                          cartItem.quantity >=
                                            cartItemStock(
                                              cartItem,
                                              cartItem.selectedProductColor,
                                              cartItem.selectedProductSize
                                            ))
                                      }
                                    >
                                      +
                                    </button>
                                  </div>
                                </td>
                                <td className="product-subtotal">
                                  {discountedPrice !== null
                                    ? new Intl.NumberFormat(i18n.language, {
                                        style: "currency",
                                        currency: currency.currencyName,
                                      }).format(
                                        finalDiscountedPrice * cartItem.quantity
                                      )
                                    : new Intl.NumberFormat(i18n.language, {
                                        style: "currency",
                                        currency: currency.currencyName,
                                      }).format(
                                        finalProductPrice * cartItem.quantity
                                      )}
                                </td>

                                <td className="product-remove">
                                  <button
                                    onClick={() =>
                                      dispatch(
                                        deleteFromCart(cartItem.cartItemId)
                                      )
                                    }
                                  >
                                    <i className="fa fa-times"></i>
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
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
                  <div className="col-lg-4 col-md-6">
                    <div className="cart-tax" hidden>
                      <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gray">
                          Estimación de gastos de envío e impuestos
                        </h4>
                      </div>
                      <div className="tax-wrapper">
                        <p>
                          Enter your destination to get a shipping estimate.
                        </p>
                        <div className="tax-select-wrapper">
                          <div className="tax-select">
                            <label>* Country</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Region / State</label>
                            <select className="email s-email s-wid">
                              <option>Bangladesh</option>
                              <option>Albania</option>
                              <option>Åland Islands</option>
                              <option>Afghanistan</option>
                              <option>Belgium</option>
                            </select>
                          </div>
                          <div className="tax-select">
                            <label>* Zip/Postal Code</label>
                            <input type="text" />
                          </div>
                          <button className="cart-btn-2" type="submit">
                            Get A Quote
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6">
                    <div className="discount-code-wrapper" hidden>
                      <div className="title-wrap" hidden>
                        <h4 className="cart-bottom-title section-bg-gray">
                          Use Coupon Code
                        </h4>
                      </div>
                      <div className="discount-code" hidden>
                        <p>Enter your coupon code if you have one.</p>
                        <form>
                          <input type="text" required name="name" />
                          <button className="cart-btn-2" type="submit">
                            Apply Coupon
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-12">
                    <div className="grand-totall">
                      {/* <div className="title-wrap">
                        <h4 className="cart-bottom-title section-bg-gary-cart">
                          Total
                        </h4>
                      </div>
                      <h5>
                        
                        <span>
                          
                          {new Intl.NumberFormat(i18n.language, {
                            style: "currency",
                            currency: currency.currencyName,
                          }).format(cartTotalPrice)}
                        </span>
                      </h5> */}

                      <h4 className="grand-totall-title mb-5">
                        <span className="mb-4">
                          {new Intl.NumberFormat(i18n.language, {
                            style: "currency",
                            currency: currency.currencyName,
                          }).format(cartTotalPrice)}
                        </span>
                      </h4>
                      <button
                        className={clsx(
                          "button-active-hs btn-black fw-bold",
                          { "btn-disabled": !readyToCheckout } // Esto es solo un ejemplo
                        )}
                        onClick={handleCheckout}
                      >
                        Comprar Ahora
                      </button>
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
