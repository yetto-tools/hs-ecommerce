// use - FetchSocialMedia.jsx;
import { API_URL } from "../config";
import { setSocialMedia } from "../store/slices/socialMedia-slice";

export const useFetchSocialMedia = () => async (dispatch, getState) => {
  const url = `${API_URL}/api/v1/configurations/system-parameters`;
  try {
    dispatch();
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado

    if (!response.ok) {
      throw new Error(message || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
    }

    // Convertir array a objeto { RUTAIMAGENESARTICULOS: "valor", ... }
    const configParamas = data.parametros.reduce((acc, curr) => {
      acc[curr.Nombre] = curr.Valor;
      return acc;
    }, {});
    dispatch(setSocialMedia(configParamas));
  } catch (error) {
    console.log(`${error.message}`, "error", "bottom-left");
  } finally {
    dispatch();
  }
};
