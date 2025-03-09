import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from "swiper";
import sliderData from "../../data/hero-sliders/banner-single-image.json";

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
// ejemplo
const bannerData = {
  id: 1,
  title: "",
  subtitle: "",
  desktop: "/assets/img/banner/banner2.png",
  mobileImages: [
    "/assets/img/banner/banner2.1.png",
    "/assets/img/banner/banner2.2.png",
  ],
  buttons: [
    {
      label: "LOOK BOOK",
      url: "/productos",
      text: "ver colección",
      color: "primary",
    },
    {
      label: "SNEA KERS",
      url: "/productos",
      text: "ver colección",
      color: "primary",
    },
  ],
  image: "/assets/img/banner/banner2.png",
  url: "/productos",
};

const BannerMultiColumnImage = ({ spaceLeftClass, spaceRightClass }) => {
  return (
    <div
      className={clsx("slider-area bg-black", spaceLeftClass, spaceRightClass)}
    >
      <div className="slider-active nav-style-1 container-fluid">
        <BannerMultiColumn data={bannerData} sliderClass={""} />
      </div>
    </div>
  );
};

BannerMultiColumnImage.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default BannerMultiColumnImage;
