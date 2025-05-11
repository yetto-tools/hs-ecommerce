import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchSearchArticles } from "../../../hooks/use-FetchArticles";

const MobileSearch = () => {
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
    <div className="offcanvas-mobile-search-area">
      <input
        type="text"
        placeholder="Buscar ..."
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(e);
          }
        }}
        className="pr-5"
      />
      <button onClick={handleSearch} type="button">
        <i className="fa fa-search" />
      </button>
    </div>
  );
};

export default MobileSearch;
