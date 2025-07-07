import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ChevronRight, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { fetchMenu } from "../../../hooks/use-FetchMenu";
import { setUrlParams } from "../../../store/slices/urlParams-slice";
import "../../../assets/scss/MobileNavMenu.scss"; // Asegúrate de tener los estilos adecuados.

const MobileNavMenu = () => {
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.menu);
  const [openSubmenus, setOpenSubmenus] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const toggleSubMenu = (id) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderMenu = (items, isFirstLevel = false) => {
    if (!items?.length) return null;

    return (
      <ul
        className={clsx(
          "dropdown-menu my-4",
          {
            show: isFirstLevel || openSubmenus[items[0].id],
          },
          !isFirstLevel && "show"
        )}
      >
        {items.map((item, index) => (
          <li
            key={item.id + "-" + index}
            className={clsx("col-12 mx-md-1 px-md-1", {
              "dropdown-submenu": item.subitems?.length > 0,
            })}
            name="item-menu"
            level={item.nivel}
          >
            <div className="d-flex justify-content-between align-items-center">
              <Link
                name="item-link"
                to={`/productos?categoria=${item.slug}`}
                className={clsx("dropdown-item mt-0 mx-md-1 px-md-1", {
                  "py-2 item-menu-name": isFirstLevel,
                })}
                id={item.ids}
                level={item.nivel}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setUrlParams(item.nivel));
                  if (item.subitems?.length > 0) {
                    toggleSubMenu(item.id);
                  }
                  navigate(`/productos?categoria=${item.slug}`);
                }}
              >
                <span className={clsx(!isFirstLevel && "text-item-submenu")}>
                  {item.title}
                </span>
              </Link>
              {item.subitems?.length > 0 && (
                <button
                  className="toggle-submenu-btn btn-arrow-flat"
                  onClick={() => toggleSubMenu(item.id)}
                >
                  {openSubmenus[item.id] ? (
                    <ChevronDown size={20} />
                  ) : (
                    <ChevronRight size={20} />
                  )}
                </button>
              )}
            </div>
            {openSubmenus[item.id] && (
              <div className="pl-5">{renderMenu(item.subitems)}</div>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className="offcanvas-navigation" id="offcanvas-navigation">
      {renderMenu(menu, true)}
    </nav>
  );
};

export default MobileNavMenu;
