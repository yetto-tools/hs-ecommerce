import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";
import "./_CustomSlider.scss";
const CustomSlider = ({ slides }) => {
  const sliderRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(slides.length);
  const [visibleSlides, setVisibleSlides] = useState(5);
  const infiniteSlides = [...slides, ...slides, ...slides];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detecta el tamaño de la pantalla y ajusta las imágenes visibles
  useEffect(() => {
    const updateVisibleSlides = () => {
      const width = window.innerWidth;
      if (width > 1200) setVisibleSlides(4);
      else if (width > 992) setVisibleSlides(3);
      else if (width > 768) setVisibleSlides(3);
      else if (width > 575) setVisibleSlides(2);
      else setVisibleSlides(1);
    };

    updateVisibleSlides();
    window.addEventListener("resize", updateVisibleSlides);
    return () => window.removeEventListener("resize", updateVisibleSlides);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex + 1);
    if (currentIndex >= slides.length * 2) {
      setTimeout(() => {
        setCurrentIndex(slides.length);
        sliderRef.current.style.transition = "none";
      }, 500);
    } else {
      sliderRef.current.style.transition = "transform 0.6s ease-in-out";
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
    if (currentIndex <= 0) {
      setTimeout(() => {
        setCurrentIndex(slides.length);
        sliderRef.current.style.transition = "none";
      }, 500);
    } else {
      sliderRef.current.style.transition = "transform 0.6s ease-in-out";
    }
  };

  // Manejo de Swipe
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  // Manejo de Drag
  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (touchStartX.current - touchEndX.current > 50) nextSlide();
    if (touchStartX.current - touchEndX.current < -50) prevSlide();
  };

  return (
    <section
      className="container-fluid row mx-auto sm:px-6 lg:px-8"
      style={{ height: "96dvh" }}
    >
      <section
        className={clsx(
          "container-fluid align-self-center mx-auto  sm:px-6 lg:px-8 slider-area",
          "",
          ""
        )}
      >
        <h1 className="text-5xl font-medium text-left uppercase mx-4 pb-5 text-white">
          {"Marcas"}
        </h1>

        <div className="slider-active-black nav-style-1-black">
          <div className="slider-container ">
            <button className="prev" onClick={prevSlide}>
              <ChevronLeft size={48} color="#fff" />
            </button>
            <div
              className="slider-wrapper"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
            >
              <div
                className="slider"
                ref={sliderRef}
                style={{
                  transform: `translateX(-${
                    currentIndex * (100 / visibleSlides)
                  }%)`,
                }}
              >
                {infiniteSlides.map((slide, index) => (
                  <div key={index} className="slide">
                    <Link
                      to={process.env.PUBLIC_URL + `/busqueda=${slide.name}`}
                    >
                      <LazyLoadImage
                        src={slide.image}
                        alt={slide.name}
                        loading="lazy"
                      />
                      {slide.logo && (
                        <div className="logo-overlay">
                          <LazyLoadImage
                            src={slide.logo}
                            alt={slide.name}
                            loading="lazy"
                          />
                        </div>
                      )}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
            <button className="next" onClick={nextSlide}>
              <ChevronRight size={48} color="#fff" />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default CustomSlider;
