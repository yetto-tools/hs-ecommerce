import PropTypes from "prop-types";
import clsx from "clsx";
import ShopSearch from "../../components/product/ShopSearch";

const ShopSidebar = ({
  brands = [],
  colors = [],
  sizes = [],
  tags = [],
  onFilterChange,
  sideSpaceClass
}) => {
  const handleFilterClick = (filterType, value) => {
    onFilterChange(filterType, value);
  };

  return (
    <div className={clsx("sidebar-style", "pr-20", sideSpaceClass)}>
      {/* Buscador */}
      <ShopSearch />

      {/* Marcas */}
      <div className="sidebar-widget">
        <h4 className="pro-sidebar-title">Marcas</h4>
        <div className="sidebar-widget-list mt-30">
          <ul>
            <li>
              <button onClick={() => handleFilterClick("brand", "all")}>
                Todas las Marcas
              </button>
            </li>
            {brands.map((brand) => (
              <li key={brand.id}>
                <button onClick={() => handleFilterClick("brand", brand.brand)}>
                  {brand.brand}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Colores */}
      <div className="sidebar-widget mt-50">
        <h4 className="pro-sidebar-title">Colores</h4>
        <div className="sidebar-widget-list mt-20">
          <ul>
            <li>
              <button onClick={() => handleFilterClick("color", "all")}>
                Todos los Colores
              </button>
            </li>
            {colors.map((color) => (
              <li key={color.id}>
                <label>
                  <span className="checkmark" style={{ backgroundColor: color.hex }}/>
                  <button onClick={() => handleFilterClick("color", color.name)}>
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
        <h4 className="pro-sidebar-title">Tallas</h4>
        <div className="sidebar-widget-list mt-20">
          <ul>
            <li>
              <button onClick={() => handleFilterClick("size", "all")}>
                Todas las Tallas
              </button>
            </li>
            {sizes.map((size) => (
              <li key={size.id}>
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
        <h4 className="pro-sidebar-title">Etiquetas</h4>
        <div className="sidebar-widget-tag mt-25 w-50">
          {tags.length ? (
            tags.map((tag, index) => (
              <span
              className="text-xs rounded badge text-bg-light"
                key={index}
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

ShopSidebar.propTypes = {
  brands: PropTypes.array,
  colors: PropTypes.array,
  sizes: PropTypes.array,
  tags: PropTypes.array,
  onFilterChange: PropTypes.func.isRequired,
  sideSpaceClass: PropTypes.string,
};

export default ShopSidebar;
