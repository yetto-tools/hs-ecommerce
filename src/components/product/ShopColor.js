import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";
import { useTranslation } from "react-i18next";


const ShopColor = ({ colors, getSortParams }) => {

  const {t} = useTranslation()

  return (
    <div className="sidebar-widget mt-50">
      <h4 className="pro-sidebar-title">Color </h4>
      <div className="sidebar-widget-list mt-20">
        {colors ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("color", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> {t("general_words.all_colors")}{" "}
                </button>
              </div>
            </li>
            {colors.map((color, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      onClick={e => {
                        getSortParams("color", color);
                        setActiveSort(e);
                      }}
                    >
                      {/* <span className={`bg-${color} p-2 rounded-circle`}/> */}
                      <span className="checkmark" /> {t(`general_words.${color}`)}{" "}

                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          t("general_words.no_colors_found")
        )}
      </div>
    </div>
  );
};

ShopColor.propTypes = {
  colors: PropTypes.array,
  getSortParams: PropTypes.func
};

export default ShopColor;
