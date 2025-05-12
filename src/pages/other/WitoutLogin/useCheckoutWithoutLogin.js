import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { fetchStock } from "../../../hooks/use-FetchStock";
import {
  adapterOrderCustomer,
  adapterOrderProducts,
} from "../../../adapters/order";
import { generarCorrelativoFactura } from "../../../helpers/validator";
import { showToast } from "../../../toast/toastManager";

export const useCheckoutWithoutLogin = () => {
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [readyToCheckout, setReadyToCheckout] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);
  const { configParams } = useSelector((state) => state.paramsWeb);
  const [formValues, setFormValues] = useState({
    nitCliente: "",
    nameCliente: "",
    firstName: "",
    lastName: "",
    // Agrega aquí otros campos necesarios (ej. idCliente, idDireccion, phone, etc.)
  });

  const usuario = {
    id: 999999,
    name: "",
    email: "",
    phone: "",
    nit: "",
    direccionCliente: "",
  };

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

  const handleSendOrder = async (e) => {
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

      order.idCliente = usuario.id;
      order.idDireccion = formValues.idDireccion;
      order.products = orderProducts;
      order.correoCliente = usuario.email;
      order.telefonoCliente = formValues.phone;
      order.direccionCliente = usuario.direccionCliente || " - ";
      order.comentarios = formValues.message || "";
      // Aquí se calculan total e impuesto (asegúrate de definir cartTotalPrice y otros cálculos)
      order.total = cartTotalPrice; //Number(cartTotalPrice.toFixed(2));
      order.impuesto = totalTaxes; // Number(new Decimal(totalTaxes).toFixed(2));
      order.documentoLocal = generarCorrelativoFactura();
      order.BAC_HASH = "1";
      order.BAC_MONTO = cartTotalPrice; // Ejemplo: Number(cartTotalPrice.toFixed(2));
      order.IdUsuario_Direccion = formValues.idDireccion;
    } catch (error) {
      console.error("Error durante la validación de datos: " + error);

      showToast(`${error.message}`, "error", "bottom-left");
      setLoadingOrder(false);
    }
  };

  return {
    cartTotalPrice,
    calculateTotalCart,
    validarDatosFormulario,
    handleSendOrder,
    handleAlertSaleOut,
    loadingOrder,
    setLoadingOrder,
  };
};
