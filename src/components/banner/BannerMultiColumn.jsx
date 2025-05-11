import clsx from "clsx";
import PropTypes from "prop-types";
import { Fragment, useEffect, useState, useRef, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const BannerMultiColumn = ({ data, sliderClass }) => {
  const version = useMemo(() => Date.now(), []);
  const { configParams } = useSelector((state) => state.paramsWeb);
  const [visibleIndexes, setVisibleIndexes] = useState([]);
  const [loadedIndexes, setLoadedIndexes] = useState([]);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.dataset.index);
          if (entry.isIntersecting) {
            setVisibleIndexes((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.2,
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  const handleImageLoad = (index) => {
    setLoadedIndexes((prev) => [...new Set([...prev, index])]);
  };

  return (
    <div className={clsx("banner-multi-column", sliderClass)}>
      <div className="banner-wrapper">
        {data.mobileImages.map((image, index) => {
          const isVisible = visibleIndexes.includes(index);
          const isLoaded = loadedIndexes.includes(index);
          const fullImageUrl = `${configParams.RUTAIMAGENESBANNERS}${image}?v=${version}`;

          return (
            <div
              key={index}
              ref={(el) => (itemRefs.current[index] = el)}
              data-index={index}
              className="banner-item"
              style={{
                flex: 1,
                minHeight: "96dvh",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Fondo Blur Fijo */}
              {isVisible && (
                <div
                  className="banner-blur-background"
                  style={{
                    backgroundColor: "#f5f5f5",
                    backgroundImage: `url(${fullImageUrl})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: index === 0 ? "right" : "left",
                    filter: isLoaded ? "none" : "blur(20px)",
                    transition: "filter 0.8s ease",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 1,
                  }}
                ></div>
              )}

              {/* Imagen Real con FadeIn */}
              {isVisible && (
                <img
                  src={fullImageUrl}
                  onLoad={() => handleImageLoad(index)}
                  alt=""
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover", // 🔥 Mejor usar "cover" para banners, no "scale-down"
                    objectPosition: index === 0 ? "right" : "left",
                    opacity: isLoaded ? 1 : 0,
                    transition: "opacity 0.8s ease",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    zIndex: 2,
                  }}
                />
              )}

              {/* Contenido (h2, botones) */}
              <div
                className={clsx(
                  "content",
                  index === 0 ? "justify-content-start" : "justify-content-end"
                )}
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  zIndex: 3,
                }}
              >
                <article
                  className={clsx(
                    "container-fluid d-flex align-items-center mx-5",
                    index === 0
                      ? "justify-content-start"
                      : "justify-content-end"
                  )}
                >
                  <div
                    className={clsx(
                      "d-flex flex-column align-items-center",
                      index === 0 ? "text-left" : "text-right"
                    )}
                  >
                    <div className="col-12 col-md-12">
                      <h2
                        className={clsx(
                          index === 0 ? "text-left" : "text-right",
                          "title text-white"
                        )}
                      >
                        {data?.buttons[index]?.label &&
                          data?.buttons[index]?.label
                            .split(" ")
                            .map((word, idx) => (
                              <Fragment key={idx}>
                                <span style={{ fontSize: "2.8rem" }}>
                                  {`${word} `}
                                </span>
                                <br />
                              </Fragment>
                            ))}
                      </h2>
                    </div>
                    <div className="col-12 col-md-12 my-2">
                      <div className="slider-btn btn-hover rounded">
                        <Link
                          className="banner-button animated text-black"
                          style={{ borderRadius: "0.5rem" }}
                          to={data?.buttons[index]?.url}
                        >
                          {data?.buttons[index]?.text}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BannerMultiColumn.propTypes = {
  data: PropTypes.shape({
    mobileImages: PropTypes.arrayOf(PropTypes.string),
    buttons: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        label: PropTypes.string.isRequired,
      })
    ).isRequired,
  }),
  sliderClass: PropTypes.string,
};

export default BannerMultiColumn;

const styleCustom = `

.banner-button {
  padding: 10px 20px;
  background-color: white;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-align: center;
  display: block;
  margin: 0 auto;
  width: 100%;
}

.banner-multi-column {
  width: 100%;
  height: 96dvh;
}

.banner-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 96dvh;
}

.banner-item {
  flex: 1;
  position: relative;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.banner-item .content {
  text-align: center;
  color: white;
  height: 48dvh;
  width: 100%;
  display: flex;
}

.banner-item .title {
  font-size: 2rem;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.banner-item .button {
  padding: 10px 20px;
  background-color: white;
  color: black;
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  border: none;
}

/* ✅ Versión móvil */
@media (max-width: 1023px) {
  .banner-wrapper {
    flex-direction: column;
    height: auto;
  }

  .banner-item {
    height: 50dvh;
  }
}
/* Para tabletas en modo retrato y panta_llas más pequeñas */
@media (max-width: 768px) {
  .banner-wrapper {
    height: 28rem; /* Menor altura para pantallas más pequeñas */
  }
}

/* Para teléfonos móviles en modo paisaje */
@media (max-width: 576px) {
  .banner-wrapper {
    height: 24rem; /* Ajusta aún más la altura para pantallas aún más pequeñas */
  }
}

/* Para teléfonos móviles en modo retrato */
@media (max-width: 480px) {
  .banner-wrapper {
    height: 18rem; /* Altura más pequeña para móviles en modo retrato */
  }

`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styleCustom;
document.head.appendChild(styleSheet);
