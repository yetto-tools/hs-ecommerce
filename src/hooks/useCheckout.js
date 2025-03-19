import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchValidaNIT } from "../hooks/use-fetchValidaNIT";
import { validateEmail } from "../helpers/validator";
import { sendPayment } from "../services/paymentService";
import { sendOrder } from "../services/orderService";

export const useCheckout = () => {
  const dispatch = useDispatch();
  const { validacionNit, loading, error } = useSelector((state) => state.validarNit);
  const { cartItems } = useSelector((state) => state.cart);

  const [formValues, setFormValues] = useState({
    nitCliente: "",
    nameCliente: "",
    email: "",
    direccionFacturacion: "",
    direccionEnvio: "",
    telefono: "",
  });

  const [errors, setErrors] = useState({});
  const [transactionResponse, setTransactionResponse] = useState(null);

  // 🔹 Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));

    if (name === "email" && !validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: true }));
    }
  };

  // 🔹 Validar NIT
  const handleCheckNit = () => {
    if (!formValues.nitCliente.trim()) {
      setErrors((prev) => ({ ...prev, nitCliente: true }));
      return;
    }
    dispatch(fetchValidaNIT(formValues.nitCliente));
  };

  // 🔹 Auto completar datos con NIT validado
  useEffect(() => {
    if (validacionNit) {
      setFormValues((prev) => ({
        ...prev,
        nameCliente: validacionNit.Nombre || "",
        nitCliente: validacionNit.Nit || "",
      }));
    }
  }, [validacionNit]);

  // 🔹 Validar formulario antes de enviar
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formValues.nitCliente.trim()) {
      formErrors.nitCliente = true;
      isValid = false;
    }
    if (!formValues.email.trim() || !validateEmail(formValues.email)) {
      formErrors.email = true;
      isValid = false;
    }
    if (!formValues.direccionFacturacion.trim()) {
      formErrors.direccionFacturacion = true;
      isValid = false;
    }
    if (!formValues.direccionEnvio.trim()) {
      formErrors.direccionEnvio = true;
      isValid = false;
    }
    if (!formValues.telefono.trim()) {
      formErrors.telefono = true;
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // 🔹 1️⃣ Enviar transacción a Credomatic
  const handleSendTransaction = () => {
    if (!validateForm()) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    handleCheckNit(); // Validar NIT nuevamente

    if (error) {
      alert("El NIT ingresado no es válido.");
      return;
    }

    sendPayment(formValues, cartItems);
  };

  // 🔹 2️⃣ Obtener respuesta de Credomatic
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("BACResponse")) {
      setTransactionResponse({
        orderId: urlParams.get("orderid"),
        transactionId: urlParams.get("BACTransactionID"),
        response: urlParams.get("BACResponse"),
      });
    }
  }, []);

  // 🔹 3️⃣ Enviar datos finales al backend
  const handleSendOrder = async () => {
    if (!transactionResponse) {
      alert("No se ha recibido una respuesta de pago.");
      return;
    }

    await sendOrder(formValues, cartItems, transactionResponse);
  };

  return {
    formValues,
    errors,
    handleChange,
    handleCheckNit,
    handleSendTransaction,
    handleSendOrder,
    transactionResponse,
  };
};
