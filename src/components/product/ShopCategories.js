import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";
import { useTranslation } from "react-i18next";

const ShopCategories = ({ categories, getSortParams }) => {

  const { t } = useTranslation();


  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">{t("shop_categories.categories")}</h4>
      <div className="sidebar-widget-list mt-30">
        {categories ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("category", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> {t("shop_categories.filter_all")}
                </button>
              </div>
            </li>
            {categories.map((category, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("category", category);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" /> {category}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          t("shop_categories.not_found")
        )}
      </div>
    </div>
  );
};

ShopCategories.propTypes = {
  categories: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopCategories;
