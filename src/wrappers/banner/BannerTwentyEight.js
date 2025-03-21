import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import clsx from "clsx";

const BannerTwentyEight = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="single-banner mb-30">
              <Link to={process.env.PUBLIC_URL + "/productos"}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/banner/banner-37.jpg"
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

BannerTwentyEight.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BannerTwentyEight;
