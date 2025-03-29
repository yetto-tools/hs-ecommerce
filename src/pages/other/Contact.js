import { Fragment, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
// import GoogleMap from "../../components/google-map";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import { fetchCorreo } from "../../hooks/use-fetchCorreo";
import cogoToast from "cogo-toast";
import { Loader2, Send } from "lucide-react";


const Contact = () => {
  let { pathname } = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { params } = useSelector((state) => state.paramsWeb);
  const [storeInfo, setStoreInfo] = useState({});
  const [formValues, setFormValues] = useState({
    'name': "",
    'email': "",
    'subject': '',
    'message': "",
  });

  useEffect(() => {
    if (params?.length) {
      const mapping = {
        DIRECCIONPRINCIPAL: "direccion",
        FACEBOOK: "facebook",
        INSTAGRAM: "instagram",
        TIKTOK: "tiktok",
        CORREO: "correo",
        CANALWHATSAPP: "whatsapp",
      };

      const newStoreInfo = params.reduce((acc, param) => {
        const key = mapping[param.Nombre];
        if (key) {
          acc[key] = param.Valor;
        }
        return acc;
      }, {});

      // Actualizar el estado con la información de la tienda

      setStoreInfo(newStoreInfo);
    }
  }, [params]);


  const handleFormChange = (e) => {
    const {name, value} = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSendMail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{

      const res = await dispatch(fetchCorreo({
        tipo: 'contacto',
        datos: formValues,
        loading: false
      }));
    
      if (res) {
        cogoToast.success(res, { position: "bottom-center" });
    
        // Limpiar el formulario 
        setFormValues({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    }
    catch(error){
        console.log(error)
    }
    finally
    {
      setLoading(false);
    }
  };
  


  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Cantacto", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
            {/* <div className="contact-map mb-10">
              <GoogleMap lat={14.6263929} lng={-90.5556391} zoom={60} />
            </div> */}
            <div className="custom-row-2">
              <div className="col-12 col-lg-4 col-md-5">
                <div className="contact-info-wrap bg-white">
                  <div className="single-contact-info">
                    <div className="contact-icon">
                      <i className="fa fa-phone" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a
                          href={storeInfo?.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          +502{" "}
                          {storeInfo?.whatsapp?.replace(
                            "https://wa.me/502",
                            ""
                          )}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info ">
                    <div className="contact-icon">
                      <i className="fa fa-envelope" />
                    </div>
                    <div className="contact-info-dec">
                      <p>
                        <a
                          href={`mailto:${storeInfo?.correo}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {storeInfo?.correo}
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="single-contact-info noHover">
                    <div className="contact-icon">
                      <i className="fa fa-map-marker" />
                    </div>
                    <div className="contact-info-dec">
                      <p style={{ lineHeight: "20px" }}>
                        {storeInfo?.direccion}
                      </p>
                    </div>
                  </div>
                  <div className="contact-social text-center">
                    <h4>{t("follow_us")}</h4>
                    <ul>
                      {storeInfo.facebook && (
                        <li>
                          <a
                            href={storeInfo.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebook className="text-black m-1 text-hover-green-hs" />
                          </a>
                        </li>
                      )}
                      {storeInfo.instagram && (
                        <li>
                          <a
                            href={storeInfo.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram className="text-black m-1 text-hover-green-hs" />
                          </a>
                        </li>
                      )}
                      {storeInfo.tiktok && (
                        <li>
                          <a
                            href={storeInfo.tiktok}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaTiktok className="text-black m-1 text-hover-green-hs" />
                          </a>
                        </li>
                      )}
                      {storeInfo.whatsapp && (
                        <li>
                          <a
                            href={storeInfo.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaWhatsapp className="text-black m-1 text-hover-green-hs" />
                          </a>
                        </li>
                      )}
                      {storeInfo.correo && (
                        <li>
                          <a
                            href={`mailto:${storeInfo.correo}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaEnvelope className="text-black m-1 text-hover-green-hs" />
                          </a>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-8 col-md-7 ">
                <div className="contact-form mb-5 pb-5 bg-white">
                  <div className="contact-title">
                    <h2>{t("contact_us")}</h2>
                  </div>
                  <form className="contact-form-style" onSubmit={handleSendMail}>
                    <div className="row">
                      <div className="col-lg-6">
                        <input
                          name="name"
                          placeholder={t("name")}
                          type="text"
                          required={true}
                          onChangeCapture={handleFormChange}
                          value={formValues.name}
                        />
                      </div>
                      <div className="col-lg-6">
                        <input
                          name="email"
                          placeholder={t("email")}
                          type="email"
                          onChangeCapture={handleFormChange}
                          value={formValues.email}
                        />
                      </div>
                      <div className="col-lg-12">
                        <input
                          name="subject"
                          placeholder={t("subject")}
                          type="text"
                          onChangeCapture={handleFormChange}
                          value={formValues.subject}
                        />
                      </div>
                      <div className="col-lg-12">
                        <textarea
                          name="message"
                          placeholder={t("message")}
                          defaultValue={""}
                          onChangeCapture={handleFormChange}
                          value={formValues.message}
                        />
                        <div className="row col-12 mx-auto">
                        <button
                            type="submit"
                            className="button-active-hs btn-black d-flex justify-content-center align-items-center gap-4 "
                            disabled={loading}
                        >
                          <span className="mr-4">
                            {t("send_message")}
                            </span>
                          {loading ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Send className="postion-fixed" />
                          )}
                        </button>
                        </div>
                      </div>
                    </div>
                  </form>
                  <p className="form-message" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;
