import { Fragment, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getDiscountPrice } from "../../../helpers/product";
import { deleteFromCart } from "../../../store/slices/cart-slice";
import { useTranslation } from "react-i18next";

import ProductModal2 from "../../product/ProductModal2";
import { Lazy } from "swiper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const MenuCart = () => {
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);
  const { t, i18n } = useTranslation();
  const { cartItems } = useSelector((state) => state.cart);
  const { configParams } = useSelector((state) => state.paramsWeb);
  let cartTotalPrice = 0;
  const [modalShow, setModalShow] = useState(false);
  const cartRef = useRef(null);
  const navigate = useNavigate();

  const handleProductQuickView = async (e, product) => {
    navigate("/cart");
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
                        {/* <CartItemThumbnail
                          item={item}
                          configParams={configParams}
                        /> */}

                        <LazyLoadImage
                          alt={item.name}
                          src={
                            configParams.RUTAIMAGENESARTICULOS +
                              item?.images[0] ||
                            configParams.RUTAIMAGENESARTICULOS + item?.image
                          }
                          width={70}
                          className="img-fluid ml-4"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/default/no-image-thumbnial.avif";
                          }}
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
                className="default-btn text-black fw-bold"
                to={process.env.PUBLIC_URL + "/cart"}
              >
                {t("general_words.view_cart")}
              </Link>
              <Link
                className="default-btn text-black fw-bold"
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

// export const CartItemThumbnail = ({ item, configParams }) => {
//   const [thumbnailSrc, setThumbnailSrc] = useState("");

//   useEffect(() => {
//     const baseImage = item?.images?.[0] || item?.image;
//     const smImage = `${configParams.RUTAIMAGENESARTICULOS}sm_${baseImage}`;
//     const Image = `${configParams.RUTAIMAGENESARTICULOS}${baseImage}`;

//     fetch(smImage, { method: "HEAD" })
//       .then((res) => {
//         if (res.ok) {
//           setThumbnailSrc(smImage);
//         }
//       })
//       .catch(() => {
//         fetch(Image, { method: "HEAD" })
//           .then((res) => {
//             if (res.ok) {
//               setThumbnailSrc(Image);
//               console.log(Image);
//             } else {
//               setThumbnailSrc("/default/no-image-thumbnail.avif");
//             }
//           })
//           .catch(() => {
//             setThumbnailSrc("/default/no-image-thumbnail.avif");
//           });
//       });
//   }, [item]);

//   return (
//     <picture>
//       <source srcSet={thumbnailSrc} />
//       <img
//         alt={item.name}
//         src={thumbnailSrc}
//         width={70}
//         className="img-fluid ml-4"
//         loading="lazy"
//       />
//     </picture>
//   );
// };

export default MenuCart;
