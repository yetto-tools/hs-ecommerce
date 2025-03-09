import PropTypes from "prop-types";
import clsx from "clsx";
import sliderData from "../../data/hero-sliders/banner-single-image.json";
import BannerSingle from "./BannerSigle.js";

const BannerSingleImage = ({ spaceLeftClass, spaceRightClass }) => {
  return (
    <div
      className={clsx("slider-area bg-black", spaceLeftClass, spaceRightClass)}
    >
      <div className="slider-active nav-style-1">
        {typeof sliderData === "object" &&
          sliderData.map((single, index) => (
            <BannerSingle data={single} sliderClass={""} key={index} />
          ))}
      </div>
    </div>
  );
};

BannerSingleImage.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default BannerSingleImage;
