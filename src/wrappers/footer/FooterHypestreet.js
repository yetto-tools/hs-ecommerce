import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const FooterHypestreet = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
  containerClass,
  extraFooterClass,
}) => {
  const { t } = useTranslation();

  return (
    <footer
      className={clsx(
        "footer-area",
        backgroundColorClass,
        spaceTopClass,
        spaceBottomClass,
        extraFooterClass
      )}
    >
      <div className={`${containerClass ? containerClass : "container"}`}>
        <div className="d-flex flex-column flex-sm-row justify-content-center justify-content-sm-center flex-wrap">
          {/* Columna de Ayuda */}
          <div className="col-md-4 col-sm-8 mx-auto my-5 text-md-start text-sm-center ">
            <h5 className="font-bold text-lg uppercase mt-0 text-white">
              {t("footer.help")}
            </h5>
            <ul className="list-unstyled mt-4">
              <li>
                <Link className="text-white" to="/faq">
                  {t("footer.faq")}
                </Link>
              </li>
              <li>
                <Link className="text-white" to="/warranty">
                  {t("footer.warranty")}
                </Link>
              </li>

              <li>
                <Link className="text-white" to="/terms-conditions">
                  {t("footer.terms_conditions")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna de redes sociales */}
          <div className="col-md-4 col-sm-8 mx-auto my-5 text-center  uppercase">
            <div className="d-flex justify-content-center align-items-center">
              <img
                src="/logo-white-footer.png"
                alt="HS logo"
                className="mb-3"
                style={{ width: "64px", objectFit: "cover" }}
              />
              <div className="vertical-line"></div>

              <img
                src="/Logo Es Con Hype By. Rayan.png"
                alt="HS logo"
                className="mb-3"
                style={{ width: "64px", objectFit: "contain" }}
              />
            </div>
            <div className="d-flex justify-content-center">
              <Link
                to="https://www.facebook.com/Hypestreetstoree"
                className="m-2 bg-white rounded-circle"
              >
                <FaFacebookF className="text-black m-1" />
              </Link>
              <Link
                to="https://www.instagram.com/hypestreet.gt"
                className="m-2 bg-white rounded-circle"
              >
                <FaInstagram className="text-black m-1" />
              </Link>
              <Link
                to="https://www.tiktok.com/@hypestreetgt"
                className="m-2 bg-white rounded-circle"
              >
                <FaTiktok className="text-black m-1" />
              </Link>
            </div>
            <p className="mt-3 text-white">
              <Link to="/about-us" className="text-xs font-semibold text-white">
                {t("about_us")}
              </Link>
            </p>
            <p className="text-white text-xs font-semibold capitalize">
              <small>&copy; 2025 Hype Street Guatemala</small>
            </p>
          </div>

          {/* Columna de contacto */}
          <div className="col-md-4 col-sm-8 mx-auto my-5 text-md-end text-sm-center">
            <h5 className="font-bold text-lg mt-0 text-white">
              {t("footer.contact_us")}
            </h5>
            <ul className="list-unstyled mt-4">
              <li>
                <Link className="text-white" to="/store-locations">
                  {t("footer.store_locations")}
                </Link>
              </li>
              <li>
                <Link className="text-white" to="/contact">
                  {t("footer.contact_here")}
                </Link>
              </li>
              <li>
                <Link className="text-white" to="/whatsapp">
                  {t("whatsapp")}
                </Link>
              </li>
            </ul>
            <div className="d-flex justify-content-end mt-5">
              <img
                src={"/logo-visa.png"}
                alt="logo-visa"
                width={80}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <span className="text-black">
          ©{new Date().getFullYear()}{" "}
          <Link to="/" className="text-black">
            {t("footer.company_name")}
          </Link>
        </span>
      </div>

      <div className="container mt-4">
        <div className="row mt-4">
          <div className="col-12 d-flex justify-content-center align-item-center mt-4">
            <span className="text-black text-xs">Creador por: </span>
            <a
              href="//dssolutionsgt.com"
              target="_blank"
              rel="noreferrer"
              className="mx-2 text-xs"
            >
              DS Solutions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

FooterHypestreet.propTypes = {
  backgroundColorClass: PropTypes.string,
  containerClass: PropTypes.string,
  extraFooterClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default FooterHypestreet;
