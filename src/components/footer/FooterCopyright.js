import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram } from "react-icons/fa";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <div className={clsx("copyright", spaceBottomClass, colorClass)}>
      <div className="footer-logo px-2">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <img alt="" src={process.env.PUBLIC_URL + footerLogo} width={128} />
        </Link>
      </div>

      <div className="d-flex justify-content-center gap-3  p-2">
        <div>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <span className="text-theme-color-dark">
              <FaFacebook size={24} />
            </span>
          </a>
        </div>
        <div>
          <a href="/" target="_blank" rel="noopener noreferrer">
            <span className="text-theme-color-dark">
              <FaInstagram size={24} />
            </span>
          </a>
        </div>
      </div>
      <br />
      <p className="text-dark">
        &copy; {new Date().getFullYear()}{" "}
        <a
          className="text-dark"
          href="/"
          rel="noopener noreferrer"
          target="_blank"
        >
          DS eCommerce
        </a>
      </p>
    </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
