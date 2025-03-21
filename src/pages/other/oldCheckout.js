import { Fragment, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { Loader2, Search } from "lucide-react";

import { fetchValidaNIT } from "../../hooks/use-fetchValidaNIT";

import { adapterOrderCustomer, adapterOrderProducts } from "../../adapters/order";
import clsx from "clsx";
import { setError } from "../../store/slices/validaNit-slice";
import { validateEmail } from "../../helpers/validator";


const Checkout = () => {
  const { t, i18n } = useTranslation();
  let cartTotalPrice = 0;

  let { pathname } = useLocation();

  const { country } = useSelector((state) => state.paramsWeb);


  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const {validacionNit,loading, error } = useSelector((state) => state.validarNit);
  const [formValues, setFormValues] = useState({ nitCliente: "", nameCliente: "", firstName: "", lastName: "" });

  const [errorValidateEmail, setErrorValidateEmail] = useState(false);

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
    setErrorValidateEmail(false);
      // Validar email
      switch(name){    
        case "email":
          validateEmail(value) === false ? setErrorValidateEmail(true) : setErrorValidateEmail(false)
        break;
      }
  };

  // 🟢 Validación y envío de consulta
  const handleCheckNit = () => {
    const { nitCliente } = formValues;

    if (!nitCliente.trim()) {
      alert(`El campo NIT/DPI no puede estar vacío.`);
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

    try{

    if (!formValues.nitCliente || cartItems.length === 0) {
      alert("Debe ingresar un NIT y agregar productos al carrito.");
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
    
  }

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
                        <div className="billing-info mb-20">
                          <div className=" d-flex flex-row justify-content-start align-items-center gap-2">
                          <label>{t("page_checkout.vat") }</label>
                          <label>{"|"}</label>
                          <label>{t("page_checkout.dpi") }</label>
                            </div>
                            <div className="place-order d-flex position-relative align-items-center gap-2">
                              <input 
                                type="search"         
                                value={formValues.nitCliente}
                                onChange={handleChange} 
                                disabled={loading}
                                required={true}
                                className={clsx(error && "border-danger text-danger fw-bold")}
                              />
                              <button type="button" className="btn-hover-green text-center " style={style} onClick={handleCheckNit}
                               disabled={loading}
                              >
                                {
                                  loading 
                                  ? <Loader2 className="animate-spin" /> 
                                  : <Search className="postion-fixed" />
                                }
                              </button>
                            </div>
                        </div>
                      </div>
                      <div className="col-lg-12  ">
                        <div className="billing-info mb-20" >
                          <label>{t("page_checkout.first_name")}</label>
                          <input type="text" name="nameCliente"  value={formValues.nameCliente} readOnly={true}/>
                          
                        </div>
                      </div>
                      
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20" hidden>
                          <label>{t("page_checkout.last_name")}</label>
                          <input type="hidden" name="lastNameCliente"/>
                        </div>
                      </div>


                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>{t("page_checkout.street_address")}</label>
                          <input
                            className="billing-address"
                            placeholder={t("page_checkout.street")}
                            type="text"
                          />
                          <input
                            placeholder="Casa, nivel , apartamento..."
                            type="text"
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <h3>Datos de Entrega</h3>
                        <hr/>
                      </div>

                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label htmlFor="idPais">{t("page_checkout.country")}</label>
                          <select name="idPais" id="idPais" >
                            <option name="idPais">{t("page_checkout.select_country")}</option>
                            {
                              country &&
                              country.paises.map((pais, index) => (
                                <option key={pais.id || `pais-${index}`} value={pais.id}>{pais.Nombre}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>

                  

                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>{t("page_checkout.select_country")}</label>
                          <select name="idPais">
                            <option name="idPais">{t("page_checkout.select_country")}</option>
                            {
                              country &&
                              country.departamentos.map((depto, index ) => (
                                <option key={depto.id || `depto-${index}`} value={depto.id}>{depto.Nombre}</option>
                              ))
                            }
                          </select>
                        </div>
                      </div>                     
                      <div className="col-lg-12">
                        <div className="billing-info mb-20">
                          <label>{t("page_checkout.city")}</label>
                          <input type="text" />
                        </div>
                      </div>

                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>{t("page_checkout.phone1")}</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label>{t("page_checkout.phone2")}</label>
                          <input type="text" />
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6">
                        <div className="billing-info mb-20">
                          <label htmlFor="email" className={clsx(errorValidateEmail && "text-danger")}>{t("page_checkout.email_address")}</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={formValues.email} 
                            required 
                            onChange={handleChange}
                            className={clsx(errorValidateEmail && "border-danger text-danger fw-bold")}
                          />
                          {errorValidateEmail && <p className="text-danger mt-1">{"correo inválido"}</p>} {/* Mensaje de error */}
                        </div>
                      </div>
                    </div>

                    <div className="additional-info-wrap">
                      <h4>{t("page_checkout.additional_information")}</h4>
                      <div className="additional-info">
                        <label>{t("page_checkout.order_notes")}</label>
                        <textarea
                          placeholder="Notas sobre su pedido, Ej: Llamar antes de la entrega."
                          name="message"
                          defaultValue={""}
                        />
                      </div>
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
      </LayoutOne>
    </Fragment>
  );
};

export default Checkout;
