import { useTranslation } from "react-i18next";

const ShopSearch = () => {

  const {t} = useTranslation();

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">{t("shop_search.label")} </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <form className="pro-sidebar-search-form" action="#">
          <input type="text" placeholder={t("shop_search.place_holder")} />
          <button>
            <i className="pe-7s-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopSearch;
