import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { getDiscountPrice } from "../../helpers/product";
import Rating from "./sub-components/ProductRating";
import ProductModal2 from "./ProductModal2";
import { addToCart } from "../../store/slices/cart-slice";

import { useTranslation } from "react-i18next";
import { CurrencyFormatter } from "../../helpers/currencyFormatter";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { View } from "lucide-react";
import { fetchArticleDetail } from "../../hooks/use-FetchArticles";

import { setLoading } from "../../store/slices/menu-slice";

const ProductGridListSingle = ({
  product,
  currency,
  cartItem,
  wishlistItem,
  compareItem,
  spaceBottomClass,
}) => {
  const dispatch = useDispatch();
  // const { article } = useSelector((state) => state.article);
  const { loading } = useSelector((state) => state.loader);
  const { configParams } = useSelector((state) => state.paramsWeb);
  const { t, i18n } = useTranslation();

  const [modalShow, setModalShow] = useState(false);
  const [loadingImage, setLoadingImage] = useState(true);
  const discountedPrice = getDiscountPrice(product.price, product.discount);
  const finalProductPrice = +(product.price * currency.currencyRate).toFixed(2);
  const finalDiscountedPrice = +(
    discountedPrice * currency.currencyRate
  ).toFixed(2);

  const handleProductDetail = async (e) => {
    e.stopPropagation();
    try {
      dispatch(setLoading(true));
      await dispatch(fetchArticleDetail(product.sku));
    } catch (error) {
      console.error("Error al cargar detalle:", error);
    } finally {
      setModalShow(true);
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <div className={clsx("product-wrap", spaceBottomClass)}>
        <div className={clsx("product-img", loadingImage && "loading")}>
          <div onClick={handleProductDetail}>
            {product && product?.stock == 0 ? (
              <div className="product-img-badges bg-secondary pill-62">
                <span className="text-white fw-bold p-2">
                  {t("general_words.stock_out")}
                </span>
              </div>
            ) : (
              ""
            )}
            <>
              <SmartImage
                basePath={configParams.RUTAIMAGENESARTICULOS}
                imageName={product.image[0]}
                alt={product.name}
                width={320}
                height={320}
                onLoadEnd={() => setLoadingImage(false)}
              />
              {/* <LazyLoadImage
                className="default-img"
                onLoad={() => setLoadingImage(false)}
                src={
                  configParams.RUTAIMAGENESARTICULOS + "sm_" + product.image[0]
                }
                alt=""
                width={320}
                height={320}
                aspect="4/3"
                lazy="loaded"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default/no-image.avif";
                }}
                data-src={
                  configParams.RUTAIMAGENESARTICULOS + "sm_" + product.image[0]
                }
              /> */}
            </>
          </div>
          {product.discount || product.new ? (
            <div className="product-img-badges">
              {product.discount && product.discount > 0.0 && (
                <span className="pink">-{product.discount}%</span>
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

          <div className="product-action">
            <div className="pro-same-action pro-cart w-100">
              <button
                onClick={handleProductDetail}
                title="Quick View"
                className=""
              >
                <View size={20} /> Ver
              </button>
            </div>
          </div>
        </div>
        <div className="product-content text-center">
          <h3>{product.name}</h3>
          {product.rating && product.rating > 0 ? (
            <div className="product-rating">
              <Rating ratingValue={product.rating} />
            </div>
          ) : (
            ""
          )}
          <div className="product-price">
            {discountedPrice !== null ? (
              <Fragment>
                <span className="fs-medium">
                  {CurrencyFormatter(discountedPrice, i18n, currency)}
                </span>{" "}
                <span className="old">
                  {CurrencyFormatter(finalProductPrice, i18n, currency)}
                </span>
              </Fragment>
            ) : (
              <span>
                {CurrencyFormatter(finalProductPrice, i18n, currency)}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="shop-list-wrap mb-30">
        <div className="row">
          <div className="col-xl-4 col-md-5 col-sm-6">
            <div className="product-list-image-wrap">
              {typeof product === "object" && (
                <div className="product-img">
                  <Link
                    to={process.env.PUBLIC_URL + "/producto/" + product.sku}
                  >
                    <LazyLoadImage
                      className="default-img img-fluid"
                      src={process.env.PUBLIC_URL + product.image[0]}
                      alt={product.name}
                    />
                    {product.image.length > 1 ? (
                      <LazyLoadImage
                        className="hover-img img-fluid"
                        src={process.env.PUBLIC_URL + product.image[1]}
                        alt=""
                      />
                    ) : (
                      ""
                    )}
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
              )}
            </div>
          </div>
          <div className="col-xl-8 col-md-7 col-sm-6">
            <div className="shop-list-content">
              <div className="product-list-price">
                {discountedPrice !== null ? (
                  <Fragment>
                    <span>
                      {CurrencyFormatter(finalProductPrice, i18n, currency)}
                    </span>{" "}
                    <span className="old">
                      {CurrencyFormatter(finalProductPrice, i18n, currency)}
                    </span>
                  </Fragment>
                ) : (
                  <span>
                    {CurrencyFormatter(finalProductPrice, i18n, currency)}
                  </span>
                )}
              </div>
              {product.rating && product.rating > 0 ? (
                <div className="rating-review">
                  <div className="product-list-rating">
                    <Rating ratingValue={product.rating} />
                  </div>
                </div>
              ) : (
                ""
              )}
              {product.shortDescription ? (
                <p>{product.shortDescription}</p>
              ) : (
                ""
              )}

              <div className="shop-list-actions d-flex align-items-center">
                <div className="shop-list-btn btn-hover">
                  {product.affiliateLink ? (
                    <a
                      href={product.affiliateLink}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {" "}
                      Buy now{" "}
                    </a>
                  ) : product.variation && product.variation.length >= 1 ? (
                    <Link
                      to={`${process.env.PUBLIC_URL}/producto/${product.id}`}
                    >
                      ver detalle
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
                      title={cartItem !== undefined ? "Ya Añadido" : "Añadir"}
                    >
                      {" "}
                      <i className="pe-7s-cart"></i>{" "}
                      {cartItem !== undefined && cartItem.quantity > 0
                        ? "Ya Añadido"
                        : "Añadir"}
                    </button>
                  ) : (
                    <button disabled className="active">
                      Agotado
                    </button>
                  )}
                </div>

                <div className="shop-list-wishlist ml-10"></div>
                <div className="shop-list-compare ml-10"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal2
        show={modalShow}
        onHide={() => setModalShow(false)}
        currency={currency}
      />
      {/* <ProductModal2
        show={modalShow}
        onHide={() => setModalShow(false)}
        currency={currency}
        discountedPrice={discountedPrice}
        finalProductPrice={finalProductPrice}
        finalDiscountedPrice={finalDiscountedPrice}
        wishlistItem={wishlistItem}
        compareItem={compareItem}
      /> */}
    </Fragment>
  );
};

ProductGridListSingle.propTypes = {
  cartItem: PropTypes.shape({}),
  compareItem: PropTypes.shape({}),
  currency: PropTypes.shape({}),
  product: PropTypes.shape({}),
  spaceBottomClass: PropTypes.string,
  wishlistItem: PropTypes.shape({}),
};

const SmartImage = ({
  basePath,
  imageName,
  alt = "",
  width = 320,
  height = 320,
  onLoadEnd = () => {},
  ...props
}) => {
  const [src, setSrc] = useState(null);
  const fallbacks = [
    `${basePath}sm_${imageName}`,
    `${basePath}${imageName}`,
    `/default/no-image.avif`,
  ];

  useEffect(() => {
    let isMounted = true;
    let index = 0;

    const tryLoad = () => {
      if (index >= fallbacks.length) {
        onLoadEnd(); // no se pudo cargar ninguna
        return;
      }

      const img = new Image();
      img.src = fallbacks[index];
      img.onload = () => {
        if (isMounted) {
          setSrc(fallbacks[index]);
          onLoadEnd(); // imagen cargada
        }
      };
      img.onerror = () => {
        index++;
        tryLoad(); // intenta siguiente
      };
    };

    tryLoad();
    return () => {
      isMounted = false;
    };
  }, [imageName, basePath]);

  if (!src) {
    return (
      <div
        className="d-flex justify-content-center align-items-center bg-white"
        style={{ width, height }}
      >
        <div className="spinner-border" role="status" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      className="img-fluid"
      {...props}
    />
  );
};

export default ProductGridListSingle;
