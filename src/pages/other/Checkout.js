import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Form, Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import { fetchValidaNIT } from "../../hooks/use-fetchValidaNIT";

import { adapterOrderCustomer, adapterOrderProducts } from "../../adapters/order";

import { setError } from "../../store/slices/validaNit-slice";
import { validateEmail, validatePhone } from "../../helpers/validator";
import { FormDatosCliente } from "../payment/FormDatosCliente";
import { FormDireccionEntrega } from "../payment/FormDireccionEntrega";
import cogoToast from "cogo-toast";
import ModalLoginOrRegister from "../../wrappers/ModalLoginOrRegister";


const Checkout = () => {
  const { t, i18n } = useTranslation();
  let cartTotalPrice = 0;

  let { pathname } = useLocation();

  const { country } = useSelector((state) => state.paramsWeb);
  const { usuario } = useSelector((state) => state.usuario);

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const {validacionNit,loading, error } = useSelector((state) => state.validarNit);
  const [formValues, setFormValues] = useState({ nitCliente: "", nameCliente: "", firstName: "", lastName: "" });

  const [errorsValidate, setErrorsValidate] = useState(false);
  const [show, setShow] = useState(false);

  const style = {
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
  };

  
  // 🟢 Maneja cambios en el input del NIT/DPI
  const handleChange = (e) => {
    const { name,  value } = e.target;

    setFormValues((prev) => ({ ...prev, nitCliente: value }));
    dispatch(setError(false));
      // Validar email
      switch(name){    
        case "email":          
        
          setErrorsValidate((prev) => ({ ...prev, name: validateEmail(value)  }));
        break;
        case "telefono":
        
          setErrorsValidate((prev) => ({ ...prev, name: validatePhone(value)  }));
          break;
      }
  };

  // 🟢 Validación y envío de consulta
  const handleCheckNit = () => {
    const { nitCliente } = formValues;

    if (!nitCliente.trim()) {
      alert(`El campo NIT/DPI no puede estar vacío.`);
      document.querySelector("#nitCliente").click();
      return;
    }

    dispatch(fetchValidaNIT(nitCliente));

  };

  // 🟢 Auto completar formulario cuando se reciba la respuesta de validación
  useEffect(() => {
    if (validacionNit) {
      console.log("Datos recibidos:", error);

      // Si es DPI, dividimos el nombre en firstName y lastName
      let firstName = validacionNit.Nombre || "";
      let lastName = "";

      if (firstName.includes(",") && !firstName.includes("CF")) {
        const nameParts = firstName.split(",");
        firstName = nameParts[1].trim();
        lastName = nameParts[0].trim();
      }
      console.log("Datos recibidos:", {
        
        nameCliente: validacionNit.Nombre,
        firstName,
        lastName,
        nitCliente: validacionNit.Nit
      });
      setFormValues((prev) => ({
        ...prev,
        nameCliente: validacionNit.Nombre,
        nitCliente: validacionNit.Nit
      }));
    }
  }, [validacionNit,error]);



  const handleSendOrder = () => {
    console.log(usuario)

    if( usuario === null){
      setShow(true);
      cogoToast.info("Debe Iniciar Sesión", { position: "top-center" });

      return;
    }



    try{

    if (!formValues.nitCliente) {
      cogoToast.error("Debe ingresar un NIT ");
      return;
    }
    if(cartItems.length === 0){
      cogoToast.error("Debe de Agregar Productos al Carrito");
      return;
    }
    handleCheckNit();

    if(error){
      return 
    }
  
 
  
    // Cliente
    const orderCliente =  adapterOrderCustomer(formValues)
    
    // Productos
    const orderProducts = adapterOrderProducts(cartItems, {iva: 1.12, idAlmacen: 1})
    
    // Construcción del JSON final
    const order = {orderCliente, products:orderProducts}
  
    console.log("Orden Generada:", order);
  
    // Aquí puedes enviarlo al backend
    fetch("/api/orden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Pédido enviada con éxito!");
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error(" un error durante la validación de datos", error);
        alert("Hubo un error durante la validación de datos");
      });

    }
    catch(error){
      alert("Hubo un error durante la validación de datos");
    }
    finally{
      dispatch(setError(false));
    }
  };
  
  const handleInvoces =()=>{
    console.log(cartItems)
  }

  const handleClose = () => setShow(false);

  return (
    <Fragment>
      <SEO
        titleTemplate="Confiración"
        description="Confiración de compra, HypeStreet Guatemala"
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
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
                <div className="col-lg-7">
                  <div className="billing-info-wrap">
                    <h3>{t("page_checkout.billing_details")}</h3>
                    <div className="row">
                    <div className="col-lg-12">

                      <FormDatosCliente 
                        formValues={formValues}
                        handleChange={handleChange} 
                        handleCheckNit={handleCheckNit} 
                        loading={loading} 
                        error={error}
                        style={style}  />

                    </div>
                      <div className="mt-5">
                        <h3>Datos de Entrega</h3>
                        <hr/>
                      </div>
                      <FormDireccionEntrega 
                        country={country}
                        formValues={formValues} 
                        handleChange={handleChange} 
                        errorsValidate={errorsValidate}
                        
                        />

                    </div>

                    
                  </div>
                </div>

                <div className="col-lg-5">
                  <div className="your-order-area">
                    <h3>{t("page_checkout.your_order")}</h3>
                    <div className="your-order-wrap gray-bg-4">
                      <div className="your-order-product-info">
                        <div className="your-order-top" onClick={() => console.log(cartItems)}>
                          <ul>
                            <li>{t("page_checkout.product")}</li>
                            <li>{t("page_checkout.quantity")}</li>
                            <li>Total</li>
                          </ul>
                        </div>
                        <div className="your-order-middle">
                          <ul>
                            {cartItems.map((cartItem, key) => {
                              const discountedPrice = getDiscountPrice(
                                cartItem.price,
                                cartItem.discount
                              );
                              const finalProductPrice = (
                                cartItem.price * currency.currencyRate
                              ).toFixed(2);
                              const finalDiscountedPrice = (
                                discountedPrice * currency.currencyRate
                              ).toFixed(2);

                              discountedPrice != null
                                ? (cartTotalPrice +=
                                    finalDiscountedPrice * cartItem.quantity)
                                : (cartTotalPrice +=
                                    finalProductPrice * cartItem.quantity);
                              return (
                                <li key={key}>
                                  <span className="order-middle-left text-truncate">
                                    {cartItem.name} - {cartItem.size} 
                                    <p className="text-xs fw-bold">
                                      
                                      {
                                        new Intl.NumberFormat(i18n.language, {
                                          style: "currency",
                                          currency: currency.currencyName,
                                        }).format(
                                          finalProductPrice
                                        )
                                      }
                                    </p>
                                  </span>
                                  <strong> {cartItem.quantity} </strong>
                                  
                                  <span className="order-price" >
                                    {discountedPrice !== null
                                      ? new Intl.NumberFormat(i18n.language, {
                                          style: "currency",
                                          currency: currency.currencyName,
                                        }).format(
                                          finalDiscountedPrice *
                                            cartItem.quantity
                                        )
                                      : new Intl.NumberFormat(i18n.language, {
                                          style: "currency",
                                          currency: currency.currencyName,
                                        }).format(
                                          finalProductPrice * cartItem.quantity
                                        )}
                                  </span>
                                  
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                        <div className="your-order-bottom">
                          <ul>
                            <li className="your-order-shipping">
                              {t("page_checkout.shipping")}
                            </li>
                            <li>{t("page_checkout.free_shipping")}</li>
                          </ul>
                        </div>
                        <div className="your-order-total" onClick={handleInvoces}>
                          <ul>
                            <li className="order-total">Total</li>
                            <li>
                              {new Intl.NumberFormat(i18n.language, {
                                style: "currency",
                                currency: currency.currencyName,
                              }).format(cartTotalPrice)}
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="payment-method"></div>
                    </div>
                    <div className="place-order mt-25">
                      <button className="button-active-hs btn-black fw-bold" onClick={handleSendOrder}>
                        {t("page_checkout.place_order")}
                      </button>
                    </div>
                  </div>
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
                      {t("page_checkout.select_country")}
                      Comentario <br />{" "}
                      <Link to={process.env.PUBLIC_URL + "/productos"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <ModalLoginOrRegister show={show} onHide={handleClose} />
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;

