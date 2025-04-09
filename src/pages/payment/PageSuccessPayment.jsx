import { useSearchParams } from "react-router-dom";
import PageContentBlank from "../other/PageContentBlank";
import usePaymentData from "./usePaymentData";
import useSendPaymentData from "./useSendPaymentData";

export const PageSuccessPayment = () => {
  // Extrae la data de la URL
  const paymentData = usePaymentData();

  // Envia los datos a tu endpoint
  useSendPaymentData(paymentData);

  return (
    <PageContentBlank>
      <div className="container mt-0">
        {/* Título */}
        <div className="row text-center mb-4 ">
          <div className="col">
            <h1>Respuesta de la Transacción</h1>
          </div>
        </div>
        <fieldset disabled>
          {/* Formulario que incluye los campos visibles y ocultos */}
          <form>
            {/* Campos visibles para el usuario */}
            <div className="row justify-content-center align-items-center">
              <div className="col-lg-5 col-sm-6 mb-4">
                <div className="billing-info ">
                  <label className="fw-bold pb-2">Respuesta:</label>
                  <input
                    type="text"
                    className={`form-control fw-bold relative ${
                      paymentData.responsetext === "SUCCESS"
                        ? "text-success"
                        : "text-danger"
                    }`}
                    readOnly
                    value={paymentData.responsetext || ""}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-sm-6 mb-4">
                <div className="billing-info">
                  <label className="fw-bold pb-2">
                    Código de Autorización:
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={paymentData.authcode || ""}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-sm-6 mb-4">
                <div className="billing-info">
                  <label className="fw-bold pb-2">Transacción ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={paymentData.transactionid || ""}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-sm-6 mb-4">
                <div className="billing-info">
                  <label className="fw-bold pb-2">Orden ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={paymentData.orderid || ""}
                  />
                </div>
              </div>
            </div>

            <div className="row justify-content-center align-items-center">
              <div className="col-lg-3 col-sm-6 mb-4  d-none">
                <div className="billing-info">
                  <label className="fw-bold pb-2">3DS Version:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={paymentData.three_ds_version || ""}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-sm-6 mb-4">
                <div className="billing-info">
                  <label className="fw-bold pb-2">Total Q.:</label>
                  <input
                    type="text"
                    className="form-control fw-bold"
                    readOnly
                    value={paymentData.amount || ""}
                  />
                </div>
              </div>
              <div className="col-lg-5 col-sm-6 mb-4">
                <div className="billing-info">
                  <label className="fw-bold pb-2">Hash:</label>
                  <input
                    type="text"
                    className="form-control"
                    readOnly
                    value={paymentData.hash || ""}
                  />
                </div>
              </div>
              {/* Puedes agregar otros campos visibles según lo requieras */}
            </div>

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
    </PageContentBlank>
  );
};
