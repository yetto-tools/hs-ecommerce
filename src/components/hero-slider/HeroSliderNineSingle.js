import PropTypes from "prop-types";

import { Link } from "react-router-dom";

const HeroSliderNineSingle = ({ data, sliderClass }) => {
  return (
    <div
      className="single-slider-2 slider-height-1 d-flex align-items-center slider-height-res mx-auto bg-img"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`,
        backgroundSize: "cover", // Escala la imagen para que cubra todo el contenedor
        backgroundPosition: "center", // Centra la imagen
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
        overflow: "hidden",
      }}
    >
      <div className="container">
        {typeof data === "object" && data.title.length > 0 && (
          <div className="row justify-content-start">
            <div
              className={`col-xl-12 col-lg-12 col-md-12 col-12 ms-auto   ${
                sliderClass === "swiper-slide-active" ? "" : ""
              }`}
            >
              <div className={`slider-content-2 slider-animated-1`}>
                <h3 className="animated text-white">{data.subtitle}</h3>
                <h2
                  className="animated text-white text-5xl"
                  dangerouslySetInnerHTML={{
                    __html: data.title.replace(
                      " ",
                      "<br/> <p style='margin:10px'> </p>"
                    ),
                  }}
                ></h2>
                <div className="slider-btn btn-hover rounded">
                  <Link
                    className="animated text-black"
                    style={{ borderRadius: "0.5rem" }}
                    to={process.env.PUBLIC_URL + data.url}  
                  >
                    {data.button}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

HeroSliderNineSingle.propTypes = {
  data: PropTypes.shape({}),
};

export default HeroSliderNineSingle;
