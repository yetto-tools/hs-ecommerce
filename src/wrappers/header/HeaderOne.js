import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/header/Logo";

import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";

import MultiLevelDropdown from "../../data/menus/MultiLevelDropdown";
import { APP_ENV, APP_VERSION, DB_ENV } from "../../config";
import ShopSearch from "../../components/product/ShopSearch";

const HeaderOne = ({
  layout,
  top,
  borderStyle,
  headerPaddingClass,
  headerPositionClass,
  headerBgClass,
}) => {
  const [scroll, setScroll] = useState(0);
  const [headerTop, setHeaderTop] = useState(0);

  useEffect(() => {
    const header = document.querySelector(".sticky-bar");
    setHeaderTop(header.offsetTop);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  const handleOnclick = () => {};
  return (
    <>
      {APP_ENV === "development" ? (
        <div
          style={{
            position: "fixed",
            zIndex: 10,
            bottom: 0,
            left: 0,
            backgroundColor: "red",
            color: "white",
            padding: "16px 8px",
            fontSize: "1.8rem",
            fontWeight: "bold",
            width: "100%",
            textAlign: "center",
            justifyContent: "center",
            letterSpacing: "2px",
          }}
          onClick={handleOnclick}
        >
          Entorno de Pruebas - ({APP_VERSION}) - {DB_ENV}
        </div>
      ) : (
        ""
      )}

      <header
        className={clsx(
          "header-area clearfix text-theme ",
          headerBgClass,
          headerPositionClass
        )}
      >
        <div
          className={clsx(
            "header-top-area",
            headerPaddingClass,
            top === "visible" ? "d-none d-lg-block" : "d-none",
            borderStyle === "fluid-border" && "border-none"
          )}
        >
          <div className={layout === "container-fluid" ? layout : "container"}>
            {/* header top */}
            {/* <HeaderTop borderStyle={borderStyle} /> */}
          </div>
        </div>

        <div
          className={clsx(
            headerPaddingClass,
            "sticky-bar header-res-padding clearfix",
            scroll > headerTop && "stick"
          )}
        >
          <div
            className={clsx(
              "mx-auto container-fluid",
              layout === "container-fluid " ? layout : "row col-xl-10"
            )}
          >
            <div
              className={`row align-items-center justify-content-between col-xxl-12 col-xl-12`}
            >
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-4">
                <div className="d-flex justify-content-center align-items-center w-75 px-4">
                  <Logo imageUrl="/logo-light.png" logoClass="logo" />
                </div>
              </div>
              <div className="col-xxl-7 col-xl-6 col-lg-7 col-md-5 d-none d-lg-block">
                <div className="d-flex justify-content-center align-items-center">
                  <ShopSearch
                    className="w-100 d-none d-lg-block rounded-pill"
                    onlySearch={false}
                  />
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-4 ">
                {/* Icon group */}
                <IconGroup />
              </div>
              <div className="container-fluid  mx-auto d-none d-lg-block pb-3">
                <MultiLevelDropdown sidebarMenu={false} />
              </div>
            </div>
          </div>
          {/* mobile menu */}
          <MobileMenu />
        </div>
      </header>
    </>
  );
};

HeaderOne.propTypes = {
  borderStyle: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  layout: PropTypes.string,
  top: PropTypes.string,
};

export default HeaderOne;
