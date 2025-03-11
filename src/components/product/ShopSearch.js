import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchSearchArticles } from "../../hooks/use-FetchArticles";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ShopSearch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    navigate("/busqueda=" + value.trim());
    await dispatch(fetchSearchArticles(value.trim()));
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">{t("shop_search.label")} </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <section className="pro-sidebar-search-form">
          <input
            type="text"
            placeholder={t("shop_search.place_holder")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          />
          <button onClick={handleSearch} type="botom">
            <i className="pe-7s-search" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ShopSearch;
