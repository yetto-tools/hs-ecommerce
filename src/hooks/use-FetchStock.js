import cogoToast from "cogo-toast";
import { API_URL } from "../config";

export const fetchStock = async (code) => {
  const value = encodeURIComponent(code);
  try {
    const response = await fetch(
      `${API_URL}/api/v1/items/stock?value=${value}`
    );
    if (!response.ok) {
      throw new Error(
        `La respuesta de la red no es correcta. Estado: ${response.status}`
      );
    }
    const jsonResponse = await response.json();
    if (jsonResponse.code !== 200) {
      throw new Error(
        "No se ha podido recuperar el stock, la API ha devuelto un error: " +
          jsonResponse.message
      );
    }
    return jsonResponse.data.stock; // Acceder directamente al stock dentro de data
  } catch (error) {
    console.error("Fallo en la búsqueda de existencias", error);
    cogoToast.error(`${error.message}`, { position: "bottom-left" });
    return 0; // Considerar el stock como 0 si la llamada falla
  }
};
