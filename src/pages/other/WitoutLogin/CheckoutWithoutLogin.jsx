// BacCheckout.jsx
import { Fragment, use, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import { Loader2, Send } from "lucide-react";

import SEO from "../../../components/seo";
import { ResumenCompra } from "../ResumenCompra";
import { Breadcrumb } from "react-bootstrap";
import LayoutOne from "../../../layouts/LayoutOne";
import { getDiscountPrice } from "../../../helpers/product";
import FormDeliveryAddress from "./FormAddress";
import { useDeliveryAddressForm } from "./useDeliveryAddressForm";
import { useCheckoutWithoutLogin } from "./useCheckoutWithoutLogin";
import { addressJsonToXml } from "../../../helpers/validator";
import { CreditCardForm } from "../../payment/CreditCardForm";
import { dataPaymentForm } from "../../../adapters/DataPaymentForm";

const CheckoutWithoutLogin = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const currency = useSelector((state) => state.currency);

  const {
    formData,
    country,
    paisesFiltrados,
    deptosFiltrados,
    municipiosFiltrados,
    isValid,
    isFormValid,
    handleChange,
    setFormData,
  } = useDeliveryAddressForm();

  const { cartTotalPrice, handleSendOrder, loadingOrder } =
    useCheckoutWithoutLogin();

  const handleSubmitInvoces = (e) => {
    const {
      nombre,
      nameCliente,
      nitCliente,
      correo,
      direccion,
      idPais,
      idDepartamento,
      idMunicipio,
      observaciones,
    } = formData;

    const clienteDireccion = addressJsonToXml(
      {
        nombre,
        nameCliente,
        nitCliente,
        correo,
        direccion,
        idPais,
        idDepartamento,
        idMunicipio,
        observaciones,
      },
      "clienteDireccion"
    );
    console.log(clienteDireccion);

    handleSendOrder(e, formData, clienteDireccion);
  };
  const handleDEBUG = () => {
    console.log(isValid);
  };

  const [cardValues, setCardValues] = useState(dataPaymentForm());

  const handleCardDebug = () => {
    console.log(cardValues);
  };

  return (
    <Fragment>
      <SEO
        titleTemplate="Confirmación"
        description="Confirmación de compra, HypeStreet Guatemala"
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Confirmación", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container-xl">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-6 border-end border-end-lg-0">
                  <div className="billing-info-wrap mb-5">
                    <div className="row">
                      <div className="col-lg-10">
                        <div className="border-bottom p-4 rounded mt-0">
                          <FormDeliveryAddress
                            formData={formData}
                            setFormData={setFormData}
                            country={country}
                            paisesFiltrados={paisesFiltrados}
                            deptosFiltrados={deptosFiltrados}
                            municipiosFiltrados={municipiosFiltrados}
                            isValid={isValid}
                            handleChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <br />

                  <div className="billing-info-wrap mb-5">
                    <div className="row">
                      <div className="col-lg-10">
                        <div className="border-bottom p-4 rounded mt-0">
                          <h3 onClick={() => handleCardDebug()}>
                            Confirmar Orden de Compra
                          </h3>

                          <CreditCardForm
                            //handleSubmitPayment={handleBacPayment}
                            cardValues={cardValues}
                            setCardValues={setCardValues}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <br />
                  <div className="billing-info-wrap mb-5">
                    <div className="row">
                      <div className="col-lg-10">
                        <div className="border-bottom p-4 rounded mt-0">
                          <h3 onClick={() => handleDEBUG()}>
                            Confirmar Orden de Compra
                          </h3>
                          <hr />
                          <div
                            className="row"
                            style={{
                              opacity: !isFormValid ? 0.3 : 1,
                              pointerEvents: !isFormValid ? "none" : "auto",
                            }}
                          >
                            <div className="col-lg-10 mx-auto">
                              <div className="row col-lg-12 mx-auto">
                                <button
                                  type="submit"
                                  className="button-active-hs btn-black w-100 d-flex justify-content-center align-items-center gap-2 py-2"
                                  disabled={!isFormValid || loadingOrder}
                                  onClick={handleSubmitInvoces}
                                >
                                  <span>
                                    {isFormValid
                                      ? t("send_message")
                                      : t("page_checkout.complete_fields")}
                                  </span>

                                  {loadingOrder ? (
                                    <Loader2 className="animate-spin" />
                                  ) : (
                                    <Send className="position-relative" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className="row col-lg-12 mx-auto">
                            {!isFormValid && (
                              <p className="text-danger text-center mt-2">
                                {t("page_checkout.complete_all_fields")}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-1"></div>

                <div className="col-lg-5">
                  <ResumenCompra
                    cartItems={cartItems}
                    cartTotalPrice={cartTotalPrice}
                    currency={currency}
                    getDiscountPrice={getDiscountPrice}
                    t={t}
                    i18n={i18n}
                  />
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-cash"></i>
                    </div>
                    <div className="item-empty-area__text">
                      <Link to={process.env.PUBLIC_URL + "/"}>Ir a Inicio</Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default CheckoutWithoutLogin;
