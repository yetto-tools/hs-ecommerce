import BannerEight from "../banner/BannerEight";
import HeroSliderSeven from "../hero-slider/HeroSliderSeven";

const SliderBanner = () => {
  return (
    <div className="slider-banner-area">
      <div className="container-fluid col-xxl-11 col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11 col-11 mx-auto my-5">
        <div className="row flex-row-reverse">
          <div className="col-xxl-8 col-xl-12 col-lg-12 col-md-12 mb-4">
            {/* hero slider */}
            <HeroSliderSeven />
          </div>
          {/* banner */}
          <BannerEight />
        </div>
      </div>
    </div>
  );
};

export default SliderBanner;
