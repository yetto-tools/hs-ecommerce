import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const BannerSingle = ({ data, sliderClass }) => {
  return (
    <div
      className={`single-slider-2 slider-height-1 d-flex align-items-center slider-height-res bg-img ${sliderClass}`}
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + data.image})`,
        backgroundSize: "cover", // Escala la imagen para que cubra todo el contenedor
        backgroundPosition: "center", // Centra la imagen
        backgroundRepeat: "no-repeat", // Evita que la imagen se repita
      }}
    >
      <div className="container-fluid mx-5">
        {data && data?.buttons && (
          <div className="row">
            <div className="w-100 d-flex justify-content-between mx-auto">
              {data.buttons.map((button, index) => (
                <div
                  key={index}
                  className="slider-content-2 slider-animated-1 text-center"
                >
                  <h2
                    className={`text-white uppercase pre-line ${
                      index === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {button.label.split(" ").join("\n")}
                  </h2>
                  <h3
                    className="animated text-white uppercase"
                    dangerouslySetInnerHTML={{ __html: data.subtitle }}
                  ></h3>
                  <div className="slider-btn btn-hover rounded">
                    <Link
                      className="animated rounded py-2 px-3"
                      to={process.env.PUBLIC_URL + button.url}
                    >
                      {button.text}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

BannerSingle.propTypes = {
  data: PropTypes.shape({
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string,
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  sliderClass: PropTypes.string,
};

export default BannerSingle;
