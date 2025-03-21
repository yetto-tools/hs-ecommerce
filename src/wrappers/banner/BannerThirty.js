import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const BannerThirty = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="single-banner mb-30">
              <Link to={process.env.PUBLIC_URL + "/productos"}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/banner/banner-42.jpg"
                  }
                  alt=""
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
          <div className="col-md-4">
            <div className="single-banner mb-30">
              <Link to={process.env.PUBLIC_URL + "/productos"}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/banner/banner-38.jpg"
                  }
                  alt=""
                  className="img-fluid"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerThirty.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerThirty;
