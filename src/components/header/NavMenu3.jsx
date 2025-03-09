import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react"; // Usamos useState para manejar el estado de dropdown
import data from "../../data/menus.json";

const NavMenu3 = ({ menuWhiteClass, sidebarMenu }) => {
  const [openSubmenu, setOpenSubmenu] = useState(null); // Estado para el primer nivel
  const [openMarca, setOpenMarca] = useState(null); // Estado para el segundo nivel (Marcas)

  const toggleSubmenu = (id) => {
    setOpenSubmenu(openSubmenu === id ? null : id); // Toggle el primer nivel
  };

  const toggleMarcaDropdown = (id) => {
    setOpenMarca(openMarca === id ? null : id); // Toggle el segundo nivel (MARCAS)
  };

  return (
    <div
      className={clsx(
        sidebarMenu
          ? "sidebar-menu"
          : `main-menu ${menuWhiteClass ? menuWhiteClass : ""}`
      )}
    >
      <nav>
        <ul>
          {data.menu.map((menu) => {
            return (
              <li key={menu.id} className="mx-4 uppercase">
                <Link to={process.env.PUBLIC_URL + `/${menu.slug}`}>
                  <span className="fw-600">{menu.title}</span>
                </Link>

                {menu.subitems.length === 0 ? (
                  ""
                ) : (
                  <ul className="submenu">
                    {menu.subitems.map((subitem) => (
                      <li key={subitem.id} className="border-b-2 mb-3">
                        <Link to={process.env.PUBLIC_URL + `/${subitem.slug}`}>
                          <span className="fw-600 uppercase fs-6">
                            {subitem.title}
                            <span className="px-1">
                              {subitem.subitems &&
                              subitem.subitems.length > 0 ? (
                                sidebarMenu ? (
                                  <ChevronDown onClick={() => toggleSubmenu(subitem.id)} />
                                ) : (
                                  <ChevronRight onClick={() => toggleSubmenu(subitem.id)} />
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          </span>
                        </Link>

                        {/* Submenu para "MARCAS" */}
                        {subitem.title === "MARCAS" && subitem.subitems.length > 0 && (
                          <ul className="submenu-sub">
                            {subitem.subitems.map((marca) => (
                              <li key={marca.id}>
                                <div className="d-flex justify-content-between">
                                  <Link
                                    to={process.env.PUBLIC_URL + `/${marca.slug}`}
                                  >
                                    <span className="fw-600 uppercase fs-6">
                                      {marca.title}
                                    </span>
                                  </Link>
                                  {openMarca === marca.id ? (
                                    <ChevronDown
                                      onClick={() => toggleMarcaDropdown(marca.id)}
                                    />
                                  ) : (
                                    <ChevronRight
                                      onClick={() => toggleMarcaDropdown(marca.id)}
                                    />
                                  )}
                                </div>

                                {/* Dropdown de marcas */}
                                {openMarca === marca.id && (
                                  <ul className="submenu-sub-item">
                                    {/* Aquí puedes agregar más subcategorías o detalles si lo deseas */}
                                    <li>
                                      <Link to={process.env.PUBLIC_URL + `/${marca.slug}/subcategoria1`}>
                                        Subcategoría 1
                                      </Link>
                                    </li>
                                    <li>
                                      <Link to={process.env.PUBLIC_URL + `/${marca.slug}/subcategoria2`}>
                                        Subcategoría 2
                                      </Link>
                                    </li>
                                  </ul>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

NavMenu3.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
  data: PropTypes.shape({
    menu: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        subitems: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
            slug: PropTypes.string.isRequired,
            subitems: PropTypes.array, // Para manejar sub-sub elementos
          })
        ),
      })
    ),
  }).isRequired,
};

export default NavMenu3;
