import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import "./fix-slick-buttons.css";


const ProductImageGallery = ({
  images = [],
  aspectRate = "16:9",
  productName = "",
}) => {
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
    slidesToShow: images.length >= 3 ? 3 : images.length === 2 ? 2 : 1,
    swipeToSlide: true,
    focusOnSelect: true,
    centerPadding: "10px",
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
            <img
              src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
              className={clsx(
                "img-fluid object-fit-cover",
                !aspectRate === "16:9" && "w-100"
                  ? "aspect-ratio-16/9"
                  : "aspect-ratio-4/3"
              )}
              alt={image}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default/no-image.avif";
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
              <LazyLoadImage
                src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
                className="aspect-square object-contain"
                alt={image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default/no-image.avif";
                }}
                dataset-index={`${i}`}
                width={"118px"}
                height={"118px"}
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
