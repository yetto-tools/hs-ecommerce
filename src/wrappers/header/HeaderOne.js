import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Logo from "../../components/header/Logo";

import IconGroup from "../../components/header/IconGroup";
import MobileMenu from "../../components/header/MobileMenu";

import MultiLevelDropdown from "../../data/menus/MultiLevelDropdown";
import { APP_ENV, APP_VERSION } from "../../config";

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

  return (
    <>
      {APP_ENV === "development" ? (
        <div
          style={{
            position: "fixed",
            zIndex: 9999,
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
        >
          Entorno de Pruebas - ({APP_VERSION})
        </div>
      ) : (
        ""
      )}

      <header
        className={clsx(
          "header-area clearfix bg-black text-white ",
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
            className={
              layout === "container-fluid " ? layout : "container-fluid"
            }
          >
            <div className={`row align-items-center justify-content-between`}>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-4">
                <div className="d-flex justify-content-center align-items-center w-75">
                  {/* header logo */}
                  <Logo imageUrl="/logo-w-colors.png" />
                </div>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-5 col-md-5 d-none d-lg-block">
                <MultiLevelDropdown sidebarMenu={false} />
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-4 col-md-3 col-4 ">
                {/* Icon group */}
                <IconGroup />
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
