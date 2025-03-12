import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const HeroSliderNineSingle = ({ data, sliderClass }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageLoaded(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 } // Se activa cuando el 30% del slider es visible
    );

    if (sliderRef.current) {
      observer.observe(sliderRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={sliderRef}
      className="single-slider-2 slider-height-1 d-flex align-items-center slider-height-res mx-auto bg-img"
      style={{
        backgroundImage: imageLoaded
          ? `url(${process.env.PUBLIC_URL + data.image})`
          : "none", // No carga la imagen hasta que sea visible
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        transition: "opacity 0.5s ease-in-out",
        opacity: imageLoaded ? 1 : 0, // Suaviza la aparición de la imagen
      }}
    >
      <div className="container">
        {typeof data === "object" && data.title.length > 0 && (
          <div className="row justify-content-start">
            <div
              className={`col-xl-12 col-lg-12 col-md-12 col-12 ms-auto ${
                sliderClass === "swiper-slide-active" ? "" : ""
              }`}
            >
              <div className="slider-content-2 slider-animated-1">
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
                <div className="slider-btn btn-hover rounded mt-4">
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
  data: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    subtitle: PropTypes.string,
    button: PropTypes.string,
    url: PropTypes.string,
  }),
};

export default HeroSliderNineSingle;

// import PropTypes from "prop-types";

// import { Link } from "react-router-dom";

// const HeroSliderNineSingle = ({ data, sliderClass }) => {
//   return (
//     <div
//       className="single-slider-2 slider-height-1 d-flex align-items-center slider-height-res mx-auto bg-img"
//       style={{
//         backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`,
//         backgroundSize: "cover", // Escala la imagen para que cubra todo el contenedor
//         backgroundPosition: "center", // Centra la imagen
//         backgroundRepeat: "no-repeat", // Evita que la imagen se repita
//         overflow: "hidden",
//       }}
//     >
//       <div className="container">
//         {typeof data === "object" && data.title.length > 0 && (
//           <div className="row justify-content-start">
//             <div
//               className={`col-xl-12 col-lg-12 col-md-12 col-12 ms-auto   ${
//                 sliderClass === "swiper-slide-active" ? "" : ""
//               }`}
//             >
//               <div className={`slider-content-2 slider-animated-1`}>
//                 <h3 className="animated text-white">{data.subtitle}</h3>
//                 <h2
//                   className="animated text-white text-5xl"
//                   dangerouslySetInnerHTML={{
//                     __html: data.title.replace(
//                       " ",
//                       "<br/> <p style='margin:10px'> </p>"
//                     ),
//                   }}
//                 ></h2>
//                 <div className="slider-btn btn-hover rounded mt-4">
//                   <Link
//                     className="animated text-black"
//                     style={{ borderRadius: "0.5rem" }}
//                     to={process.env.PUBLIC_URL + data.url}
//                   >
//                     {data.button}
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// HeroSliderNineSingle.propTypes = {
//   data: PropTypes.shape({}),
// };

// export default HeroSliderNineSingle;
