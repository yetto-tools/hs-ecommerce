// useBacCheckoutLogic.js
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Decimal from "decimal.js";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { fetchValidaNIT } from "./use-fetchValidaNIT";
import { API_URL } from "../config";
import { generarCorrelativoFactura, generarHash } from "../helpers/validator";
import { adapterOrderCustomer, adapterOrderProducts } from "../adapters/order";

import { fetchStock } from "./use-FetchStock";
import { deleteAllFromCart } from "../store/slices/cart-slice";
import { setError } from "../store/slices/menu-slice";
import {
  adapterPaymentForm,
  dataPaymentForm,
} from "../adapters/DataPaymentForm";
import { showToast } from "../toast/toastManager";

export function useBacCheckoutLogic() {
  // Estados locales
  const [cardValues, setCardValues] = useState(dataPaymentForm);
  const { configParams } = useSelector((state) => state.paramsWeb);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [readyToCheckout, setReadyToCheckout] = useState(false);
  const [formValues, setFormValues] = useState({
    nitCliente: "",
    nameCliente: "",
    firstName: "",
    lastName: "",
    // Agrega aquí otros campos necesarios (ej. idCliente, idDireccion, phone, etc.)
  });
  const [errorsValidate, setErrorsValidate] = useState(false);
  const [show, setShow] = useState(false);
  const [showAddressNew, setShowAddressNew] = useState(false);
  const inputRef = useRef(null);

  const dispatch = useDispatch();
  const { usuario, address } = useSelector((state) => state.usuario);
  const { validacionNit, loading, error } = useSelector(
    (state) => state.validarNit
  );
  const { cartItems } = useSelector((state) => state.cart);
  const [addressSelected, setAddressSelected] = useState(null);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    dispatch(setError(false));
  };

  // Validación del NIT/DPI
  const handleCheckNit = (e) => {
    e.preventDefault();
    const { nitCliente } = formValues;
    if (!nitCliente.trim()) {
      alert("El campo NIT/DPI no puede estar vacío.");
      document.querySelector("#nitCliente")?.click();
      return;
    }
    dispatch(fetchValidaNIT(nitCliente));
  };

  // Auto completar el formulario al recibir la validación
  useEffect(() => {
    if (!usuario) {
      showToast("Debe Iniciar Sesión", "info", "top-center");

      setShow(true);
      return;
    }
    if (validacionNit) {
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
        firstName: firstName,
        lastNameCliente: lastName,
      }));
    }

    inputRef.current?.focus();
  }, [usuario, validacionNit, error]);

  useEffect(() => {
    setAddressSelected(
      address.find(
        (item) => Number(item.idAddress) === Number(formValues.idDireccion)
      )
    );
  }, [address, formValues.idDireccion]);

  // Función para enviar la orden (invoces)
  const handleInvoces = async (e) => {
    e.preventDefault();
    setLoadingOrder(true);

    validarDatosFormulario(e);

    const { address: selectedAddress } = address.find(
      (street) => street.idAddress === Number(formValues.idDireccion)
    );

    // Validar stock
    let allItemsInStock = true;
    setReadyToCheckout(true);
    for (const item of cartItems) {
      const stock = await fetchStock(item.code);
      if (item.quantity > stock) {
        handleAlertSaleOut(
          `No hay suficiente stock para ${item.name}. Disponible: ${stock}`
        );
        allItemsInStock = false;
        setReadyToCheckout(false);
      }
    }
    if (!allItemsInStock) {
      setLoadingOrder(false);
      return;
    }

    // Armar la orden
    const orderProducts = adapterOrderProducts(
      cartItems,
      {
        iva: 1.12,
        idAlmacen: 1,
      },
      configParams.RUTAIMAGENESARTICULOS
    );
    let order = {};
    try {
      order = adapterOrderCustomer(formValues);
      order.idCliente = usuario.id;
      order.idDireccion = formValues.idDireccion;
      order.products = orderProducts;
      order.correoCliente = usuario.email;
      order.telefonoCliente = formValues.phone;
      order.direccionCliente = selectedAddress || " - ";
      order.comentarios = formValues.message || "";
      // Aquí se calculan total e impuesto (asegúrate de definir cartTotalPrice y otros cálculos)
      order.total = cartTotalPrice; // Ejemplo: Number(cartTotalPrice.toFixed(2));
      order.impuesto = Number(new Decimal(0).toFixed(2));
      order.documentoLocal = generarCorrelativoFactura();
      order.BAC_HASH = "1";
      order.BAC_MONTO = cartTotalPrice; // Ejemplo: Number(cartTotalPrice.toFixed(2));
      order.IdUsuario_Direccion = formValues.idDireccion;
    } catch (error) {
      console.error("Error durante la validación de datos: " + error);
      showToast(
        "Error durante la validación de datos",
        "error",
        "bottom-center"
      );
      setLoadingOrder(false);
    }

    // Envío de la orden
    try {
      const url = `${API_URL}/api/v1/invoices`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const jsonResponse = await response.json();
      if (!response.ok) {
        const { message } = jsonResponse;
        throw new Error(message || `HTTP error!`);
      }
      const { message } = jsonResponse;
      if (message === "success") {
        handleAlert();
        dispatch(deleteAllFromCart());
        return;
      }
    } catch (error) {
      console.error("Error al enviar la orden: " + error);
      showToast(`Error al enviar la orden, ${error}`, "error", "bottom-center");
    } finally {
      setLoadingOrder(false);
    }
  };

  // Configuración de alertas con SweetAlert2
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
  const handleAlertSaleOut = (title) => {
    MySwal.fire({
      position: "center",
      icon: "warning",
      title,
      showConfirmButton: true,
      timer: 2500,
      customClass: {
        confirmButton: "button-active-hs btn-black fw-bold mt-1 px-4 py-2",
      },
    });
  };

  // Lógica para el pago (puedes completar según sea necesario)
  const handleBacPayment = (e) => {
    e.preventDefault();
    validarDatosFormulario(e);

    const time = Math.floor(Date.now() / 1000);
    const hashMD5 = generarHash(cartItems.id, cartTotalPrice, time, "14482124");

    const { address: selectedAddress } = address.find(
      (street) => street.idAddress === Number(formValues.idDireccion)
    );

    // Implementa la lógica del pago aquí
    console.log("Pago realizado con BAC");
    console.log(formValues);
    const pago = {
      type: "sale",
      key_id: "14482124",
      hash: hashMD5,
      time: time,
      amount: cartTotalPrice || "0.00",
      tax: totalTaxes || "0.00",
      orderid: generarCorrelativoFactura() || "0",
      processor_id: "",
      "first_name, last_name": cardValues.name,
      phone: formValues.phone,
      email: usuario.email,
      ccnumber: cardValues.ccnumber || "",
      ccexp: `${cardValues.expiryMonth}${cardValues.expiryYear}`,
      cvc: cardValues.cvc || "",
      avs: selectedAddress || "",
      redirect: `${window.location.origin}/confirmacion-pago`,
    };

  };

  const validarDatosFormulario = (e) => {
    e.preventDefault();
    // Validaciones básicas
    if (!formValues.idCliente) {
      showToast("Debe de Iniciar Sesión", "info", "top-center");

      setLoadingOrder(false);
      return;
    }
    if (!formValues.nitCliente) {
      showToast("Debe de Agregar nit / dpi", "info", "top-center");

      document.querySelector("#nit-section > button")?.click();
      setLoadingOrder(false);
      return;
    }
    if (!formValues.nameCliente) {
      showToast("Debe de Agregar nit / dpi para Validar", "info", "top-center");

      document.querySelector("#nit-section > button")?.click();
      setLoadingOrder(false);
      return;
    }
    if (
      !formValues.idDireccion ||
      formValues.idDireccion === "Elegir dirección"
    ) {
      showToast("Falta la direccion", "info", "top-center");
      setLoadingOrder(false);
      return;
    }
    if (cartItems.length === 0) {
      showToast("Debe de Agregar Productos al Carrito", "info", "top-center");
      setLoadingOrder(false);
      return;
    }
    if (!address || address.length === 0) {
      showToast("Falta la direccion", "info", "top-center");
      setLoadingOrder(false);
      return;
    }
    if (!cardValues.name) {
      showToast(
        "Falta el Nombre del Titular de la Tarjeta",
        "info",
        "top-center"
      );
      setLoadingOrder(false);
      return;
    }
    if (!cardValues.ccnumber) {
      showToast("Falta el Número de Tarjeta", "info", "top-center");
      setLoadingOrder(false);
      return;
    }
    if (!cardValues.expiryMonth) {
      showToast("Falta el Mes de Expiración", "info", "top-center");
      setLoadingOrder(false);
      return;
    }
    if (!cardValues.expiryYear) {
      showToast("Falta el Año de Expiración", "info", "top-center");
      setLoadingOrder(false);
      return;
    }
    if (!cardValues.cvc) {
      showToast(
        "Falta el código de verificación de tarjeta",
        "info",
        "top-center"
      );
      setLoadingOrder(false);
      return;
    }
    setLoadingOrder(false);
  };

  const cartTotalPrice = parseFloat(
    cartItems.reduce((total, item) => total + item.quantity * item.price, 0) ||
      0
  ).toFixed(2);

  const totalTaxes = (cartTotalPrice * 0.12).toFixed(2);

  return {
    cardValues,
    setCardValues,
    formValues,
    setFormValues,
    errorsValidate,
    setErrorsValidate,
    show,
    setShow,
    showAddressNew,
    setShowAddressNew,
    inputRef,
    handleChange,
    handleCheckNit,
    handleInvoces,
    handleBacPayment,
    loadingOrder,
    loadingNit: loading,
    addressSelected,
  };
}
