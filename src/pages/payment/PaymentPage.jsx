// orlando
// 2023-12-02
// vista de productos con filtros

import { Fragment, useState } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import CryptoJS from "crypto-js";
import { useLocation } from "react-router-dom";
import { CreditCardForm } from "./CreditCardForm";
const PaymentPage = () => {
  const location = useLocation();
  const { pathname } = location;

  const [formData, setFormData] = useState({
    orderId: "Prueba123",
    amount: "10.00",
    timestamp: "",
    hash: "",
    ccnumber: "",
    ccexp: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generarHashYEnviar = () => {
    const { orderId, amount } = formData;
    const key = "TU_LLAVE_PRIVADA"; // ⚠️ No exponer en producción
    const timestamp = Math.floor(Date.now() / 1000);
    const cadena = `${orderId}|${amount}|${timestamp}|${key}`;
    const hash = CryptoJS.MD5(cadena).toString();

    setFormData({ ...formData, timestamp, hash });

    console.log("Hash generado:", hash);
    console.log("Timestamp:", timestamp);

    document.getElementById("paymentForm").submit();
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Tienda en Línea"
        description="Pagos con tarjeta de crédito"
      />

      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Pagos", path: process.env.PUBLIC_URL + pathname },
          ]}
        />

        <div className="shop-area pt-95 pb-100">
          <div className="container-fluid">
            <div className="row col-lg-11 mx-auto">
              <div className="col-lg-6 order-2 order-lg-1">
                <div>
                  <h2>Realizar Pago</h2>
                  <CreditCardForm />
                </div>
              </div>
              <div className="col-lg-6 order-1 order-lg-2"></div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default PaymentPage;
