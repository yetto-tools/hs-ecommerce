import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";



const ProductImageGallery = ({ images = [], productName = "" }) => {

  const { configParams } = useSelector((state) => state.paramsWeb);

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
    ;

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
    slidesToShow: sortedImages.length >= 4 ? 4 : sortedImages.length,
    swipeToSlide: true,
    focusOnSelect: true,
    arrows: true,
    dots: false,
    centerMode: false,
    initialSlide: 0,
    prevArrow: <button className="custom-prev"><ChevronLeft size={32} color="#000" /></button>,
    nextArrow: <button className="custom-next"><ChevronRight size={32} color="#000"/></button>,
  };

  return (
    <div>
      <Slider {...mainSettings}>
        {sortedImages.map((image, i) => (
          <div key={i} className="single-image">
            <img
              
              src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
              className="img-fluid object-fit-cover"
              alt={productName}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "/default/no-image.jpg";
              }}
              width={480}
              height={480}
              dataset-src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
            />
          </div>
        ))}
      </Slider>

      <div className="product-small-image-wrapper mt-15">
        <Slider {...thumbSettings}>
          {sortedImages.map((image, i) => (
            <div key={i} className="single-image">
              <LazyLoadImage
                src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
                className="img-fluid"
                alt={productName}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/default/no-image.jpg";
                }}
                width={120}
                height={120}
                dataset-src={`${configParams.RUTAIMAGENESARTICULOS}${image}`}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ProductImageGallery
