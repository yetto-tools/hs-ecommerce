import { Fragment } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { t } from "i18next";

const PageContentBlank = ({ children }) => {
  const { pathname } = useLocation();
    


  
  // Normalizar el título para el breadcrumb
  const breadcrumbTitle = pathname
    ?.replace("/", "")
    ?.replaceAll("-", " ")
    ?.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalizar cada palabra

  return (
    <Fragment>
      <SEO titleTemplate="Contact" description="Página de contacto de Flone." />
      <LayoutOne headerTop="visible">
        {/* Breadcrumb */}
        <Breadcrumb
          pages={[
            { label: t("home"), path: process.env.PUBLIC_URL + "/" },
            { label: breadcrumbTitle, path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">{children}</div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default PageContentBlank;
