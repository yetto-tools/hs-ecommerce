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


const Checkout = () => {
  const { t, i18n } = useTranslation();
  let cartTotalPrice = 0;

  let { pathname } = useLocation();

  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const { loading, validacionNit, error } = useSelector((state) => state.validarNit);
  const [formValues, setFormValues] = useState({ nitCliente: "", nameCliente: "", firstName: "", lastName: "" });

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
    const { value } = e.target;
    setFormValues((prev) => ({ ...prev, nitCliente: value }));
  };

  // 🟢 Validación y envío de consulta
  const handleCheckNit = () => {
    const { nitCliente } = formValues;

    if (!nitCliente.trim()) {
      alert(`El campo NIT/DPI no puede estar vacío.`);
      return;
    }


    console.log("Validando NIT/DPI:", nitCliente);
    dispatch(fetchValidaNIT(nitCliente));
  };

  // 🟢 Auto completar formulario cuando se reciba la respuesta de validación
  useEffect(() => {
    if (validacionNit) {
      console.log("Datos recibidos:", validacionNit);

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
  }, [validacionNit]);



  const handleSendOrder = () => {
    if (!formValues.nitCliente || cartItems.length === 0) {
      alert("Debe ingresar un NIT y agregar productos al carrito.");
      return;
    }
  
 
  
    // Cliente
    const orderCliente =  adapterOrderCustomer(formValues)
    
    // Productos
    const orderProducts = adapterOrderProducts(cartItems)
    
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
        alert("Orden enviada con éxito!");
        console.log("Respuesta del servidor:", data);
      })
      .catch((error) => {
        console.error("Error al enviar la orden:", error);
        alert("Hubo un error al enviar la orden.");
      });
  };
  

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

                      <div className="col-lg-12">
                        <div className="billing-select mb-20">
                          <label>{t("page_checkout.country")}</label>
                          <select>
                            <option>{t("page_checkout.select_country")}</option>
                            <option>Guatemala</option>
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
                          <label>{t("page_checkout.state_county")}</label>
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
                          <label>{t("page_checkout.email_address")}</label>
                          <input type="text" />
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
                        <div className="your-order-top">
                          <ul>
                            <li>{t("page_checkout.product")}</li>
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
                                  <span className="order-middle-left">
                                    {cartItem.name} X {cartItem.quantity}
                                  </span>{" "}
                                  <span className="order-price">
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
                        <div className="your-order-total">
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
                      <button className="btn-hover" onClick={handleSendOrder}>
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
