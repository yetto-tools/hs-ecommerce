import clsx from "clsx";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const BannerMultiColumn = ({ data, sliderClass }) => {
  return (
    <div className={`banner-multi-column ${sliderClass}`}>
      <div className="banner-wrapper">
        {data.mobileImages.map((image, index) => (
          <div
            key={index}
            className="banner-item"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
              objectFit: "cover",
              scale: "scaleX(-1)",
              backgroundRepeat: "no-repeat",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              className={clsx(
                "content",
                index === 0 ? "justify-content-start" : "justify-content-end"
              )}
            >
              <article
                className={clsx(
                  "container-fluid d-flex align-items-center mx-5 ",
                  index === 0 ? "justify-content-start" : "justify-content-end"
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
                          .map((word, index) => (
                            <Fragment key={index}>
                              <span
                                key={index}
                                style={{ fontSize: "2.8rem" }}
                              >{`${word} `}</span>
                              <br />
                            </Fragment>
                          ))}
                    </h2>
                  </div>
                  <div className="col-12 col-md-12 my-2">
                    <Link
                      className="button uppercase"
                      to={process.env.PUBLIC_URL + data.buttons[index].url}
                    >
                      {data.buttons[index].text}
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        ))}
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

.banner-multi-column {
  width: 100%;
}

.banner-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 36rem;
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
  height: 28rem;
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
@media (max-width: 991px) {
  .banner-wrapper {
    flex-direction: column;
    height: auto;
  }

  .banner-item {
    height: 50vh;
  }
}
`;
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styleCustom;
document.head.appendChild(styleSheet);
