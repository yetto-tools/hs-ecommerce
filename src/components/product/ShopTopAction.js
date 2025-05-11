import PropTypes from "prop-types";

import { setActiveLayout } from "../../helpers/product";
import { useTranslation } from "react-i18next";

const ShopTopAction = ({
  getLayout,
  getFilterSortParams,
  productCount,
  sortedProductCount
}) => {

  const { t } = useTranslation();

  return (
    <div className="shop-top-bar mb-35">
      <div className="select-shoing-wrap">
        <div className="shop-select">
          <select
            onChange={e => getFilterSortParams("filterSort", e.target.value)}
          >
            <option value="default">{t("shop_select_filter_sort.default")}</option>
            <option value="priceHighToLow">{t("shop_select_filter_sort.high_to_low")}</option>
            <option value="priceLowToHigh">{t("shop_select_filter_sort.low_to_hight")}</option>
          </select>
        </div>
        <p>
        {t("shop_select_filter_sort.showing")} {sortedProductCount} {t("shop_select_filter_sort.of")} {productCount} {t("shop_select_filter_sort.result")}
        </p>
      </div>

      <div className="shop-tab">
        <button
          onClick={e => {
            getLayout("grid two-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th-large" />
        </button>
        <button
          onClick={e => {
            getLayout("grid three-column");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-th" />
        </button>
        <button
          onClick={e => {
            getLayout("list");
            setActiveLayout(e);
          }}
        >
          <i className="fa fa-list-ul" />
        </button>
      </div>
    </div>
  );
};

ShopTopAction.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopAction;
