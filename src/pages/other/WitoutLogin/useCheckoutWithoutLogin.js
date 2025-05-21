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
import { API_URL } from "../../../config";
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
      showToast("warn", "Ingresar un nombre");
      return false;
    }
    if (!formValues.telefono) {
      showToast("warn", "Ingresar un telefono");
      return false;
    }
    if (!formValues.direccion) {
      showToast("warn", "Ingresar una direccion");
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
      order.BAC_HASH = "1";
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

 const postToCredomatic = (data) => {
  // Crea el formulario
  const form = document.createElement("form");
  form.method = "POST";
  form.action = "https://credomatic.compassmerchantsolutions.com/api/transact.php";

  // Por seguridad
  form.style.display = "none";

  // Llena el formulario con inputs hidden
  for (const [key, value] of Object.entries(data)) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = key;
    input.value = value;
    form.appendChild(input);
  }

  // Añadir al DOM y enviar
  document.body.appendChild(form);
  form.submit();
};



  return {
    cartTotalPrice,
    calculateTotalCart,
    validarDatosFormulario,
    handleSendOrder,
    handleAlertSaleOut,
    loadingOrder,
    setLoadingOrder,
    postToCredomatic
  };
};
