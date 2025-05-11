import { API_URL } from "../config";
import { setLoading, setError } from "../store/slices/loading-slice";
import {
  login,
  setUsuario,
  userAddress,
  userToken,
} from "../store/slices/usuario-slice";

import {
  adapterAddressesUser,
  adapterLoginUser,
  adapterNewAdressesUser,
  adapterNewAdressUser,
  adapterUsuario,
} from "../adapters/usuario";
import { adapterMessage } from "../adapters/message";
import { showToast } from "../toast/toastManager";

export const fetchLogin =
  (userData, enableLoading = true) =>
  async (dispatch) => {
    const url = `${API_URL}/api/v1/users/login`;
    try {
      const body = adapterLoginUser(userData); // Asumimos que esta función prepara los datos correctamente
      dispatch(setLoading(enableLoading));
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado
      const { message: mensaje } = adapterMessage(message);
      if (!response.ok) {
        throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }

      const usuario = adapterUsuario(data.usuario);
      const direcciones = adapterAddressesUser(data.direcciones);

      const token = data.token;
      dispatch(setUsuario({ usuario, direcciones, token }));
      dispatch(login(usuario));
      dispatch(userAddress(direcciones));
      dispatch(userToken(token));

      showToast("Bienvenido: " + usuario.name, "success", "top-center");
    } catch (error) {
      showToast(`${error.message}`, "error", "top-center");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchRegister =
  (userData, enableLoading = true) =>
  async (dispatch) => {
    const url = `${API_URL}/api/v1/users/register`;
    try {
      const body = userData; // Asumimos que esta función prepara los datos correctamente
      dispatch(setLoading(enableLoading));
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado
      const { message: mensaje } = adapterMessage(message);
      if (!response.ok) {
        throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }

      const usuario = adapterUsuario(data.usuario);
      const direcciones = adapterAddressesUser(data.direcciones);

      const token = data.token;
      dispatch(setUsuario({ usuario, direcciones, token }));
      dispatch(login(usuario));
      dispatch(userAddress(direcciones));
      dispatch(userToken(token));
      showToast("Bienvenido: " + usuario.name, "success", "top-center");
    } catch (error) {
      showToast(`${error.message}`, "error", "top-center");
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchResetPassword = (userData) => {
  return async (dispatch) => {
    if (!userData || Object.keys(userData).length === 0) {
      showToast("Los datos del usuario son requeridos", "warn", "top-left");
      return;
    }

    const url = `${API_URL}/api/v1/users/resetPasswordToken`;

    try {
      dispatch(setLoading(true));

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const { data, message } = await response.json(); // Primero obtener la respuesta y luego verificar el estado
      const { message: mensaje } = adapterMessage(message);
      if (!response.ok) {
        throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }

      let jsonResponse;
      try {
        jsonResponse = await response.json();
      } catch {
        throw new Error("La respuesta del servidor no es un JSON válido.");
      }

      showToast(
        `Bienvenido: ${data?.respuesta?.Respuesta || "Usuario"}`,
        "success",
        "top-center"
      );
    } catch (error) {
      showToast(`${error.message}`, "error", "bottom-left");
    } finally {
      dispatch(setLoading(false));
    }
  };
};

export const fetchNewAdressUser = (
  idUser,
  newAddressData,
  enableLoading = false
) => {
  return async (dispatch) => {
    dispatch(setLoading(enableLoading));
    let isSuccess = false;
    if (!idUser) {
      showToast("Los datos del usuario son requeridos", "warn", "top-left");
      return;
    }

    const url = `${API_URL}/api/v1/addresses/new-address`;
    newAddressData.observaciones = newAddressData.observaciones || "--";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAddressData),
      });

      const responseJson = await response.json(); // Primero obtener la respuesta y luego verificar el estado
      const { data, message } = responseJson; // Primero obtener la respuesta y luego verificar el estado
      const { message: mensaje } = adapterMessage(message);
      if (!response.ok) {
        throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }

      const { direcciones } = data;

      console.log(direcciones);
      const addresses = adapterNewAdressesUser(direcciones);
      dispatch(userAddress(addresses));
      console.log(addresses);

      showToast("Dirección guardada correctamente", "success", "top-center");
      isSuccess = true;
    } catch (error) {
      showToast(`${error.message}`, "error", "bottom-left");
    } finally {
      dispatch(setLoading(false));
      return isSuccess;
    }
  };
};

export const fetchAdressUser = (usuario, enableLoading = false) => {
  return async (dispatch) => {
    dispatch(setLoading(enableLoading));

    if (!usuario?.id) {
      showToast("Los datos del usuario son requeridos", "warn", "bottom-left");
      return;
    }

    const url = `${API_URL}/api/v1/user/${usuario.id}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseJson = await response.json(); // Primero obtener la respuesta y luego verificar el estado
      const { data, message } = responseJson; // Primero obtener la respuesta y luego verificar el estado
      const { message: mensaje } = adapterMessage(message);
      if (!response.ok) {
        throw new Error(mensaje || `HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
      }

      responseJson.data = adapterAddressesUser(responseJson.data);
      dispatch(userAddress(responseJson.data));

      showToast("Direcciones cargadas correctamente", "success", "top-center");
    } catch (error) {
      showToast(`${error.message}`, "error", "bottom-left");
    } finally {
      dispatch(setLoading(false));
    }
  };
};
