import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";

const BannerThirtySeven = ({ spaceBottomClass }) => {
  return (
    <div className={clsx("banner-area", spaceBottomClass)}>
      <div className="container-fluid p-0">
        <div className="row no-gutters">
          <div className="col-lg-6 col-md-6">
            <div className="single-banner mr-15 mb-15">
              <Link to={process.env.PUBLIC_URL + "/productos"}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/banner/banner-64.png"
                  }
                  alt=""
                />
              </Link>
            </div>
          </div>
          <div className="col-lg-6 col-md-6">
            <div className="single-banner ml-15 mb-15">
              <Link to={process.env.PUBLIC_URL + "/productos"}>
                <img
                  src={
                    process.env.PUBLIC_URL + "/assets/img/banner/banner-65.png"
                  }
                  alt=""
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

BannerThirtySeven.propTypes = {
  spaceBottomClass: PropTypes.string,
};

export default BannerThirtySeven;
