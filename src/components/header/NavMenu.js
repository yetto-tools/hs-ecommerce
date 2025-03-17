import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";
import { ChevronDown, ChevronRight } from "lucide-react";
import data from "../../data/menus.json";

const NavMenu = ({ menuWhiteClass, sidebarMenu }) => {
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
              <li key={menu.id} className="mx-lg-2 mx-md-2 uppercase">
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
                                  <ChevronDown />
                                ) : (
                                  <ChevronRight />
                                )
                              ) : (
                                ""
                              )}
                            </span>
                          </span>
                        </Link>

                        {/* Si tiene subitems, los renderiza */}
                        {subitem.subitems && subitem.subitems.length > 0 && (
                          <ul className="submenu-sub">
                            {subitem.subitems.map((subsubitem) => (
                              <li key={subsubitem.id}>
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    `/${subsubitem.slug}`
                                  }
                                >
                                  <span className="fw-600 uppercase fs-6">
                                    {subsubitem.title}
                                    {subitem.subitems &&
                                      subitem.subitems.length > 0 && (
                                        <ul className="submenu-subsub">
                                          {subitem.subitems.map(
                                            (subsubitem) => (
                                              <li key={subsubitem.id}>
                                                <Link
                                                  to={
                                                    process.env.PUBLIC_URL +
                                                    `/${subsubitem.slug}`
                                                  }
                                                >
                                                  <span className="fw-600 uppercase fs-6">
                                                    {subsubitem.title}
                                                  </span>
                                                </Link>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                      )}
                                  </span>
                                </Link>
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

NavMenu.propTypes = {
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

export default NavMenu;
