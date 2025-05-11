import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from "swiper";

import dataBannerMultiColumn from "../../data/BannerMultiColumnImage.json"

import BannerMultiColumn from "./BannerMultiColumn";
 


const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true,
  },
  modules: [EffectFade],
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },

  speed: 1500,
  navigation: true,
  autoHeight: false,
};


const BannerMultiColumnImage = ({ spaceLeftClass, spaceRightClass }) => {
  return (
    <div className="" style={{ width: "100dvw", height: "96dvh" }}>
      <BannerMultiColumn data={dataBannerMultiColumn} sliderClass={""} />;
    </div>
  );
};

BannerMultiColumnImage.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default BannerMultiColumnImage;
