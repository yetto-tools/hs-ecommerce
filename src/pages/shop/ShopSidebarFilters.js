import PropTypes from "prop-types";
import clsx from "clsx";
import ShopSearch from "../../components/product/ShopSearch";
import { resetFilters, setFilters } from "../../store/slices/articles-slice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback, useEffect } from "react";
import { jsonToXml } from "../../helpers/validator";
import {
  fetchArticles,
  fetchFilterAritcle,
} from "../../hooks/use-FetchArticles";
import { useLocation, useParams } from "react-router-dom";

const useQueryParams = () => {
  const { search } = useLocation(); // Obtiene la parte de la query string
  return new URLSearchParams(search); // Convierte a un objeto manipulable
};

const ShopSidebarFilters = ({ filters, sideSpaceClass }) => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => state.articles.filters);
  const { params } = useSelector((state) => state.urlParams);
  const query = useQueryParams();

  // Resetear filtros y recargar la página
  const handleResetFilters = async () => {
    if (params) {
      const [n1, n2, n3] = params?.split("/").map(Number);

      dispatch(fetchArticles(n1, n2, n3));
      dispatch(resetFilters());
    }

    //  window.location.reload(); // Recargar la página
  };

  // Aplicar filtros dinámicamente
  const handleFilterClick = useCallback(
    async (filterType, value) => {
      const [n1, n2, n3] = query.get("categoria")?.split("/") || [];
      if (!value && n3) {
        value = n3;
      }

      if (value === "todo") {
        handleResetFilters(); // Si selecciona "Todo", se resetea y recarga
      } else {
        dispatch(setFilters({ filterType, value }));

        const filtersToSend = {
          ...activeFilters,
          [filterType]: [value],

          ...(n3 ? { marca: [n3] } : {}), // Agregar "marca" solo si `n3` no está vacío o undefined
        };

        // Agregar "grupo" solo si `n1` no está vacío o undefined
        // conserva estado de seleccion previo segun menu
        const grupo = n1 ? n1 : "";

        await dispatch(fetchFilterAritcle(jsonToXml(filtersToSend, grupo)));
      }
    },
    [dispatch, activeFilters]
  );

  const isActive = (filterType, value) =>
    activeFilters[filterType]?.includes(value);

  const selected = (filterType, value) => {
    return (
      Array.isArray(activeFilters[filterType]) &&
      activeFilters[filterType].includes(value)
    );
  };

  useEffect(() => {
    const [n1, n2, n3] = query.get("categoria")?.split("/") || [];
    if (n3) {
      handleFilterClick("Marca", null);
    }
  }, []);

  return (
    <div className={clsx("sidebar-style mt-4", "pr-20", sideSpaceClass)}>
      {/* Buscador */}
      <ShopSearch />
      <div className="my-5 d-flex flex-row align-items-center justify-content-center">
        <button
          onClick={handleResetFilters}
          className="button-active-hs btn-black py-1"
          id="limpiar-filtros"
        >
          Limpiar Filtros
        </button>
      </div>
      {/* Marcas */}
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title fw-bold">Marcas</h4>
        <div className="sidebar-widget-list mt-30">
          <ul>
            <li
              className={clsx({ "active-filter": isActive("Marca", "todo") })}
            >
              <button onClick={() => handleFilterClick("Marca", "todo")}>
                Todas las Marcas
              </button>
            </li>
            {filters &&
              filters?.brands?.map((brand) => (
                <li key={brand.id + brand.name}>
                  <button
                    className={clsx({
                      "active-filter": selected("Marca", brand?.name),
                    })}
                    onClick={() => handleFilterClick("Marca", brand?.name)}
                  >
                    {brand.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Colores */}
      <div className="sidebar-widget mt-50">
        <h4 className="pro-sidebar-title fw-bold">Colores</h4>
        <div className="sidebar-widget-list mt-20">
          <ul>
            <li>
              <button onClick={() => handleFilterClick("Color", "todo")}>
                Todos los Colores
              </button>
            </li>
            {filters &&
              filters?.colors?.map((color) => (
                <li key={color.id + color.name}>
                  <label className="d-flex align-items-center cursor-pointer">
                    <span
                      className="checkmark p-2 rounded-circle border"
                      style={{
                        backgroundColor: color.hex,
                        width: "1.5rem",
                        height: "1.5rem",
                      }}
                    >
                      &nbsp;{" "}
                    </span>
                    <button
                      onClick={() => handleFilterClick("Color", color.name)}
                    >
                      {color.name}
                    </button>
                  </label>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Tallas */}
      <div className="sidebar-widget mt-40">
        <h4 className="pro-sidebar-title fw-bold">Tallas</h4>
        <div className="sidebar-widget-list mt-20">
          <ul>
            <li>
              <button onClick={() => handleFilterClick("Talla", "todo")}>
                Todas las Tallas
              </button>
            </li>
            {filters &&
              filters?.sizes?.map((size) => (
                <li key={size.id + size.name}>
                  <button onClick={() => handleFilterClick("Talla", size.name)}>
                    {size.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>

      {/* Etiquetas */}
      <div className="sidebar-widget mt-50">
        <h4 className="pro-sidebar-title fw-bold">Etiquetas</h4>
        <div className="sidebar-widget-tag mt-25 w-50">
          {filters && filters?.tags?.length ? (
            filters?.tags?.map((tag, index) => (
              <span
                className="text-xs rounded badge text-bg-light cursor-hand"
                key={index + tag.tag}
                onClick={() => handleFilterClick("Etiqueta", tag.tag)}
              >
                {tag.tag}
              </span>
            ))
          ) : (
            <span>Sin etiquetas</span>
          )}
        </div>
      </div>
    </div>
  );
};

ShopSidebarFilters.propTypes = {
  filters: PropTypes.object,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebarFilters;
