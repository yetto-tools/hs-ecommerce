import { API_URL } from "../config";
import { setLoading, setError } from "../store/slices/loading-slice";
import { adapterMessage } from "../adapters/message";
import { setOrder } from "../store/slices/order-slice";
import { showToast } from "../toast/toastManager";

export const fetchOrder =
  (order, enableLoading = true) =>
  async (dispatch) => {
    const url = `${API_URL}/api/v1/invoices`;
    try {
      dispatch(setLoading(enableLoading));
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado
      const { message: mensaje } = adapterMessage(message);

      if (!response.ok) {
        throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }

      dispatch(setOrder(data));
      return data;
    } catch (error) {
      dispatch(setError(error.message));
      showToast(`Error: ${error.message}`, "error", "bottom-left");
    } finally {
      dispatch(setLoading(false));
    }
  };
