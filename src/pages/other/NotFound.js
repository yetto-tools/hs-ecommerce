import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  let { pathname } = useLocation();
  const {t} = useTranslation();
  return (
    <Fragment>
      <SEO
        titleTemplate={ t("page_not_found.seo_title") ? t("page_not_found.title") :"Not Found"}
        description={t("page_not_found.seo_description")}
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: t("page_not_found.label_home") ? t("page_not_found.label_home"): "Home", path: process.env.PUBLIC_URL + "/" },
            {label: t("page_not_found.label_404_page") ? t("page_not_found.label_404_page"): "404 page", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                  <Link to={process.env.PUBLIC_URL + "/"}>
                    
                  <h1>404</h1>
                  <h2>{
                    t("page_not_found.title_message") 
                    ? t("page_not_found.title_message")
                    : "404 page"}
                  </h2>
                  </Link>
                  <p>
                    {
                      t("page_not_found.description_message") 
                      ? t("page_not_found.description_message")
                      : "OOPS! PAGE NOT FOUND"
                    }
                  </p>
                  
                  <form className="searchform mb-50" action={process.env.PUBLIC_URL + "/productos"}>
                    <input
                      type="search"
                      name="busqueda"
                      id="error_search"
                      placeholder={
                        t("page_not_found.placeholder_search") 
                        ? t("page_not_found.placeholder_search") 
                        : "Search..."
                      }
                      className="searchform__input"
                    />
                    <button type="submit" className="searchform__submit text-black fw-bold">
                      <i className="fa fa-search" />
                    </button>
                  </form>
                  <Link to={process.env.PUBLIC_URL + "/"} className="btn-hover text-black fw-bold fs-1 my-5">
                    {
                      t("page_not_found.placeholder_search") 
                      ? t("page_not_found.back_to_home") 
                      :  "Volver a la página principal"}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default NotFound;
