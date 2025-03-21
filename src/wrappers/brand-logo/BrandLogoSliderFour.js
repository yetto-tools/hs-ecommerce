import PropTypes from "prop-types";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../components/swiper";
import BrandLogoOneSingle from "../../components/brand-logo/BrandLogoOneSingle";
import brandLogoData from "../../data/brand-logos/brand-logo-one.json";

const settings = {
  loop: true,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
  grabCursor: true,
  breakpoints: {
    320: {
      slidesPerView: 3,
    },
    640: {
      slidesPerView: 4,
    },
    768: {
      slidesPerView: 5,
    },
    1024: {
      slidesPerView: 6,
    },
    1366: {
      slidesPerView: 7,
    },
  },
};

const BrandLogoSliderFour = ({ spaceBottomClass, spaceTopClass, noBorder }) => {
  return (
    <div
      className={clsx(
        "brand-logo-area",
        noBorder ? "" : "border-top border-bottom",
        spaceBottomClass,
        spaceTopClass
      )}
    >
      <div className="container-fluid">
        <div className="brand-logo-active px-4">
          {brandLogoData && (
            <Swiper options={settings}>
              {brandLogoData.map((single, key) => (
                <SwiperSlide key={key}>
                  <BrandLogoOneSingle data={single} />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </div>
  );
};

BrandLogoSliderFour.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default BrandLogoSliderFour;
