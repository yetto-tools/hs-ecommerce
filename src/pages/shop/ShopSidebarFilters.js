import PropTypes from "prop-types";
import clsx from "clsx";
import ShopSearch from "../../components/product/ShopSearch";
import { resetFilters, setFilters } from "../../store/slices/articles-slice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { t } from "i18next";

const ShopSidebarFilters = ({ filters, sideSpaceClass }) => {
  const dispatch = useDispatch();
  const activeFilters = useSelector((state) => state.articles.filters);

  // Estado para controlar qué filtro está abierto
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  // Resetear filtros → restaurar artículos originales
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  // Aplicar filtros dinámicamente (solo afecta el estado de artículos)
  const handleFilterClick = (filterType, value) => {
    if (value === "todo" || value === "all") {
      dispatch(setFilters({ filterType, value: "all" }));
    } else {
      dispatch(setFilters({ filterType, value }));
    }
  };

  // Saber si un filtro está activo
  const isActive = (filterType, value) =>
    Array.isArray(activeFilters[filterType]) &&
    activeFilters[filterType].includes(value);

  return (
    <div className={clsx("sidebar-style mt-4", "pr-20", sideSpaceClass)}>
      <section className="my-3 sticky-top bg-white p-2 z-1 border-bottom mb-10">
        {/* Buscador */}
        <ShopSearch />
        {/* Filtros activos */}
        {Object.keys(activeFilters).length > 0 && (
          <div className="my-3">
            <h6 className="fw-bold">Filtros activos:</h6>
            <div className="d-flex flex-wrap gap-2">
              {Object.entries(activeFilters).map(([type, values]) =>
                values.map((val) => (
                  <span
                    key={`${type}-${val}`}
                    className="badge rounded-pill bg-primary text-white d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleFilterClick(type, val)}
                  >
                    {val}
                    <span
                      className="ms-2 text-white fw-bold"
                      style={{ fontSize: "0.8rem" }}
                    >
                      ✕
                    </span>
                  </span>
                ))
              )}
            </div>
          </div>
        )}
        {/* Botón reset */}
        <div className="my-5 d-flex flex-row align-items-center justify-content-center">
          <button
            onClick={handleResetFilters}
            className="button-active-hs btn-black py-1"
            id="limpiar-filtros"
          >
            Limpiar Filtros
          </button>
        </div>
      </section>

      {/* Sección Marcas */}
      <div className={clsx("sidebar-widget", filters?.brands?.length ? "mt-20 mb-20" : "d-none")}>
        {
          filters?.brands?.length
          ? (
              <h4 className="pro-sidebar-title fw-bold cursor-pointer border-bottom pb-1" onClick={() => toggleSection("brands")}>
                {t("filtros.brands")}
                <span className="float-end cursor-pointer">
                  {
                    openSection === "brands" 
                      ? ( <i className="fa fa-angle-up" />) 
                      : ( <i className="fa fa-angle-down" />)
                  }
                </span>
              </h4>
            ) 
          : ("")
        }

        {openSection === "brands" && (
          <div className="sidebar-widget-list bg-light py-4">
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
                      "active-filter": isActive(
                        "brand",
                        brand.name.toUpperCase()
                      ),
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
        )}
      </div>

      {/* Sección Colores */}
      <div className="sidebar-widget mt-20 mb-20">
       {
          filters?.colors?.length 
          ? (
              <h4 className="pro-sidebar-title fw-bold cursor-pointer border-bottom pb-1" onClick={() => toggleSection("colors")}>
                {t("filtros.colors")}
                <span className="float-end cursor-pointer">
                  {
                    openSection === "colors" 
                      ? ( <i className="fa fa-angle-up" />) 
                      : ( <i className="fa fa-angle-down" />)
                  }
                </span>
              </h4>
            ) 
          : ("")
        }
        <section
          className={clsx("accordion-content", { show: openSection === "colors" })}
        >
          <div className="sidebar-widget-list bg-light py-4 pl-4">
            <div className="d-flex flex-wrap gap-2 w-100 px-4">
              <ul className="accordion-scroll w-100">
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
                    <label className="d-flex justify-content-around align-items-center cursor-pointer">
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
                          "active-filter": isActive("color", color.name.toUpperCase()),
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
        </section>
      </div>

      {/* Sección Tallas */}
      <div className={clsx("sidebar-widget", filters?.sizes?.length ? "mt-20 mb-20" : "d-none")}>
        {
          filters?.sizes?.length
          ? (
              <h4 className="pro-sidebar-title fw-bold cursor-hand border-bottom pb-1" onClick={() => toggleSection("sizes")}>
                {t("filtros.sizes")}
                <span className="float-end cursor-hand">
                  {
                    openSection === "sizes" 
                      ? ( <i className="fa fa-angle-up" />) 
                      : ( <i className="fa fa-angle-down" />)
                  }
                </span>
              </h4>
            ) 
          : ("")
        }

        <section className={clsx("accordion-content", { show: openSection === "sizes" })} >
          <div className="sidebar-widget-list bg-light py-4">
            <div className="d-flex flex-wrap gap-2">

              {filters?.sizes?.length ? (
                filters.sizes.map((item, index) => (
                  <span
                    key={index}
                    className={clsx(
                      "text-xs rounded badge text-bg-light cursor-hand hover-tag",
                      {
                        "active-filter": isActive("size", item.size.toUpperCase()),
                      }
                    )}
                    onClick={() => handleFilterClick("size", item.size.toUpperCase())}
                  >
                    {item.size}
                  </span>
                ))
              ) : (
                <span>Sin etiquetas</span>
              )}
            </div>
          </div>
        </section>
        
      </div>


      {/* Sección Etiquetas */}
      <div className="sidebar-widget mt-20 mb-20">
        {
          filters?.tags?.length 
          ? (
              <h4 className="pro-sidebar-title fw-bold cursor-hand border-bottom pb-1" onClick={() => toggleSection("tags")}>
                {t("filtros.tags")}
                <span className="float-end cursor-hand">
                  {
                    openSection === "tags" 
                      ? ( <i className="fa fa-angle-up" />) 
                      : ( <i className="fa fa-angle-down" />)
                  }
                </span>
              </h4>
            ) 
          : ("")
        }
        

        <section
          className={clsx("accordion-content", { show: openSection === "tags" })}
        >
          <div className="sidebar-widget-tag mt-25 w-100">
            <div className="d-flex flex-wrap gap-2">

              {filters?.tags?.length ? (
                filters.tags.map((item, index) => (
                  <span
                    key={index}
                    className={clsx(
                      "text-xs rounded badge text-bg-light cursor-hand hover-tag",
                      {
                        "active-filter": isActive("tag", item.tag.toUpperCase()),
                      }
                    )}
                    onClick={() => handleFilterClick("tag", item.tag.toUpperCase())}
                  >
                    {item.tag}
                  </span>
                ))
              ) : (
                <span>Sin Etiquetas</span>
              )}
            </div>
          </div>
        </section>
      </div>
      

    </div>
  );
};

ShopSidebarFilters.propTypes = {
  filters: PropTypes.object,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebarFilters;
