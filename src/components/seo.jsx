import PropTypes from "prop-types";
import { Helmet, HelmetProvider } from "react-helmet-async";

const SEO = ({
  title = "Hype Street",
  titleTemplate = "Las mejores Marcas",
  description = "Tiendas, y kioscos con ropa, sneakers y accesorios de las mejores marcas.",
}) => {
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

export default SEO;
