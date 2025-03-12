import { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";
import { useTranslation } from "react-i18next";
import { ROOT_IMAGE } from "../../../config";

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  let cartTotalPrice = 0;
  const { t, i18n } = useTranslation();

  

  return (
    <div className="shopping-cart-content">
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
                <li className="single-shopping-cart" key={item.cartItemId}>
                  <div className="shopping-cart-img">
                    <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                      <img
                        alt=""
                        src={
                          ROOT_IMAGE + item?.images[0] ||
                          ROOT_IMAGE + item?.image
                        }
                        className="img-fluid"
                      />
                    </Link>
                  </div>
                  <div className="shopping-cart-title">
                    <h4 className="mb-4">
                      <Link to={process.env.PUBLIC_URL + "/product/" + item.id}>
                        {" "}
                        {item.name}{" "}
                      </Link>
                    </h4>
                    <h6>
                      {t("page_cart.th_qty")}: {item?.quantity}
                    </h6>
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
                      {item.selectedProductColor && item.selectedProductSize ? (
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
                      onClick={() => dispatch(deleteFromCart(item.cartItemId))}
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
            <Link className="default-btn" to={process.env.PUBLIC_URL + "/cart"}>
              {t("general_words.view_cart")}
            </Link>
            <Link
              className="default-btn"
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
  );
};

export default MenuCart;
