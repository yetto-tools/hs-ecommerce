import PropTypes from "prop-types";
import clsx from "clsx";
import ShopSearch from "../../components/product/ShopSearch";
import { resetFilters, setFilters } from "../../store/slices/articles-slice";
import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";

const ShopSidebarFilters = ({ filters, sideSpaceClass }) => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => state.articles.filters);

  const handleResetFilters = useCallback(() => {
    dispatch(resetFilters());
  }, [dispatch]);

  const handleFilterClick = useCallback(
    (filterType, value) => {
      dispatch(setFilters({ filterType, value }));
    },
    [dispatch]
  );

  const isActive = (filterType, value) =>
    activeFilters[filterType]?.includes(value);

  return (
    <div className={clsx("sidebar-style", "pr-20", sideSpaceClass)}>
      {/* Buscador */}
      <ShopSearch />
      <button
        onClick={handleResetFilters}
        className="btn btn-outline-secondary mt-3 mb-3"
      >
        Limpiar Filtros
      </button>
      {/* Marcas */}
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title fw-bold">Marcas</h4>
        <div className="sidebar-widget-list mt-30">
          <ul>
            <li className={clsx({ "active-filter": isActive("brand", "all") })}>
              <button onClick={() => handleFilterClick("brand", "all")}>
                Todas las Marcas
              </button>
            </li>
            {filters &&
              filters?.brands?.map((brand) => (
                <li
                  key={brand.id + brand.name}
                  className={clsx({
                    "active-filter": isActive("brand", brand?.name),
                  })}
                >
                  <button
                    onClick={() => handleFilterClick("brand", brand?.name)}
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
              <button onClick={() => handleFilterClick("color", "all")}>
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
                      onClick={() => handleFilterClick("color", color.name)}
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
              <button onClick={() => handleFilterClick("size", "all")}>
                Todas las Tallas
              </button>
            </li>
            {filters &&
              filters?.sizes?.map((size) => (
                <li key={size.id + size.name}>
                  <button onClick={() => handleFilterClick("size", size.name)}>
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
                onClick={() => handleFilterClick("tag", tag.tag)}
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
