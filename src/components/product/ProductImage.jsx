import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ROOT_IMAGE } from "../../config";

const ProductImageGallery = ({ images = [], productName = "" }) => {
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  useEffect(() => {
    setNav1(slider1.current);
    setNav2(slider2.current);
  }, []);

  // Ordena las imágenes numéricamente
  const sortedImages = images
    .filter(Boolean)
    .sort((a, b) => {
      const numA = parseInt(a.match(/\d+/)?.[0] || 0);
      const numB = parseInt(b.match(/\d+/)?.[0] || 0);
      return numA - numB;
    });

  const mainSettings = {
    asNavFor: nav2,
    ref: slider1,
    slidesToShow: 1,
    swipeToSlide: true,
    arrows: false,
    fade: true,
    initialSlide: 0,
  };

  const thumbSettings = {
    asNavFor: nav1,
    ref: slider2,
    slidesToShow: sortedImages.length >= 4 ? 4 : sortedImages.length,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    dots: false,
    centerMode: false,
    initialSlide: 0,
  };

  return (
    <div>
      <Slider {...mainSettings}>
        {sortedImages.map((image, i) => (
          <div key={i} className="single-image">
            <LazyLoadImage
              src={`${ROOT_IMAGE}${image}`}
              className="img-fluid object-fit-cover"
              alt={productName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default/no-image.jpg";
              }}
              width={500}
              height={500}
            />
          </div>
        ))}
      </Slider>

      <div className="product-small-image-wrapper mt-15">
        <Slider {...thumbSettings}>
          {sortedImages.map((image, i) => (
            <div key={i} className="single-image">
              <LazyLoadImage
                src={`${ROOT_IMAGE}${image}`}
                className="img-fluid"
                alt={productName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default/no-image.jpg";
                }}
                width={120}
                height={120}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageGallery
