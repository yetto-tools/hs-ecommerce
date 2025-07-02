import { useEffect, useState } from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { useSelector } from "react-redux";
import { formatWhatsappNumber } from "../../../helpers/validator";

const MobileWidgets = () => {
  const { params } = useSelector((state) => state.paramsWeb);
  const [storeInfo, setStoreInfo] = useState({});

  useEffect(() => {
    if (params?.length) {
      const mapping = {
        DIRECCIONPRINCIPAL: "direccion",
        FACEBOOK: "facebook",
        INSTAGRAM: "instagram",
        TIKTOK: "tiktok",
        CORREO: "correo",
        CANALWHATSAPP: "whatsapp",
        TELEFONO: "telefono",
      };

      const newStoreInfo = params.reduce((acc, param) => {
        const key = mapping[param.Nombre];
        if (key) {
          acc[key] = (param.Valor || "").replace(
            /[\x00-\x1F\u200E\u200F\u202A-\u202E]/g,
            ""
          );
        }
        return acc;
      }, {});

      // Actualizar el estado con la información de la tienda

      setStoreInfo(newStoreInfo);
    }
  }, [params]);

  return (
    <div className="offcanvas-widget-area">
      <div className="off-canvas-contact-widget">
        <div className="header-contact-info">
          <div className="contact-info-dec">
            <p>
              <a
                href={"https://wa.me/" + storeInfo?.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="fs-5"
              >
                {""}
                {formatWhatsappNumber(storeInfo?.whatsapp)}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${storeInfo?.correo}`}
                target="_blank"
                rel="noopener noreferrer"
                className="fs-5"
              >
                {storeInfo?.correo}
              </a>
            </p>
          </div>
        </div>
      </div>
      {/*Off Canvas Widget Social Start*/}
      <div className="off-canvas-widget-social">
        {storeInfo.facebook && (
          <a
            href={storeInfo.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook
              className="text-black m-1 text-hover-green-hs"
              size={32}
            />
          </a>
        )}
        {storeInfo.instagram && (
          <a
            href={storeInfo.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram
              className="text-black m-1 text-hover-green-hs"
              size={32}
            />
          </a>
        )}
        {storeInfo.tiktok && (
          <a href={storeInfo.tiktok} target="_blank" rel="noopener noreferrer">
            <FaTiktok
              className="text-black m-1 text-hover-green-hs"
              size={32}
            />
          </a>
        )}
        {storeInfo.whatsapp && (
          <a
            href={storeInfo.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp
              className="text-black m-1 text-hover-green-hs"
              size={32}
            />
          </a>
        )}
      </div>
      {/*Off Canvas Widget Social End*/}
    </div>
  );
};

export default MobileWidgets;
