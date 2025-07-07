import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
    <Link to={process.env.PUBLIC_URL + "/"} className="w-100">
      <div className={clsx(logoClass)}>
        <img
          className="logo-responsive"
          alt="logo"
          src={process.env.PUBLIC_URL + imageUrl}
          width={128}
          height={80}
        />
      </div>
    </Link>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default Logo;
