import PropTypes from "prop-types";
import clsx from "clsx";
import {
  getIndividualCategories,
  getIndividualTags,
  getIndividualColors,
  getProductsIndividualSizes,
} from "../../helpers/product";
import ShopSearch from "../../components/product/ShopSearch";
import ShopCategories from "../../components/product/ShopCategories";
import ShopColor from "../../components/product/ShopColor";
import ShopSize from "../../components/product/ShopSize";
import ShopTag from "../../components/product/ShopTag";


const ShopSidebar = ({ products, getSortParams, sideSpaceClass }) => {
  console.log(products);
  const uniqueCategories = getIndividualCategories(products.brands);
  const uniqueColors = getIndividualColors(products.colors);
  const uniqueSizes = getProductsIndividualSizes(products.sizes);
  const uniqueTags = getIndividualTags(products.tags);
  

  return (
    <div className={clsx("sidebar-style", "pr-20", sideSpaceClass)}>
      {/* shop search */}
      <ShopSearch />

      {/* filter by categories */}
      <ShopCategories
        categories={uniqueCategories}
        getSortParams={getSortParams}
      />

      {/* filter by Silueta */}
      {/* <ShopSilueta  siluetas={uniqueSilueta} getSortParams={getSortParams} /> */}

      {/* filter by color */}
      <ShopColor colors={uniqueColors} getSortParams={getSortParams} />

      {/* filter by size */}
      <ShopSize sizes={uniqueSizes} getSortParams={getSortParams} />

      {/* filter by tag */}
      <ShopTag tags={uniqueTags} getSortParams={getSortParams} />
    </div>
  );
};

ShopSidebar.propTypes = {
  getSortParams: PropTypes.func,
  products: PropTypes.array,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
