import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const FooterCopyright = ({ footerLogo, spaceBottomClass, colorClass }) => {
  return (
    <></>
    // <div className={clsx("copyright", spaceBottomClass, colorClass)}>
    //   <div className="footer-logo">
    //     <Link to={process.env.PUBLIC_URL + "/"}>
    //       <img alt="" src={process.env.PUBLIC_URL + footerLogo} width={128} />
    //     </Link>
    //   </div>
    //   <p>
    //     &copy; {new Date().getFullYear()}{" "}
    //     <a
    //       href="https://hasthemes.com"
    //       rel="noopener noreferrer"
    //       target="_blank"
    //     >
    //       Hype Street
    //     </a>
    //   </p>
    //   <div className="d-flex p-2">
    //     <div>
    //       <a
    //         href="https://www.facebook.com/Hypestreetstoree/?locale=es_LA"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <span className="pe-2 ">
    //           <i className="fa fa-facebook text-white"></i>
    //         </span>
    //       </a>
    //     </div>
    //     <div>
    //       <a
    //         href="https://www.instagram.com/hypestreetstore/?hl=es"
    //         target="_blank"
    //         rel="noopener noreferrer"
    //       >
    //         <span className="pe-2 ">
    //           <i className="fa fa-instagram text-white"></i>
    //         </span>
    //       </a>
    //     </div>
    //   </div>
    //   <br />
    // </div>
  );
};

FooterCopyright.propTypes = {
  footerLogo: PropTypes.string,
  spaceBottomClass: PropTypes.string,
  colorClass: PropTypes.string,
};

export default FooterCopyright;
