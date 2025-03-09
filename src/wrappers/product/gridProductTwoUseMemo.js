import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { getProducts } from "../../helpers/product";
import ProductGridSingleTwo from "../../components/product/ProductGridSingleTwo";

const ProductGridTwo = ({ spaceBottomClass, colorClass, titlePriceClass, category, type, limit }) => {
  const { products, isLoading } = useSelector((state) => state.product);
  const currency = useSelector((state) => state.currency);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const compareItems = useSelector((state) => state.compare.compareItems);

  const prods = useMemo(() => {
    if (!isLoading) {
      return getProducts(products, category, type, limit);
    }
    return [];
  }, [isLoading, products, category, type, limit]);

  if (isLoading) {
    return <div>Cargando productos...</div>;
  }

  if (!prods || prods.length === 0) {
    return <div>No hay productos disponibles.</div>;
  }

  return (
    <div>
      {prods.map((product) => (
        <div className="col-xl-3 col-md-6 col-lg-4 col-sm-6" key={product.id}>
          <ProductGridSingleTwo
            spaceBottomClass={spaceBottomClass}
            colorClass={colorClass}
            product={product}
            currency={currency}
            cartItem={cartItems.find((item) => item.id === product.id)}
            wishlistItem={wishlistItems.find((item) => item.id === product.id)}
            compareItem={compareItems.find((item) => item.id === product.id)}
            titlePriceClass={titlePriceClass}
          />
        </div>
      ))}
    </div>
  );
};

ProductGridTwo.propTypes = {
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
  titlePriceClass: PropTypes.string,
  category: PropTypes.string,
  type: PropTypes.string,
  limit: PropTypes.number
};

export default ProductGridTwo;
