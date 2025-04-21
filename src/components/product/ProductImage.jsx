import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useSelector } from "react-redux";

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

  // Ordena las imágenes numéricamente
  const cleanedImages = images.filter(Boolean);

  let sortedImages = [];

  if (cleanedImages.length === 0) {
    sortedImages = [];
  } else if (cleanedImages.length === 1) {
    sortedImages = [cleanedImages[0], cleanedImages[0], cleanedImages[0]];
  } else {
    sortedImages = cleanedImages;
  }

  const mainSettings = {
    asNavFor: nav2,
    ref: slider1,
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: true,
    fade: true,
    initialSlide: 0,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: slider2,
    slidesToShow: Math.max(1, Math.min(sortedImages.length, 4)), //sortedImages.length >= 4 ? 4 : sortedImages.length > 0 ? sortedImages.length : 1,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    dots: false,
    centerMode: false,
    initialSlide: 0,
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

  return (
    <div>
      <Slider {...mainSettings}>
        {sortedImages.map((image, i) => (
          <div key={i + image} className="single-image">
            {!loadedImages[i] && (
              <div className="img-placeholder">
                <Loader2 className="animate-spin" />
              </div>
            )}
            <img
              src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
              className="img-fluid object-fit-cover"
              alt={productName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default/no-image.jpg";
              }}
              onLoad={() =>
                setLoadedImages((prev) => ({ ...prev, [i]: true }))
              }
              width={"480px"}
              height={"480px"}
              dataset-src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
            />
          </div>
        ))}
      </Slider>

      <div className="product-small-image-wrapper mt-15">
        <Slider {...thumbSettings}>
          {sortedImages.map((image, i) => (
            <div key={i + image} className="single-image">

            {!loadedImages[i] && (
              <div className="img-placeholder-loading-thumbnail">
                <Loader2 className="animate-spin" />
              </div>
            )}

              <LazyLoadImage
                src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
                className="img-fluid"
                alt={productName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default/no-image.jpg";
                }}
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
