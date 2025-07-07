import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import FooterCopyright from "../../components/footer/FooterCopyright";
import FooterNewsletter from "../../components/footer/FooterNewsletter";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

const FooterThree = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
}) => {
  return (
    <footer
      className={clsx(
        "footer-area bg-footer",
        backgroundColorClass,
        spaceTopClass,
        spaceBottomClass
      )}
    >
      <div className="container">
        <div className="footer-border pt-50 text-theme-color">
          <div className="row md:flex-reverse justify-content-center text-center">
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <FooterCopyright
                footerLogo="/logo-dark.png"
                spaceBottomClass="mb-30"
                colorClass="text-theme-color-dark"
              />
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="footer-widget ml-md-30">
                <div className="footer-title">
                  <h3>Nosotros</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <Link to="/nosotros">Acerca de Nosotros</Link>
                    </li>
                    <li>
                      <Link to="/#">Tiendas</Link>
                    </li>
                    <li>
                      <Link to="/contacto">Contacto</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="footer-widget ml-md-50">
                <div className="footer-title">
                  <h3>Políticas</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <Link to="/#">Devoluciones</Link>
                    </li>
                    <li>
                      <Link to="/#">Términos y Condiciones</Link>
                    </li>
                    <li>
                      <Link to="/#">Política de Privacidad</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="footer-widget ml-md-75">
                <div className="footer-title">
                  <h3>Síguenos en</h3>
                </div>
                <div className="footer-list">
                  <ul>
                    <li>
                      <a href="//facebook.com" target="_blank" rel="noreferrer">
                        <FaFacebook size={20} /> Facebook
                      </a>
                    </li>
                    <li>
                      <a
                        href="//instagram.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        <FaInstagram size={20} /> Instagram
                      </a>
                    </li>
                    <li>
                      <a href="//youtube.com" target="_blank" rel="noreferrer">
                        <FaYoutube size={20} /> YouTube
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

FooterThree.propTypes = {
  backgroundColorClass: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default FooterThree;
