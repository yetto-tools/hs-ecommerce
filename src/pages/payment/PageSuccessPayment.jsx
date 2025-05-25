import { useSearchParams } from "react-router-dom";
import PageContentBlank from "../other/PageContentBlank";
import usePaymentData from "./usePaymentData";
import useSendPaymentData from "./useSendPaymentData";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LayoutPago from "../../layouts/LayoutPago";

export const PageSuccessPayment = () => {
  const [searchParams] = useSearchParams();
  const paymentData = usePaymentData();
  const { cartOrder } = useSelector((state) => state.cartOrder);
 
  const sendPaymentData = useSendPaymentData();
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const isReady =
      cartOrder?.UIdCarrito &&
      cartOrder?.DocumentoLocal &&
      paymentData?.hash &&
      paymentData?.orderid;

    if (isReady && !sent) {
      const data = {
        UIdCarrito: cartOrder.UIdCarrito,
        documentoLocal: cartOrder.DocumentoLocal,
        BAC_HASH: paymentData.hash,
        BACOrderId: paymentData.orderid,
        BACResponse: paymentData.responsetext,
        BACTransactionID: paymentData.transactionid,
        BACAuthCode: paymentData.authcode,
      };

      sendPaymentData(data);
      setSent(true);
    }
  }, [cartOrder, paymentData, sent]);

  

  return (
    <LayoutPago>
      <div className="container mt-0">
        {/* Título */}
        <div className="row text-center mb-4 ">
          <div className="col">
            <h1 className="fw-bold">Forma de Pago Procesada</h1>
          </div>
            <div className="cart-main-area pt-90 pb-100">
              <div className="container-xxl list-product-cart">
                <div className="row">
                  <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30"><i className="pe-7s-cart"></i></div>
                      <div className="item-empty-area__text">
                        Seguir Comprando <br /> 
                        <a href="/">Comprar Ahora</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <fieldset disabled>
          {/* Formulario que incluye los campos visibles y ocultos */}
          <form>
            {/* Campos visibles para el usuario */}
           


            {/* Campos ocultos requeridos */}
            <div style={{ display: "none" }}>
              <input
                type="hidden"
                name="response"
                value={paymentData.response || ""}
              />
              <input
                type="hidden"
                name="avsresponse"
                value={paymentData.avsresponse || ""}
              />
              <input
                type="hidden"
                name="cvvresponse"
                value={paymentData.cvvresponse || ""}
              />
              <input type="hidden" name="type" value={paymentData.type || ""} />
              <input
                type="hidden"
                name="response_code"
                value={paymentData.response_code || ""}
              />
              <input
                type="hidden"
                name="website"
                value={paymentData.website || ""}
              />
              <input
                type="hidden"
                name="ipaddress"
                value={paymentData.ipaddress || ""}
              />
              <input type="hidden" name="eci" value={paymentData.eci || ""} />
              <input type="hidden" name="cavv" value={paymentData.cavv || ""} />
              <input
                type="hidden"
                name="username"
                value={paymentData.username || ""}
              />
              <input type="hidden" name="time" value={paymentData.time || ""} />
            </div>
          </form>
        </fieldset>
      </div>
    </LayoutPago>
  );
};
