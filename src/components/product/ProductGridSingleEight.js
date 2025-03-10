import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal from "./ProductModal";
import { addToCart } from "../../store/slices/cart-slice";
import { addToWishlist } from "../../store/slices/wishlist-slice";
import { addToCompare } from "../../store/slices/compare-slice";
import { useTranslation } from "react-i18next";

const ProductGridSingleEight = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
  colorClass,
}) => {
  const { t, i18n } = useTranslation();
  const [modalShow, setModalShow] = useState(false);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);
  const dispatch = useDispatch();

  return (
    <Fragment>
      <div className={clsx("product-wrap-8", spaceBottomClass, colorClass)}>
        <div className="product-img">
          <Link to={process.env.PUBLIC_URL + "/producto/" + product.id}>
            <img
              className="default-img img-fluid"
              src={process.env.PUBLIC_URL + product.image[0]}
              alt=""
            />
          </Link>
          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount ? (
                <span className="pink">-{product.discount}%</span>
              ) : (
                ""
              )}
              {product.new ? (
                <span className="purple">{t("general_words.new")}</span>
              ) : (
                ""
              )}
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="product-content">
          <h3>
            <Link to={process.env.PUBLIC_URL + "/producto/" + product.id}>
              {product.name}
            </Link>
          </h3>

          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span className="old">
                  {new Intl.NumberFormat(i18n.language, {
                    style: "currency",
                    currency: currency.currencyName,
                  }).format(finalProductPrice)}
                </span>
                <span>
                  {new Intl.NumberFormat(i18n.language, {
                    style: "currency",
                    currency: currency.currencyName,
                  }).format(finalDiscountedPrice)}
                </span>
              </Fragment>
            ) : (
              <span>
                {new Intl.NumberFormat(i18n.language, {
                  style: "currency",
                  currency: currency.currencyName,
                }).format(finalProductPrice)}
              </span>
            )}
          </div>

          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}

          <div className="product-action">
            <div className="pro-same-action pro-wishlist">
              <button
                className={wishlistItem !== undefined ? "active" : ""}
                disabled={wishlistItem !== undefined}
                title={
                  wishlistItem !== undefined
                    ? "Added to wishlist"
                    : "Add to wishlist"
                }
                onClick={() => dispatch(addToWishlist(product))}
              >
                <i className="pe-7s-like" />
              </button>
            </div>
            <div className="pro-same-action pro-cart">
              {product.affiliateLink ? (
                <a
                  href={product.affiliateLink}
                  rel="noopener noreferrer"
                  target="_blank"
                  title="Buy now"
                >
                  <i className="pe-7s-cart"></i>
                </a>
              ) : product.variation && product.variation.length >= 1 ? (
                <Link
                  to={`${process.env.PUBLIC_URL}/producto/${product.id}`}
                  title="Select option"
                >
                  <i className="pe-7s-cart"></i>
                </Link>
              ) : product.stock && product.stock > 0 ? (
                <button
                  onClick={() => dispatch(addToCart(product))}
                  className={
                    cartItem !== undefined && cartItem.quantity > 0
                      ? "active"
                      : ""
                  }
                  disabled={cartItem !== undefined && cartItem.quantity > 0}
                  title={
                    cartItem !== undefined ? "Added to cart" : "Add to cart"
                  }
                >
                  <i className="pe-7s-cart"></i>
                </button>
              ) : (
                <button disabled className="active" title="Out of stock">
                  <i className="pe-7s-cart"></i>
                </button>
              )}
            </div>
            <div className="pro-same-action pro-compare">
              <button
                className={compareItem !== undefined ? "active" : ""}
                disabled={compareItem !== undefined}
                title={
                  compareItem !== undefined
                    ? "Added to compare"
                    : "Add to compare"
                }
                onClick={() => dispatch(addToCompare(product))}
              >
                <i className="pe-7s-shuffle" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      />
    </Fragment>
  );
};

ProductGridSingleEight.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  sliderClassName: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

export default ProductGridSingleEight;
