import { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";
import { useTranslation } from "react-i18next";
import { ROOT_IMAGE } from "../../../config";
import ProductModal2 from "../../product/ProductModal2";
import { fetchArticleDetail } from "../../../hooks/use-FetchArticles";
import { setLoading } from "../../../store/slices/articleDetail-slice";

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;
  const { t, i18n } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const cartRef = useRef(null);

  const handleProductQuickView = async (e, product) => {
    if (cartRef.current) {
      cartRef.current.classList.remove("active"); // Remueve la clase 'active' del carrito
    }
    try {
      dispatch(setLoading(true));
      await dispatch(fetchArticleDetail(product.code));
    } catch (error) {
      console.error("Error al cargar detalle:", error);
    } finally {
      setModalShow(true);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []); // Array de dependencias vacío para que solo se aplique al montar y desmontar
  function handleClickOutside(event) {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      // revove class active
      cartRef.current.classList.remove("active");
    }
  }

  return (
    <Fragment>
      <div className="shopping-cart-content" ref={cartRef}>
        {cartItems && cartItems.length > 0 ? (
          <Fragment>
            <ul>
              {cartItems.map((item) => {
                const discountedPrice = getDiscountPrice(
                  item.price,
                  item.discount
                );
                const finalProductPrice = (
                  item.price * currency.currencyRate
                ).toFixed(2);
                const finalDiscountedPrice = (
                  discountedPrice * currency.currencyRate
                ).toFixed(2);

                discountedPrice != null
                  ? (cartTotalPrice += finalDiscountedPrice * item.quantity)
                  : (cartTotalPrice += finalProductPrice * item.quantity);

                return (
                  <li
                    key={item.cartItemId}
                    className={
                      item.isSoldOut
                        ? "sold-out single-shopping-cart"
                        : "single-shopping-cart"
                    }
                  >
                    <div className="shopping-cart-img d-flex px-3">
                      <button
                        id={item.id}
                        name={item.code}
                        type="button"
                        onClick={(e) => handleProductQuickView(e, item)}
                      >
                        <img
                          alt={item.name}
                          src={
                            ROOT_IMAGE + item?.images[0] ||
                            ROOT_IMAGE + item?.image
                          }
                          width={70}
                          className="img-fluid ml-4"
                        />
                      </button>
                    </div>
                    <div className="shopping-cart-title">
                      <h4 className="mb-2">
                        <span className="text-left text-black fs-6">
                          {" "}
                          {item.name}{" "}
                          <small className="text-xs text-muted">
                            {item.code}
                          </small>
                        </span>
                      </h4>

                      {!item.isSoldOut ? (
                        <h6>
                          {t("page_cart.th_qty")}: {item?.quantity}
                        </h6>
                      ) : (
                        <h6 className="text-danger fw-bold">
                          {t("page_cart.th_qty")}:{" 0"}
                        </h6>
                      )}

                      <h6>
                        {"Precio"}:{" "}
                        {discountedPrice !== null
                          ? new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: currency.currencyName,
                            }).format(finalDiscountedPrice)
                          : new Intl.NumberFormat(i18n.language, {
                              style: "currency",
                              currency: currency.currencyName,
                            }).format(finalProductPrice)}
                      </h6>
                      <span className="">
                        {item.selectedProductColor &&
                        item.selectedProductSize ? (
                          <div className="cart-item-variation">
                            <h6>Color: {item.selectedProductColor}</h6>
                            <h6>
                              {t("general_words.size")}:{" "}
                              {item.selectedProductSize}
                            </h6>
                          </div>
                        ) : (
                          ""
                        )}
                      </span>
                    </div>

                    <div className="shopping-cart-delete">
                      <button
                        onClick={(e) => {
                          handleClickOutside(e);
                          dispatch(deleteFromCart(item.cartItemId));
                        }}
                      >
                        <i className="fa fa-times-circle" />
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="shopping-cart-total">
              <h4>
                Total :{" "}
                <span className="shop-total">
                  {new Intl.NumberFormat(i18n.language, {
                    style: "currency",
                    currency: currency.currencyName,
                  }).format(cartTotalPrice)}
                </span>
              </h4>
            </div>
            <div className="shopping-cart-btn btn-hover text-center">
              <Link
                className="default-btn"
                to={process.env.PUBLIC_URL + "/cart"}
              >
                {t("general_words.view_cart")}
              </Link>
              <Link
                className="default-btn text-black"
                to={process.env.PUBLIC_URL + "/checkout"}
              >
                {t("checkout")}
              </Link>
            </div>
          </Fragment>
        ) : (
          <p className="text-center">{t("no_items_cart")}</p>
        )}
      </div>
      <ProductModal2
        show={modalShow}
        onHide={() => {
          setModalShow(false);
        }}
        currency={currency}
      />
    </Fragment>
  );
};

export default MenuCart;
