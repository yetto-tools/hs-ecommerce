import PropTypes from "prop-types";
import React, { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import { LoadingIndicator } from "../../App";

const ProductGridList = ({ products, spaceBottomClass }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.loader);
  const { filteredArticles } = useSelector((state) => state.articles);
  const info = useSelector((state) => state.articles.filteredArticles);
  const { filters } = useSelector((state) => state.articles);

  return (
    <Fragment>
      {loading && LoadingIndicator}
      <Suspense fallback={LoadingIndicator}>
        {products && products.length > 0 ? (
          products?.map((product, index) => {
            return (
              <div
                className="col-xl-3 col-sm-6"
                key={product.sku + index}
                name="product-grid-list"
              >
                <ProductGridListSingle
                  spaceBottomClass={spaceBottomClass}
                  product={product}
                  currency={currency}
                  cartItem={cartItems.find(
                    (cartItem) => cartItem.id === product.sku
                  )}
                />
              </div>
            );
          })
        ) : (
          <div className="d-flex justify-content-center">
            <h1>No hay productos disponibles.</h1>
          </div>
        )}
      </Suspense>
    </Fragment>
  );
};

ProductGridList.propTypes = {
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridList;
