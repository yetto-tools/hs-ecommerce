import { Fragment, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDiscountPrice } from "../../helpers/product";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

import { fetchValidaNIT } from "../../hooks/use-fetchValidaNIT";

import {
  adapterOrderCustomer,
  adapterOrderProducts,
} from "../../adapters/order";

import { setError } from "../../store/slices/validaNit-slice";
import { FormDatosCliente } from "../payment/FormDatosCliente";
import { FormDireccionEntrega } from "../payment/FormDireccionEntrega";
import { FormLogin } from "../payment/FormLogin";

import { Loader2, Send } from "lucide-react";
import { API_URL } from "../../config";
import { generarCorrelativoFactura } from "../../helpers/validator";
import Decimal from "decimal.js";
import { fetchOrder } from "../../hooks/use-FetchOrder";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { fetchStock } from "../../hooks/use-FetchStock";

import { ResumenCompra } from "./ResumenCompra";
import { showToast } from "../../toast/toastManager";

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const inputRef = useRef(null);
  let cartTotalPrice = 0;
  let { pathname } = useLocation();

  const { country } = useSelector((state) => state.paramsWeb);
  const { usuario, address } = useSelector((state) => state.usuario);

  const { configParams } = useSelector((state) => state.paramsWeb);
  const currency = useSelector((state) => state.currency);
  const { cartItems } = useSelector((state) => state.cart);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [readyToCheckout, setReadyToCheckout] = useState(false);
  const dispatch = useDispatch();
  const { validacionNit, loading, error } = useSelector(
    (state) => state.validarNit
  );
  const [formValues, setFormValues] = useState({
    nitCliente: "",
    nameCliente: "",
    firstName: "",
    lastName: "",
  });

  const [errorsValidate, setErrorsValidate] = useState(false);
  const [show, setShow] = useState(false);
  const [showAddressNew, setShowAddressNew] = useState(false);

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
    e.preventDefault();
    const { name, value } = e.target;

    setFormValues((prev) => ({ ...prev, [name]: value }));
    dispatch(setError(false));
    // Validar email
  };

  // 🟢 Validación y envío de consulta
  const handleCheckNit = (e) => {
    e.preventDefault();
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
    if (!usuario) {
      showToast("Debe Iniciar Sesión", "info", "top-center");

      setShow(true);

      return;
    }

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

      setFormValues((prev) => ({
        ...prev,
        nameCliente: validacionNit.Nombre,
        nitCliente: validacionNit.Nit,
        firstName: validacionNit.Nombre,
        lastNameCliente: "",
      }));
    }
    inputRef.current?.focus();
  }, [usuario, validacionNit, error]);

  const handleInvoces = async (e) => {
    e.preventDefault();
    setLoadingOrder(true);

    if (!formValues.idCliente) {
      showToast("Debe Iniciar Sesión", "info", "top-center");

      setLoadingOrder(false);
      return;
    }

    if (!formValues.nitCliente) {
      showToast("Debe Agregar nit / dpi", "info", "top-center");

      document.querySelector("#nit-section > button").click();
      setLoadingOrder(false);
      return;
    }
    if (!formValues.nameCliente) {
      showToast("Debe Agregar nit / dpi para Validar", "info", "top-center");
      document.querySelector("#nit-section > button").click();
      setLoadingOrder(false);
      return;
    }
    if (
      !formValues.idDireccion === "Elegir dirección" ||
      formValues.idDireccion === "" ||
      formValues.idDireccion === null ||
      formValues.idDireccion === undefined
    ) {
      showToast("Debe de Agregar una direccion", "info", "top-center");
      setLoadingOrder(false);
      return;
    }

    if (cartItems.length === 0) {
      showToast("Debe de Agregar Productos al Carrito", "info", "top-center");
      setLoadingOrder(false);
      return;
    }

    if (cartItems.length === 0) {
      showToast("Debe de Agregar Productos al Carrito", "info", "top-center");
      setLoadingOrder(false);
      return;
    }

    if (address?.length === 0 || !address) {
      setLoadingOrder(false);
      return;
    }

    const { address: selectedAddress } = address.find(
      (street) => street.idAddress === Number(formValues.idDireccion)
    );

    let allItemsInStock = true;
    setReadyToCheckout(true);
    for (const item of cartItems) {
      const stock = await fetchStock(item.code);
      if (item.quantity > stock) {
        handleAlertSaleOut(
          `No hay suficiente stock para ${item.name}. 
           Disponible: ${stock}`
        );
        allItemsInStock = false;
        setReadyToCheckout(false);
      }
    }

    if (!allItemsInStock) {
      showToast(
        "Ajuste las cantidades de los productos según el stock disponible antes de proceder.",
        "info",
        "top-center"
      );

      setLoadingOrder(false);
      return;
    }

    // Cliente
    // let orderCliente = adapterOrderCustomer(formValues);
    // console.log(orderCliente);
    // Productos
    const orderProducts = adapterOrderProducts(
      cartItems,
      {
        iva: 1.12,
        idAlmacen: 1,
      },
      configParams.RUTAIMAGENESARTICULOS
    );
    let order = {};
    console.log(address);
    // console.log(usuario.address.find((dir)=>{
    //   dir.idAddress === formValues.idDireccion
    // }));

    try {
      order = adapterOrderCustomer(formValues);
      order.idCliente = usuario.id;
      order.idDireccion = formValues.idDireccion;
      order.products = orderProducts;
      order.correoCliente = usuario.email;
      order.telefonoCliente = formValues.phone;
      order.direccionCliente = selectedAddress || " - ";
      order.comentarios = formValues.message || "";
      order.impuesto = formValues.impuesto;
      order.total = Number(cartTotalPrice.toFixed(2));
      order.impuesto = Number(
        new Decimal(cartTotalPrice - cartTotalPrice / 1.12).toFixed(2)
      );
      order.documentoLocal = generarCorrelativoFactura();
      order.BAC_HASH = "1";
      order.BAC_MONTO = Number(cartTotalPrice.toFixed(2));
      order.IdUsuario_Direccion = formValues.idDireccion;
    } catch (error) {
      console.error("Hubo un error durante la validación de datos " + error);

      showToast(
        "Hubo un error durante la validación de datos",
        "warn",
        "top-center"
      );
      setLoadingOrder(false);
    }

    console.log(order);

    try {
      setLoadingOrder(true);
      const url = `${API_URL}/api/v1/invoices`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const jsonResponse = await response.json(); // Primero obtener la respuesta y luego verificar el estado

      if (!response.ok) {
        const { message } = jsonResponse;
        console.log(message);
        throw new Error(message || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }

      const { data, message } = jsonResponse;
      if (message === "success") {
        handleAlert();
        dispatch(deleteAllFromCart());
        return;
      }
    } catch (error) {
      console.error("Hubo un error durante la validación de datos");
      showToast(
        "Hubo un error durante la validación de datos",
        "warn",
        "top-center"
      );
    } finally {
      setLoadingOrder(false);
    }
    setLoadingOrder(false);
  };

  const handleClose = () => setShow(false);
  const MySwal = withReactContent(Swal);

  const handleAlert = () => {
    MySwal.fire({
      position: "center",
      icon: "success",
      title: "Su Pedido ha sido enviado, nos pondremos en contacto con usted",
      showConfirmButton: true,
      timer: 2500,
      customClass: {
        confirmButton: "button-active-hs btn-black fw-bold mt-1 px-4 py-2",
      },
    });
  };

  const handleAlertSaleOut = (title, message) => {
    MySwal.fire({
      position: "center",
      icon: "warning",
      title: title,
      body: message,
      showConfirmButton: true,
      timer: 2500,
      customClass: {
        confirmButton: "button-active-hs btn-black fw-bold mt-1 px-4 py-2",
      },
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
                <div className="col-lg-6  col-md-12">
                  <div className="billing-info-wrap mb-30">
                    <FormLogin
                      setFormValues={setFormValues}
                      style={style}
                      inputRef={inputRef}
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
                          loading={loading}
                          error={error}
                          style={style}
                        />
                      </div>
                      <div className="mt-5">
                        <h3>Datos de Entrega</h3>
                        <hr />
                      </div>
                      <FormDireccionEntrega
                        country={country}
                        setFormValues={setFormValues}
                        formValues={formValues}
                        handleChange={handleChange}
                        errorsValidate={errorsValidate}
                        setShowAddressNew={setShowAddressNew}
                        showAddressNew={showAddressNew}
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
                      <div className="col-lg-12 ">
                        {/* <CreditCardForm handleSubmitPayment={handleSendOrder} /> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-1"></div>
                <div className="col-lg-5 ">
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

export default Checkout;
