// BacCheckout.jsx
import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import { getDiscountPrice } from "../../helpers/product";

import { FormDireccionEntrega } from "../payment/FormDireccionEntrega";
import { ResumenCompra } from "./ResumenCompra";

import { FormLogin } from "../payment/FormLogin";
import { FormDatosCliente } from "../payment/FormDatosCliente";

import { Loader2, Send } from "lucide-react";
import { useCheckoutLogic } from "../../hooks/useCheckoutLogic";

const BacCheckout = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const currency = useSelector((state) => state.currency);

  // Desestructuramos los métodos y estados del hook
  const {
    formValues,
    setFormValues,
    handleChange,
    handleCheckNit,
    handleInvoces,
    inputRef,
    loadingOrder,
    loadingNit,
    errorsValidate,
    setErrorsValidate,
    showAddressNew,
    setShowAddressNew,
    addressSelected,
  } = useCheckoutLogic();

  let cartTotalPrice = 0; // Calcula o asigna el valor total según tu lógica

  return (
    <Fragment>
      <SEO
        titleTemplate="Confiración"
        description="Confiración de compra, HypeStreet Guatemala"
      />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Inicio", path: process.env.PUBLIC_URL + "/" },
            { label: "Confiración", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="checkout-area pt-95 pb-100">
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-6  col-md-12">
                  <div className="billing-info-wrap mb-30">
                    <FormLogin
                      setFormValues={setFormValues}
                      inputRef={inputRef}
                      style={{
                        fontWeight: "500",
                        lineHeight: "1",
                        zIndex: "9",
                        display: "block",
                        width: "2.5rem",
                        padding: "0.5rem",
                        textAlign: "center",
                        letterSpacing: "1px",
                        textTransform: "uppercase",
                        color: "#fff",
                        border: "none",
                        borderRadius: "3px",
                        background: "none",
                        backgroundColor: "#000",
                      }}
                    />
                  </div>
                  <div className="billing-info-wrap" id="billing-info">
                    <h3>{t("page_checkout.billing_details")}</h3>
                    <div className="row">
                      <div className="col-lg-12" id="nit">
                        <FormDatosCliente
                          formValues={formValues}
                          handleChange={handleChange}
                          handleCheckNit={handleCheckNit}
                          loading={loadingNit}
                          style={{
                            fontWeight: "500",
                            lineHeight: "1",
                            zIndex: "9",
                            display: "block",
                            width: "2.5rem",
                            padding: "0.5rem",
                            textAlign: "center",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                            color: "#fff",
                            border: "none",
                            borderRadius: "3px",
                            background: "none",
                            backgroundColor: "#000",
                          }}
                        />
                      </div>
                      <div className="mt-5">
                        <h3>Datos de Entrega</h3>
                        <hr />
                      </div>
                      <FormDireccionEntrega
                        country="default" // Asegúrate de enviar el valor correcto
                        setFormValues={setFormValues}
                        formValues={formValues}
                        handleChange={handleChange}
                        errorsValidate={errorsValidate}
                        setShowAddressNew={setShowAddressNew}
                        showAddressNew={showAddressNew}
                        addressSelected={addressSelected}
                      />
                      <div className="mt-5">
                        <h3
                          onClick={() => {
                            console.log(cartItems);
                          }}
                        >
                          Confirmar Orden de Compra
                        </h3>
                        <hr />
                        <button
                          type="submit"
                          className="button-active-hs btn-black w-100 d-flex justify-content-center align-items-center gap-2 py-2"
                          disabled={loadingOrder}
                          onClick={handleInvoces}
                        >
                          <span>{t("send_message")}</span>

                          {loadingOrder ? (
                            <Loader2 className="animate-spin" />
                          ) : (
                            <Send className="position-relative" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                  <br />
                  <div className="billing-info-wrap mt-40 hidden">
                    <h3>{t("page_checkout.payment_information")}</h3>
                    <hr />
                    <div className="row">
                      <div className="col-lg-12">
                        {/* <CreditCardForm
                          handleSubmitPayment={handleBacPayment}
                          cardValues={cardValues}
                          setCardValues={setCardValues}
                        /> */}
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

export default BacCheckout;
