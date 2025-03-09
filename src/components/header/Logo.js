import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const Logo = ({ imageUrl, logoClass }) => {
  return (
      <Link to={process.env.PUBLIC_URL + "/" } >
    <div className={clsx(logoClass)}>
        <img alt="" src={process.env.PUBLIC_URL + imageUrl} width={128} />
    </div>
      </Link>
  );
};

Logo.propTypes = {
  imageUrl: PropTypes.string,
  logoClass: PropTypes.string,
};

export default Logo;
