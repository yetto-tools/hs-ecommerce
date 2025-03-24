import cogoToast from "cogo-toast";
import { API_URL } from "../config";
import { setLoading, setError } from "../store/slices/loading-slice";
import { adapterMessage } from "../adapters/message";
import { setOrder } from "../store/slices/order-slice";

export const fetchOrder =
  (data, enableLoading = true) =>
  async (dispatch) => {
    const url = `${API_URL}/api/v1/users/register`;
    try {
      dispatch(setLoading(enableLoading));
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado
      const { message: mensaje } = adapterMessage(message);
      dispatch(setOrder(data));
      if (!response.ok) {
        throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }
    } catch (error) {
      dispatch(setError(error.message));
      cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
    } finally {
      dispatch(setLoading(false));
    }
  };
