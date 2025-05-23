import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchStock } from "../../../hooks/use-FetchStock";
import {
  adapterOrderCustomer,
  adapterOrderProducts,
} from "../../../adapters/order";
import { generarCorrelativoFactura } from "../../../helpers/validator";
import { showToast } from "../../../toast/toastManager";
import { API_URL, API_URL_BAC, DB_ENV } from "../../../config";
import { deleteAllFromCart } from "../../../store/slices/cart-slice";


export const useCheckoutWithoutLogin = () => {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [readyToCheckout, setReadyToCheckout] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { configParams } = useSelector((state) => state.paramsWeb);
  const dispatch = useDispatch;
  const calculateTotalCart = (items) => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const cartTotalPrice =
    useMemo(() => calculateTotalCart(cartItems), [cartItems]) || 0;

  const totalTaxes = (cartTotalPrice * 0.12).toFixed(2);

  const validarDatosFormulario = (formValues) => {
    if (!formValues.nombre) {
      showToast("Ingresar un nombre"  , "warn");
      return false;
    }
    if (!formValues.correo) {
      showToast("Ingresar un correo", "warn",);
      return false;
    }
    if (!formValues.nitCliente) {
      showToast("Ingresar un nit", "warn");
      return false;
    }
    
    if (!formValues.telefonoCliente && formValues.telefonoCliente?.length <= 7) {
      showToast("Ingresar un telefono", "warn");
      return false;
    }
    if (!formValues.direccion) {
      showToast("Ingresar una direccion", "warn" );
      return false;
    }

    return true;
  };

  const MySwal = withReactContent(Swal);
  const handleAlertSaleOut = (title) => {
    MySwal.fire({
      position: "center",
      icon: "warning",
      title,
      showConfirmButton: true,
      timer: 7000,
      customClass: {
        confirmButton: "button-active-hs btn-black fw-bold mt-1 px-4 py-2",
      },
    });
  };

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

  const handleSendOrder = async (e, formValues, xmlData) => {
    e.preventDefault();
    setLoadingOrder(true);

    // Validar stock
    let allItemsInStock = true;
    setReadyToCheckout(true);
    for (const item of cartItems) {
      const stock = await fetchStock(item.code);
      if (item.quantity > stock) {
        handleAlertSaleOut(
          `No hay suficiente stock para ${item.name} - ${item.size} - ${item.color}.`
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

      order.idCliente = formValues.id;
      order.idDireccion = formValues.idDireccion ?? formValues.idDireccion;
      order.products = orderProducts;
      order.correoCliente = formValues.correo;
      order.telefonoCliente = formValues.telefono;
      order.direccionCliente = formValues.direccion; //formValues.direccionCliente || " - ";
      order.comentarios = xmlData || "-";
      // Aquí se calculan total e impuesto (asegúrate de definir cartTotalPrice y otros cálculos)
      order.total = cartTotalPrice; //Number(cartTotalPrice.toFixed(2));
      order.impuesto = totalTaxes; // Number(new Decimal(totalTaxes).toFixed(2));
      order.documentoLocal = generarCorrelativoFactura();
      order.BAC_HASH = null;
      order.BAC_MONTO = cartTotalPrice; // Ejemplo: Number(cartTotalPrice.toFixed(2));
      order.IdUsuario_Direccion = 999999;
      //formValues.idDireccion ?? formValues.idDireccion;

      console.log("order", order);
      setLoadingOrder(false);
    } catch (error) {
      console.error("Error durante la validación de datos: " + error);

      showToast(`${error.message}`, "error", "bottom-left");
      setLoadingOrder(false);
    }

    try {
      setLoadingOrder(true);
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
        // Limpiar el carrito solo en productivo
        // dispatch(deleteAllFromCart());
        return;
      }
    } catch (error) {
      console.error("Error al enviar la orden: " + error);

      showToast(`${error.message}`, "error", "bottom-left");
    } finally {
      setLoadingOrder(false);
    }
  };

  const handleSaveCartToOrder = async (e, formValues, xmlData) => {
    e.preventDefault();
    setLoadingOrder(true);
    const isValid = validarDatosFormulario(formValues)
    if (!isValid) {
      setLoadingOrder(false);
      return;
    }
    // Validar stock
    let allItemsInStock = true;
    setReadyToCheckout(true);
    for (const item of cartItems) {
      const stock = await fetchStock(item.code);
      if (item.quantity > stock) {
        handleAlertSaleOut(
          `No hay suficiente stock para ${item.name} - ${item.size} - ${item.color}.`
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
      const documentoLocal = generarCorrelativoFactura();
      order = adapterOrderCustomer(formValues);

      order.idCliente = formValues.id ?? 999999;
      order.idDireccion = formValues.idDireccion ?? formValues.idDireccion ?? 999999;
      order.products = orderProducts;
      order.correoCliente = formValues.correo;
      order.telefonoCliente = formValues.telefono;
      order.direccionCliente = formValues.direccion; //formValues.direccionCliente || " - ";
      order.comentarios = formValues.comentarios || "-";
      // Aquí se calculan total e impuesto (asegúrate de definir cartTotalPrice y otros cálculos)
      order.total = cartTotalPrice; //Number(cartTotalPrice.toFixed(2));
      order.impuesto = totalTaxes; // Number(new Decimal(totalTaxes).toFixed(2));
      order.documentoLocal = documentoLocal;
      order.BACOrderId = documentoLocal;
      order.BAC_HASH = null;
      order.BAC_MONTO = cartTotalPrice; // Ejemplo: Number(cartTotalPrice.toFixed(2));
      order.IdUsuario_Direccion = 999999;
      //formValues.idDireccion ?? formValues.idDireccion;
      order.xmlData = xmlData ?? ""; 
      setLoadingOrder(false);
    } catch (error) {
      console.error("Error durante la validación de datos: " + error);

      showToast(`${error.message}`, "error", "bottom-left");
      setLoadingOrder(false);
    }
    
    return {order};
  };



 const postToCredomatic = async (UIdCarrito, cardValues) => {
  
    // Crea el formulario https://d0krpbqk-40856.use2.devtunnels.ms
    const url = `${API_URL_BAC}/api/Payment/${UIdCarrito}?env=${DB_ENV}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    const {meta, data} = await response.json();

    if (meta.resultado === 0 ) 
    {
      const { mensaje } = meta;
      console.log(mensaje)
      return     
    }



    let dataFormBac =  {
        type:data.type,
        key_id:data.key_id,
        hash:data.hash,
        time: data.time,
        amount:data.amount,
        tax:data.tax,
        orderid:data.orderid,
        ccnumber:cardValues.ccnumber,
        ccexp:`${cardValues.expiryMonth}${cardValues.expiryYear}`,
        cvv:cardValues.cvv,
        "first_name,last_name":cardValues.name,
        email:cardValues.email,
        phone:cardValues.phone,
        redirect:data.redirect,
        action:data.action,
        avs:data.avs,
    
    }

    



  const form = document.createElement("form");
  form.method = "POST";
  form.action = data.action;

  // Por seguridad
  form.style.display = "none";

  // Llena el formulario con inputs hidden
  for (const [key, value] of Object.entries(dataFormBac)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  // Añadir al DOM y enviar
  document.body.appendChild(form);
  form.submit();
  console.log(dataFormBac)
};

















  return {
    cartTotalPrice,
    calculateTotalCart,
    validarDatosFormulario,
    handleSendOrder,
    handleAlertSaleOut,
    handleSaveCartToOrder,
    loadingOrder,
    setLoadingOrder,
    postToCredomatic
  };
};
