// BacCheckout.jsx
import { Fragment, useEffect, useMemo, useState } from "react";
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
  const [disabledSendButton, setDisabledSendButton] = useState(false);
  const { usuario, address } = useSelector((state) => state.usuario);

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

  let cartTotalPrice = 0;

  const handleSubmitInvoces = async (e) => {
    e.preventDefault();
    try {
      setDisabledSendButton(true);
      await handleInvoces(e);
    } catch (error) {
      setDisabledSendButton(false);
    } finally {
      setDisabledSendButton(false);
    }
  };

  useEffect(() => {
    if (usuario && address.length === 0) {
      setShowAddressNew(true);
    }
    if (address.length !== 0) setShowAddressNew(false);
  }, [address]);

  const isFormComplete = () => {
    return (
      usuario &&
      formValues.nitCliente?.trim() &&
      formValues.nameCliente?.trim() &&
      formValues.phone?.trim() &&
      formValues.idDireccion &&
      address.length > 0
    );
  };

  const formIsValid = useMemo(
    () => isFormComplete(),
    [formValues, usuario, address]
  );

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
          <div className="container">
            {cartItems && cartItems.length >= 1 ? (
              <div className="row">
                <div className="col-lg-6">
                  <div className="billing-info-wrap mb-30">
                    <div className="row">
                      <div className="border-bottom p-4 rounded mt-5">
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
                    </div>
                  </div>

                  {usuario && (
                    <div className="billing-info-wrap" id="billing-info">
                      <div className="row">
                        <div className="border-bottom p-4 rounded mt-5">
                          <h3>Datos de Entrega</h3>
                          <hr />
                          <FormDireccionEntrega
                            country="default"
                            setFormValues={setFormValues}
                            formValues={formValues}
                            handleChange={handleChange}
                            errorsValidate={errorsValidate}
                            setShowAddressNew={setShowAddressNew}
                            showAddressNew={showAddressNew}
                            addressSelected={addressSelected}
                          />
                        </div>

                        {formValues.idDireccion !== undefined && (
                          <div className="border-bottom p-4 rounded mt-5">
                            <h3>{t("page_checkout.billing_details")}</h3>
                            <hr />
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
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <br />
                  <div className="row">
                    <div className="mt-5">
                      <h3
                        onClick={() => {
                          console.log(formValues);
                        }}
                      >
                        Confirmar Orden de Compra
                      </h3>
                      <hr />
                      <div
                        className="row"
                        style={{
                          opacity: !formIsValid ? 0.3 : 1,
                          pointerEvents: !formIsValid ? "none" : "auto",
                        }}
                      >
                        <div className="col-lg-12">
                          <button
                            type="submit"
                            className="button-active-hs btn-black w-100 d-flex justify-content-center align-items-center gap-2 py-2"
                            disabled={!formIsValid || disabledSendButton}
                            onClick={handleSubmitInvoces}
                          >
                            <span>
                              {formIsValid
                                ? t("send_message")
                                : t("page_checkout.complete_fields")}
                            </span>

                            {disabledSendButton ? (
                              <Loader2 className="animate-spin" />
                            ) : (
                              <Send className="position-relative" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>{" "}
                    {!formIsValid && (
                      <p className="text-danger mt-2">
                        {t("page_checkout.complete_all_fields")}
                      </p>
                    )}
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
