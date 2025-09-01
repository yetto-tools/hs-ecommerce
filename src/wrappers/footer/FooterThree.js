import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import FooterCopyright from "../../components/footer/FooterCopyright";

const FooterThree = ({
  backgroundColorClass,
  spaceTopClass,
  spaceBottomClass,
}) => {
  // Recupera redes sociales desde Redux
  const { items: socialMedia, loading, error } = useSelector((state) => state.socialMedia);

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
            {/* Logo */}
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <FooterCopyright
                footerLogo="/logo-dark.png"
                spaceBottomClass="mb-30"
                colorClass="text-theme-color-dark"
              />
            </div>

            {/* Nosotros */}
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

            {/* Políticas */}
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

            {/* Redes sociales dinámicas */}
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
              <div className="footer-widget ml-md-75">
                <div className="footer-title">
                  <h3>Síguenos en</h3>
                </div>
                <div className="footer-list d-flex justify-content-center">
                    <ul className="list-unstyled p-0 m-0">
                      {(Array.isArray(socialMedia) ? socialMedia : []).map((item) => (
                        <li key={item.Id} className="mb-1">
                          <a
                            href={item.Enlace}
                            target="_blank"
                            rel="noreferrer"
                            className="d-inline-flex align-items-center gap-2 lh-1
                                      justify-content-start justify-content-md-start text-reset text-decoration-none
                            w-100"
                          >
                            {/* caja fija para alinear el icono */}
                            <span className="social-icon-box d-inline-flex align-items-center justify-content-center me-2">
                              <img src={item.Icono} alt={item.Nombre} className="social-icon-img" width={20} height={20}/>
                            </span>

                            <span className="fw-medium">{item.Etiqueta}</span>
                          </a>
                        </li>
                      ))}
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
