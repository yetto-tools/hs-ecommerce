import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { cleanCartOrder } from "../../store/slices/cartOrder-slice";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { setLoading } from "../../store/slices/articleDetail-slice";
import { API_URL_BAC, DB_ENV } from "../../config";

const MySwal = withReactContent(Swal);

const useSendPaymentData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sendPaymentData = async (data) => {
    if (!data?.UIdCarrito || !data?.documentoLocal) return;

    MySwal.fire({
      title: "Procesando pago...",
      text: "Por favor espere mientras se valida la transacción.",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    });

    dispatch(setLoading(true));

    try {
      const res = await fetch(`${API_URL_BAC}/api/Cart?env=${DB_ENV}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      const resultado = resData?.meta?.[0]?.Resultado ?? resData?.Resultado;
      const mensaje = resData?.meta?.[0]?.Mensaje ?? resData?.Mensaje ?? "Error desconocido";
      const detalle = resData?.Detalle || resData?.detalle;
      let detalleMensaje = "";

      if (detalle) {
        try {
          const parsed = typeof detalle === "string" ? JSON.parse(detalle) : detalle;
          detalleMensaje = parsed?.message || "";
        } catch {
          detalleMensaje = typeof detalle === "string" ? detalle : "";
        }
      }

      if (!res.ok || resultado > 1) {
        return MySwal.fire({
          title: resultado === 2 ? "⚠ Pago duplicado" : `❌ Error ${res.status}`,
          html: `<p>${mensaje}</p>${detalleMensaje ? `<p><b>Detalle:</b> ${detalleMensaje}</p>` : ""}`,
          icon: resultado === 2 ? "info" : "error",
          confirmButtonText: "Volver al checkout",
        }).then(() => {
          navigate("/checkout");
        });
      }

      return MySwal.fire({
        title: "✅ Pago procesado",
        text: "La orden fue enviada correctamente a facturación.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        dispatch(cleanCartOrder());
        dispatch(deleteAllFromCart());
        sessionStorage.removeItem("cartOrder");
      });

    } catch (err) {
      console.error("❌ Error al enviar pago:", err);
      MySwal.fire({
        title: "❌ Error de conexión",
        text: "No se pudo conectar con el servidor.",
        icon: "error",
        confirmButtonText: "Volver al checkout",
      }).then(() => navigate("/checkout"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return sendPaymentData;
};

export default useSendPaymentData;
