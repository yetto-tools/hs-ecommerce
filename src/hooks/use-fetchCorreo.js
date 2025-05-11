import { setError, setLoading } from "../store/slices/emailSend-slice";
import { API_URL } from "../config";
import { showToast } from "../toast/toastManager";

export const fetchCorreo =
  ({ tipo, datos, loading = true }) =>
  async (dispatch, getState) => {
    const url = `${API_URL}/api/v1/contact`;
    let bodyContent = {};

    switch (tipo) {
      case "pedido":
        bodyContent = {
          name: datos.name,
          email: datos.email,
          subject: "Pedido",
          message: `Pedido con el siguiente detalle: ${JSON.stringify(
            datos.pedido
          )}`,
        };
        break;
      case "contacto":
      default:
        bodyContent = {
          name: datos.name,
          email: datos.email,
          subject: "Contacto",
          message: datos.message,
        };
        break;
    }

    try {
      dispatch(setLoading(loading));
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bodyContent),
      });

      const responseJson = await response.json();
      const { message } = responseJson;

      if (!response.ok) {
        throw new Error(`Error: ${message || response.status}`);
      }

      return message || "Mensaje enviado exitosamente.";
    } catch (error) {
      dispatch(setError(error.message));

      showToast(`${error.message}`, "error", "bottom-left");
      return null;
    } finally {
      dispatch(setLoading(false));
    }
  };
