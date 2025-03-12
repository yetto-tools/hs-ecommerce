import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import cn from "clsx";
import { Navigation, Pagination, Autoplay, A11y } from "swiper";
// eslint-disable-next-line import/no-unresolved
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SwiperSlider = forwardRef(
  (
    { options, prevIcon, nextIcon, children, className = "", navClass },
    ref
  ) => {
    const modules = options?.modules !== undefined ? options.modules : [];
    const prevClass = `prev-${navClass || "swiper-nav"} ${className}`;
    const nextClass = `next-${navClass || "swiper-nav"} ${className}`;
    const sliderOptions = {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: false,
      autoplay: options?.autoplay
        ? {
            delay: 2500,
            disableOnInteraction: false,
          }
        : false,
      watchSlidesProgress: true,
      autoHeight: true,
      breakpoints: {},
      ...options,
      modules: [Navigation, Pagination, A11y, Autoplay, ...modules],
      navigation: options?.navigation
        ? {
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
          }
        : false,
      pagination: options?.pagination
        ? {
            clickable: true,
          }
        : false,
    };

    return (
      <div className={cn("swiper-wrap", "")} ref={ref}>
        {sliderOptions?.navigation && (
          <>
            <button
              type="button"
              className={`swiper-button-prev ${prevClass}`}
            ></button>
            <button
              type="button"
              className={`swiper-button-next ${nextClass}`}
            ></button>
          </>
        )}
        <Swiper {...sliderOptions}>{children}</Swiper>
      </div>
    );
  }
);

export { SwiperSlide };

SwiperSlider.propTypes = {
  options: PropTypes.shape({}),
  prevIcon: PropTypes.node,
  nextIcon: PropTypes.node,
  children: PropTypes.node,
  className: PropTypes.string,
  navClass: PropTypes.string,
};

SwiperSlider.defaultProps = {
  prevIcon: <ChevronLeft size={30} />,
  nextIcon: <ChevronRight size={30} />,
  navStyle: 1,
  dotStyle: 1,
};

export default SwiperSlider;
