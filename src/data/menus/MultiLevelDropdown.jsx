import React, { useEffect, useState } from "react";
import "./MultiLevelDropdown.scss";
import { ChevronRight } from "lucide-react";
import clsx from "clsx";
import { fetchMenu } from "../../hooks/use-FetchMenu";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setUrlParams } from "../../store/slices/urlParams-slice";
import { resetFilters } from "../../store/slices/articles-slice";

const MultiLevelDropdown = ({ sidebarMenu = false }) => {
  const dispatch = useDispatch();
  const { menu } = useSelector((state) => state.menu);
  const { params } = useSelector((state) => state.urlParams);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const renderMenu = (items, isFirstLevel = false) => {
    if (!items?.length) return null;

    // const handleClick = (e) => {
    //   e.preventDefault();
    //   const target = e.target.dataset.slug;
    //   if (target) {
    //     navigate(target);
    //   }
    // };

    return (
      <ul
        className={clsx("dropdown-menu  my-0", isFirstLevel && "show d-flex")}
      >
        {items.map((item, index) => (
          <li
            key={item.id + "-" + index}
            className={clsx(
              "d-flex flex-inline align-items-center mx-md-1 px-md-1",
              item.subitems?.length > 0 && "dropdown-submenu "
            )}
            name="item-menu"
            level={item.nivel}
            onClick={(e) => {
              dispatch(resetFilters());
            }}
          >
            {isFirstLevel ? (
              <Link
                name="item-link"
                to={`/productos?categoria=${item.slug}`}
                className={clsx(
                  "dropdown-item mt-0 mx-md-1 px-md-1",
                  isFirstLevel && "py-4 item-menu-name parent-menu"
                )}
                dataset-slug={item.slug}
                id={item.ids}
                level={item.nivel}
                onClick={(e) => {
                  dispatch(setUrlParams(item.nivel));
                  dispatch(resetFilters());
                  navigate(`/productos?categoria=${item.slug}`);
                }}
              >
                {item.title}
              </Link>
            ) : (
              <Link
                name="item-link"
                to={`/productos?categoria=${item.slug}`}
                className={clsx(
                  "dropdown-item mt-0 mx-md-1 px-md-1",
                  isFirstLevel && "py-4 item-menu-name parent-menu"
                )}
                id={item.ids}
                level={item.nivel}
                onClick={(e) => {
                  dispatch(setUrlParams(item.nivel));
                  dispatch(resetFilters());
                }}
              >
                {item.title}
              </Link>
            )}

            {item.subitems?.length > 0 && (
              <>
                {renderMenu(item.subitems)}
                {!isFirstLevel && (
                  <ChevronRight size={20} className="ms-auto" />
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return <div className="dropdown container">{renderMenu(menu, true)}</div>;
};

export default MultiLevelDropdown;
