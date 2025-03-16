import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { fetchSearchArticles } from "../../hooks/use-FetchArticles";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const ShopSearch = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // Obtener los parámetros de la URL

  // Recuperar el valor anterior de la búsqueda desde la URL
  const initialSearch = searchParams.get("busqueda") || "";
  const [value, setValue] = useState(initialSearch);

  useEffect(() => {
    if (initialSearch) {
      dispatch(fetchSearchArticles(initialSearch)); // Cargar resultados si ya hay una búsqueda
    }
  }, [dispatch, initialSearch]);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (value.trim()) {
      // Si hay un valor, actualizar la URL y hacer la búsqueda
      navigate(`/productos?busqueda=${value.trim()}`);
      await dispatch(fetchSearchArticles(value.trim()));
    } else {
      // Si el input está vacío, regresar a "/productos" y limpiar la búsqueda
      navigate("/productos");
    }
  };

  return (
    <div className="sidebar-widget">
      <h4 className="pro-sidebar-title">{t("shop_search.label")} </h4>
      <div className="pro-sidebar-search mb-50 mt-25">
        <section className="pro-sidebar-search-form">
          <input
            type="search"
            placeholder={t("shop_search.place_holder")}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch(e);
              }
            }}
          />
          <button onClick={handleSearch} type="button">
            <i className="pe-7s-search" />
          </button>
        </section>
      </div>
    </div>
  );
};

export default ShopSearch;
