import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SEO = ({ title, titleTemplate, description }) => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, []);
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>
          {title} | {titleTemplate}
        </title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  titleTemplate: PropTypes.string,
  description: PropTypes.string,
};

SEO.defaultProps = {
  title: "Hype Street",
  titleTemplate: "Las mejores Marcas",
  description:
    "Tiendas, y kioscos con ropa, sneakers y accesorios de las mejores marcas.",
};

export default SEO;
