import { API_URL } from "../config";
import { setLoading, setError } from "../store/slices/loading-slice";
import {
  login,
  setUsuario,
  userAddress,
  userToken,
} from "../store/slices/usuario-slice";
import cogoToast from "cogo-toast";
import {
  adapterAddressesUser,
  adapterLoginUser,
  adapterUsuario,
} from "../adapters/usuario";
import { adapterMessage } from "../adapters/message";

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
      cogoToast.success("Bienvenido: " + usuario.name, {
        position: "top-center",
      });
    } catch (error) {
      cogoToast.warn(`${error.message}`, {
        position: "bottom-left",
      });
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
      const hide = cogoToast.success("Bienvenido: " + usuario.name, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
    } catch (error) {
      cogoToast.warn(`${error.message}`, {
        position: "bottom-left",
      });
    } finally {
      dispatch(setLoading(false));
    }
  };

export const fetchResetPassword = (userData) => {
  return async (dispatch) => {
    if (!userData || Object.keys(userData).length === 0) {
      cogoToast.warn("Los datos del usuario son requeridos", {
        position: "bottom-left",
      });
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

  

      cogoToast.success(
        `Bienvenido: ${data?.respuesta?.Respuesta || "Usuario"}`,
        {
          position: "top-center",
          onClick: (toast) => toast.hide(),
        }
      );
    } catch (error) {
      cogoToast.warn(error.message, { position: "bottom-left" });
    } finally {
      dispatch(setLoading(false));
    }
  };
};
