import PropTypes from "prop-types";
import React, { Fragment, Suspense } from "react";
import { useSelector } from "react-redux";
import ProductGridListSingle from "../../components/product/ProductGridListSingle";
import { LoadingIndicator } from "../../App";

const ProductGridList = ({ products, spaceBottomClass }) => {
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const { loading } = useSelector((state) => state.loader);
  return (
    <Fragment>
      {loading && LoadingIndicator}
      <Suspense fallback={LoadingIndicator}>
        {products?.map((product) => {
          return (
            <div className="col-xl-4 col-sm-6" key={product.sku}>
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
        })}
      </Suspense>
    </Fragment>
  );
};

ProductGridList.propTypes = {
  products: PropTypes.array,
  spaceBottomClass: PropTypes.string,
};

export default ProductGridList;
