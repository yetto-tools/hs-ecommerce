import PropTypes from "prop-types";
import clsx from "clsx";
import { EffectFade } from "swiper";
import Swiper, { SwiperSlide } from "../../components/swiper";
import sliderData from "../../data/hero-sliders/hero-slider-nine.json";
import HeroSliderNineSingle from "../../components/hero-slider/HeroSliderNineSingle.js";

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

const HeroSliderNine = ({ spaceLeftClass, spaceRightClass }) => {
  return (
    <div
      className={clsx("slider-area bg-black", spaceLeftClass, spaceRightClass)}
    >
      <div className="slider-active nav-style-1">
        {sliderData && (
          <Swiper options={params}>
            {sliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderNineSingle data={single} sliderClass={""} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

HeroSliderNine.propTypes = {
  spaceLeftClass: PropTypes.string,
  spaceRightClass: PropTypes.string,
};

export default HeroSliderNine;
