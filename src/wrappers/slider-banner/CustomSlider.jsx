import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

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

// CSS con soporte para 5, 4, 3 o 2 imágenes visibles
const styles = `
.slider-container {
  position: relative;
  width: 96%;
  margin: auto;
  overflow: hidden;
  background: black;
  display: flex;
  align-items: center;
}

.slider-wrapper {
  overflow: hidden;
  width: 100%;
  margin-inline: 3.5rem;
  cursor: grab;
}

.slider {
  display: flex;
  transition: transform 0.6s ease-in-out;
  width: fit-content;
}

.slide {
  position: relative;
  padding: 0px;
  box-sizing: border-box;
}

.slide img {
  width: 100%;
  display: block;
}

.slide:hover {
  cursor: pointer;
  opacity: 0.3;
  transition: transform 0.6s ease-in-out;
}

.slide:hover img {
  transform: scale(1.01);
}

.logo-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80px;
  height: auto;
}

/* Responsive para cantidad de imágenes */
@media (min-width: 1200px) {
  .slide { min-width: 20%; } /* 5 imágenes */
}

@media (max-width: 1200px) {
  .slide { min-width: 25%; } /* 4 imágenes */
}

@media (max-width: 992px) {
  .slide { min-width: 33.33%; } /* 3 imágenes */
}

@media (max-width: 768px) {
  .slide { min-width: 50%; } /* 2 imágenes */
}


@media (max-width: 575px) {
  .slide { min-width: 100%; } /* 1 imágenes */
 
}
.prev, .next {
  position: absolute;
  transform: translateY(-50%);
  top: 50%;
  background: rgba(255, 255, 255, 0);
  border: none;
  cursor: pointer;
  z-index: 10;
}

.prev { left: 1px; }
.next { right: 1px; }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);
