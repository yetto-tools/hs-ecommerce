import { API_URL } from "../config";
import { setLoading, setError } from "../store/slices/loading-slice";
import { login, setUsuario, userAddress, userToken } from "../store/slices/usuario-slice";
import cogoToast from "cogo-toast";
import {
  adapterAddressesUser,
  adapterLoginUser,
  adapterUsuario,
} from "../adapters/usuario";
import { adapterMessage } from "../adapters/message";

export const fetchLogin = (userData) => async (dispatch) => {
  const url = `${API_URL}/api/v1/users/login`;
  try {
    const body = adapterLoginUser(userData); // Asumimos que esta función prepara los datos correctamente
    dispatch(setLoading(true));
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
