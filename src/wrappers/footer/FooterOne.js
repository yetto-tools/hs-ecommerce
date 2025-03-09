import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import FooterCopyright from "../../components/footer/FooterCopyright";
import FooterNewsletter from "../../components/footer/FooterNewsletter";
import { useTranslation } from "react-i18next";

const FooterOne = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  spaceLeftClass,
  spaceRightClass,
  containerClass,
  extraFooterClass,
  sideMenu,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <footer
        className={clsx(
          "footer-area",
          backgroundColorClass,
          spaceTopClass,
          spaceBottomClass,
          extraFooterClass,
          spaceLeftClass,
          spaceRightClass
        )}
      >
        <div className={`${containerClass ? containerClass : "container"}`}>
          <div className="row">
            <div
              className={`${
                sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
            >
              {/* footer copyright */}
              <FooterCopyright
                footerLogo="/logo-w-colors.png"
                spaceBottomClass="mb-10"
              />
            </div>
            <div
              className={`${
                sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
            >
              <div className="footer-widget mb-30 ml-30">
                <div className="footer-title">
                  <h3>{t("about_us")}</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/about"}>
                        {t("footer.about_us")}
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "#/"}>
                        {t("footer.size_guide")}
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "#/"}>
                        {t("footer.store_location")}
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/contact"}>
                        {t("footer.contact")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={`${
                sideMenu ? "col-xl-2 col-sm-4" : "col-lg-2 col-sm-4"
              }`}
            >
              <div
                className={`${
                  sideMenu
                    ? "footer-widget mb-30 ml-95"
                    : "footer-widget mb-30 ml-50"
                }`}
              >
                <div className="footer-title">
                  <h3>{t("useful_links")}</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "#/"}>
                        {t("footer.returns")}
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "#/"}>
                        {t("footer.terms_conditions")}
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "#/"}>
                        {t("footer.payment_method")}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={`${
                sideMenu ? "col-xl-3 col-sm-4" : "col-lg-2 col-sm-6"
              }`}
            >
              <div
                className={`${
                  sideMenu
                    ? "footer-widget mb-30 ml-145"
                    : "footer-widget mb-30 ml-75"
                }`}
              >
                <div className="footer-title">
                  <h3>{t("follow_us")}</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <a
                        href="https://www.facebook.com/Hypestreetstoree/?locale=es_LA"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="pe-2 ">
                          <i className="fa fa-facebook"></i>
                        </span>
                        Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://www.instagram.com/hypestreetstore/?hl=es"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="pe-2 ">
                          <i className="fa fa-instagram"></i>
                        </span>
                        Instagram
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              className={`${
                sideMenu ? "col-xl-3 col-sm-8" : "col-lg-4 col-sm-6"
              }`}
            >
              {/* footer newsletter */}
              <FooterNewsletter
                spaceBottomClass="mb-30"
                spaceLeftClass="ml-70"
                sideMenu={sideMenu}
              />
            </div>
          </div>
        </div>
        <div className={`${"container my-0"}`}>
          <span className="copy text-white">
            ©{new Date().getFullYear()}{" "}
            <a href="/" className="text-white">
              Hype Street Guatemala
            </a>
            .
          </span>
        </div>
        <div className="container mx-auto mt-4">
          <div className="row d-flex justify-content-start">
            <div className="col-4 d-flex gap-2 align-items-center">
              <span className="text-white ">creador por: </span>
              <a
                href="//dssolutionsgt.com"
                target="_blank"
                without
                rel="noreferrer"
                style={{ padding: "10px" }}
              >
                <span
                  style={{
                    color: "#aac02d",
                    fontWeight: "semibold",
                  }}
                >
                  DS Solutions
                </span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

FooterOne.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  sideMenu: PropTypes.bool,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default FooterOne;
