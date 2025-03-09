import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

import data from "../../data/ligas.json";

const NavMenu2 = ({ menuWhiteClass, sidebarMenu }) => {
  const splitTeamsIntoColumns = (teams) => {
    const columnSize = Math.ceil(teams.length / 3);
    return [
      teams.slice(0, columnSize),
      teams.slice(columnSize, columnSize * 2),
      teams.slice(columnSize * 2),
    ];
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
          {Object.keys(data).map((key) => {
            const columns = splitTeamsIntoColumns(data[key].teams || []);
            return (
              <li key={key} className="mx-4">
                <Link to={process.env.PUBLIC_URL + "/"}>
                  {data[key].src && (
                    <img
                      src={data[key].src}
                      alt={key}
                      width={36}
                      className="me-2"
                    />
                  )}
                  {data[key].name}
                  {sidebarMenu ? (
                    <i className="fa fa-angle-right"></i>
                  ) : (
                    <i className="fa fa-angle-down" />
                  )}
                </Link>

                <ul className="mega-menu mega-menu-padding">
                  {columns.map((column, index) => (
                    <li key={index}>
                      <ul>
                        <li className="font-weight-bold"></li>
                        {column.map((team) => (
                          <li key={team.name}>
                            {/* <Link to={process.env.PUBLIC_URL + "/home-fashion-two"}> */}
                            <Link to={process.env.PUBLIC_URL + team.link}>
                              {team.src && (
                                <img
                                  className="pe-2"
                                  src={team.src}
                                  alt={team.name}
                                  width={32}
                                />
                              )}
                              {team.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

NavMenu2.propTypes = {
  menuWhiteClass: PropTypes.string,
  sidebarMenu: PropTypes.bool,
};

export default NavMenu2;
