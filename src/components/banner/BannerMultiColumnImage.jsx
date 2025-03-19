import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from "swiper";
import sliderData from "../../data/hero-sliders/banner-single-image.json";
import {ROOT_IMAGE}  from "../../config"

import BannerMultiColumn from "./BannerMultiColumn";
 
const BANNER_IMAGE = ROOT_IMAGE.replace("articulos", '');

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
  desktop: BANNER_IMAGE+"banners/banner2.png",
  mobileImages: [
    BANNER_IMAGE+"banners/banner2.1.png",
    BANNER_IMAGE+"banners/banner2.2.png",
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
  image:BANNER_IMAGE+"banner/banner2.png",
  url: "/productos",
};

const BannerMultiColumnImage = ({ spaceLeftClass, spaceRightClass }) => {
  return (
    <div className="" style={{ width: "100dvw", height: "96dvh" }}>
      <BannerMultiColumn data={bannerData} sliderClass={""} />;
    </div>
  );
};

BannerMultiColumnImage.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default BannerMultiColumnImage;
