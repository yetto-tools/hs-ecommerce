import { useEffect, useRef } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useDispatch } from "react-redux";
import { cleanCartOrder } from "../../store/slices/cartOrder-slice";
import { deleteAllFromCart } from "../../store/slices/cart-slice";
import { setLoading } from "../../store/slices/articleDetail-slice";
import { API_URL_BAC, DB_ENV } from "../../config";



const MySwal = withReactContent(Swal);

const useSendPaymentData = (data) => {
  const alreadySent = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      alreadySent.current ||
      !data?.UIdCarrito ||
      !data?.documentoLocal
    ) {
      return;
    }

    alreadySent.current = true;
    setLoading(true);
    // https://d0krpbqk-40856.use2.devtunnels.ms
    fetch(`${API_URL_BAC}/api/Cart?env=${DB_ENV}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(async (res) => {
        const status = res.status;
        const resData = await res.json();

        // Extraer valores generales
        const resultado = resData?.meta?.[0]?.Resultado ?? resData?.Resultado;
        const mensaje = resData?.meta?.[0]?.Mensaje ?? resData?.Mensaje ?? "Error desconocido";

        // Detectar mensaje de detalle si viene como string JSON
        let detalleMensaje = "";
        const detalle = resData?.Detalle || resData?.detalle;
        if (detalle) {
          try {
            const parsed = typeof detalle === "string" ? JSON.parse(detalle) : detalle;
            detalleMensaje = parsed?.message || "";
            setLoading(false);
          } catch {
            detalleMensaje = typeof detalle === "string" ? detalle : "";
            setLoading(false);
          }
        }

        // Si el HTTP code indica error
        if (!res.ok) {
          const title = `❌ Error ${status}`;
          const body = `
            <p><b>Mensaje:</b> ${mensaje}</p>
            ${detalleMensaje ? `<p><b>Detalle:</b> ${detalleMensaje}</p>` : ""}
          `;
          MySwal.fire({
            title,
            html: body,
            icon: "error",
            confirmButtonText: "Aceptar",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
          
          return;
        }

        // Si la respuesta es válida (resultado === 1 o 2)
        if (resultado === 1) {
          MySwal.fire({
            title: "✅ Pago procesado",
            text: "La orden fue enviada correctamente a facturación.",
            icon: "success",
            confirmButtonText: "Aceptar",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => {
            dispatch(cleanCartOrder());
            dispatch(deleteAllFromCart());
            sessionStorage.removeItem("cartOrder");
          });
        } else if (resultado === 2) {
          MySwal.fire({
            title: "⚠ Pago duplicado",
            text: mensaje || "Este pago ya fue procesado anteriormente.",
            icon: "info",
            confirmButtonText: "Aceptar",
            allowOutsideClick: false,
            allowEscapeKey: false,
          }).then(() => {
            dispatch(cleanCartOrder());
            sessionStorage.removeItem("cartOrder");
          });
        } else {
          MySwal.fire({
            title: "❌ Error inesperado",
            html: `
              <p>${mensaje}</p>
              ${detalleMensaje ? `<p><b>Detalle:</b> ${detalleMensaje}</p>` : ""}
            `,
            icon: "error",
            confirmButtonText: "Aceptar",
            allowOutsideClick: false,
            allowEscapeKey: false,
          });
        }
      })
      .catch((err) => {
        console.error("❌ Error al enviar pago:", err);
        MySwal.fire({
          title: "❌ Error de conexión",
          text: "No se pudo conectar con el servidor.",
          icon: "error",
          confirmButtonText: "Aceptar",
          allowOutsideClick: false,
          allowEscapeKey: false,
        });
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
      });
      
  }, [data, dispatch]);
};

export default useSendPaymentData;
