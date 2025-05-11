import PropTypes from "prop-types";

import { setActiveSort } from "../../helpers/product";
import { useTranslation } from "react-i18next";

const ShopSilueta = ({ siluetas, getSortParams }) => {
  
  const {t} = useTranslation();
  
  return (
    <div className="sidebar-widget mt-40">
      <h4 className="pro-sidebar-title">{t("general_words.silhouettes")}</h4>
      <div className="sidebar-widget-list mt-20">
        {siluetas ? (
          <ul>
            <li>
              <div className="sidebar-widget-list-left">
                <button
                  onClick={e => {
                    getSortParams("silueta", "");
                    setActiveSort(e);
                  }}
                >
                  <span className="checkmark" /> {t("general_words.all_silhouettes")}{" "}
                </button>
              </div>
            </li>
            {siluetas.map((silueta, key) => {
              return (
                <li key={key}>
                  <div className="sidebar-widget-list-left">
                    <button
                      className="text-uppercase"
                      onClick={e => {
                        getSortParams("silueta", silueta);
                        setActiveSort(e);
                      }}
                    >
                      {" "}
                      <span className="checkmark" />
                      {silueta}{" "}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          t("general_words.not_fount_silhouettes")
        )}
      </div>
    </div>
  );
};

ShopSilueta.propTypes = {
  getSortParams: PropTypes.func,
  sizes: PropTypes.array
};

export default ShopSilueta;
