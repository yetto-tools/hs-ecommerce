import { API_URL } from "../config";

import { setLoading } from "../store/slices/articleDetail-slice";
import {
  setConfigParams,
  setCountry,
  setParamsWeb,
} from "../store/slices/paramsWeb-slice";
import { adapterMessage } from "../adapters/message";
import { showToast } from "../toast/toastManager";

export const fetchParamsWeb = () => async (dispatch, getState) => {
  const url = `${API_URL}/api/v1/configurations/system-parameters`;
  try {
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado

    const { message: mensaje } = adapterMessage(message);
    if (!response.ok) {
      throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
    }

    dispatch(setParamsWeb(data.parametros));

    // Convertir array a objeto { RUTAIMAGENESARTICULOS: "valor", ... }
    const configParamas = data.parametros.reduce((acc, curr) => {
      acc[curr.Nombre] = curr.Valor;
      return acc;
    }, {});
    dispatch(setConfigParams(configParamas));
  } catch (error) {
    showToast(`${error.message}`, "error", "bottom-left");
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchCountry = () => async (dispatch) => {
  const url = `${API_URL}/api/v1/configurations/purchase-form-catalogs`;
  try {
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado

    const { message: mensaje } = adapterMessage(message);

        // {code: 500, data: [], : "aborted"}
    if(response.status === 500 && response.statusText === "aborted") return;

    if (!response.ok) {
      throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
    }

    dispatch(setCountry(data));
  } catch (error) {
    showToast(`${error.message}`, "error", "bottom-left");
  } finally {
    dispatch(setLoading(false));
  }
};
