import PropTypes from "prop-types";
import clsx from "clsx";
import ShopSearch from "../../components/product/ShopSearch";
import { resetFilters, setFilters } from "../../store/slices/articles-slice";
import { useDispatch, useSelector } from "react-redux";

const ShopSidebarFilters = ({ filters, sideSpaceClass }) => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => state.articles.filters);

  // Resetear filtros → restaurar artículos originales
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  // Aplicar filtros dinámicamente
  const handleFilterClick = (filterType, value) => {
    if (value === "todo" || value === "all") {
      dispatch(setFilters({ filterType, value: "all" }));
    } else {
      dispatch(setFilters({ filterType, value }));
    }
  };

  const isActive = (filterType, value) =>
    Array.isArray(activeFilters[filterType]) &&
    activeFilters[filterType].includes(value);

  return (
    <div className={clsx("sidebar-style mt-4", "pr-20", sideSpaceClass)}>
      {/* Buscador */}
      <ShopSearch />

      <div className="my-5 d-flex flex-row align-items-center justify-content-center">
        <button
          onClick={handleResetFilters}
          className="btn btn-primary text-white fw-bold"
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
            <li>
              <button
                className={clsx({ "active-filter": !activeFilters.brand })}
                onClick={() => handleFilterClick("brand", "all")}
              >
                Todas las Marcas
              </button>
            </li>
            {filters?.brands?.map((brand) => (
              <li key={brand.id + brand.name}>
                <button
                  className={clsx({
                    "active-filter": isActive("brand", brand.name.toUpperCase()),
                  })}
                  onClick={() =>
                    handleFilterClick("brand", brand.name.toUpperCase())
                  }
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
              <button
                className={clsx({ "active-filter": !activeFilters.color })}
                onClick={() => handleFilterClick("color", "all")}
              >
                Todos los Colores
              </button>
            </li>
            {filters?.colors?.map((color) => (
              <li key={color.id + color.name}>
                <label className="d-flex align-items-center cursor-pointer">
                  <span
                    className="checkmark p-2 rounded-circle border"
                    style={{
                      backgroundColor: color.hex,
                      width: "1.5rem",
                      height: "1.5rem",
                    }}
                  />
                  <button
                    className={clsx({
                      "active-filter": isActive(
                        "color",
                        color.name.toUpperCase()
                      ),
                    })}
                    onClick={() =>
                      handleFilterClick("color", color.name.toUpperCase())
                    }
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
              <button
                className={clsx({ "active-filter": !activeFilters.size })}
                onClick={() => handleFilterClick("size", "all")}
              >
                Todas las Tallas
              </button>
            </li>
            {filters?.sizes?.map((size) => (
              <li key={size.id + size.name}>
                <button
                  className={clsx({
                    "active-filter": isActive("size", size.name),
                  })}
                  onClick={() => handleFilterClick("size", size.name)}
                >
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
          {filters?.tags?.length ? (
            filters.tags.map((tag, index) => (
              <span
                key={index}
                className={clsx("text-xs rounded badge text-bg-light cursor-hand", {
                  "active-filter": isActive("tag", tag.tag.toUpperCase()),
                })}
                onClick={() => handleFilterClick("tag", tag.tag.toUpperCase())}
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
