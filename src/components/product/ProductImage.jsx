import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import clsx from "clsx";

const ProductImageGallery = ({ images = [], productName = "" }) => {
  const [loadedImages, setLoadedImages] = useState({});
  const { configParams } = useSelector((state) => state.paramsWeb);

  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);
  const version = Date.now();
  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  const mainSettings = {
    asNavFor: nav2,
    ref: slider1,
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: true,
    fade: true,
    initialSlide: 0,
    infinite: images.length >= 2 ? true : false,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: slider2,
    slidesToShow: images.length >= 2 ? images.length : 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "4px",
    arrows: true,
    dots: false,
    centerMode: false,
    initialSlide: 0,
    infinite: images.length >= 2 ? true : false,
    prevArrow: (
      <button className="custom-prev">
        <ChevronLeft size={32} color="#000" />
      </button>
    ),
    nextArrow: (
      <button className="custom-next">
        <ChevronRight size={32} color="#000" />
      </button>
    ),
  };

  const RenderImagesThumbnail = () => {};

  return (
    <div>
      <Slider {...mainSettings}>
        {images.map((image, i) => (
          <div key={i + image} className="single-image">
            {!loadedImages[i] && (
              <div className="img-placeholder">
                <Loader2 className="animate-spin" />
              </div>
            )}
            <img
              src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
              className="img-fluid object-fit-cover"
              alt={image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default/no-image.jpg";
              }}
              dataset-index={`${i}`}
              onLoad={() => setLoadedImages((prev) => ({ ...prev, [i]: true }))}
              width={"480px"}
              height={"480px"}
              dataset-src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
            />
          </div>
        ))}
      </Slider>

      <div className="product-small-image-wrapper mt-15">
        <Slider {...thumbSettings}>
          {images.map((image, i) => (
            <div
              key={i + image}
              className={clsx("flex flex-row justify-center items-center", "")}
            >
              {!loadedImages[i] && (
                <div className="img-placeholder-loading-thumbnail">
                  <Loader2 className="animate-spin" />
                </div>
              )}

              <LazyLoadImage
                src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
                className="aspect-square object-contain"
                alt={image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default/no-image.jpg";
                }}
                dataset-index={`${i}`}
                width={"120px"}
                height={"120px"}
                dataset-src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageGallery;
