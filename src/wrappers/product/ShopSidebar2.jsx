import PropTypes from "prop-types";
import clsx from "clsx";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";
import ShopBrand from "../../components/product/ShopBrand"; // ✅ si quieres añadir filtro de marcas

const ShopSidebar2 = ({
  products,
  brands,
  colors,
  sizes,
  tags,
  setFilters,
  sideSpaceClass,
}) => {
  return (
    <div className={clsx("sidebar-style", "pr-20", sideSpaceClass)}>
      {/* search */}
      <ShopSearch />

      {/* categories */}
      <ShopCategories
        products={products}
        setFilters={setFilters}
      />

      {/* brands */}
      <ShopBrand
        brands={products.brands}
        setFilters={setFilters}
      />

      {/* colors */}
      <ShopColor
        colors={products.colors}
        setFilters={setFilters}
      />

      {/* sizes */}
      <ShopSize
        sizes={products.sizes}
        setFilters={setFilters}
      />

      {/* tags */}
      <ShopTag
        tags={products.ags}
        setFilters={setFilters}
      />
    </div>
  );
};

ShopSidebar2.propTypes = {
  products: PropTypes.array,
  brands: PropTypes.array,
  colors: PropTypes.array,
  sizes: PropTypes.array,
  tags: PropTypes.array,
  setFilters: PropTypes.func,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar2;
