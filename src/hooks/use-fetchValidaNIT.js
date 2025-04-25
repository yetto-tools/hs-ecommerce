import { API_NIT } from "../config";

import {
  setLoading,
  setValidacionNit,
  setError,
} from "../store/slices/validaNit-slice";
import { showToast } from "../toast/toastManager";

export const fetchValidaNIT = (nit) => async (dispatch) => {
  const url = `${
    API_NIT || "https://api.hypestreet.dssolutionsgt.com"
  }/api/Validar/validar-nit`;
  try {
    const body = {
      tokenCliente: "5NWyDcVJ76Fqv99",
      origen: "1",
      nit: nit,
    };
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`); // Usar mensaje de la respuesta si está disponible
    }

    const data = await response.json(); // Primero obtener la respuesta y luego verificar el estado

    const {
      Encabezado: [Encabezado],
    } = data;
    if (!Encabezado) {
      dispatch(setError(true));
      throw new Error("Error al validar NIT");
    }

    if (Encabezado.Respuesta === "False") {
      dispatch(setError(true));
      throw new Error(Encabezado.Descripcion);
    }

    if (Encabezado.Descripcion.includes("[CF]")) {
      const regex = /\[(.+?)\]/g;
      const Nombre = [...Encabezado.Descripcion.matchAll(regex)]
        .map((m) => m[1])
        .toString();
      const Nit = Nombre.split(",")[0];
      const Nombre_Comercial = Nombre;
      dispatch(setValidacionNit({ Nit, Nombre, Nombre_Comercial }));
    } else {
      const {
        Detalle: [Detalle],
      } = data;

      dispatch(setValidacionNit(Detalle));
    }

    showToast(Encabezado.Descripcion, "success", "top-center");
    dispatch(setError(false));
  } catch (error) {
    dispatch(setError(true));

    showToast(`${error.message}`, "error", "top-center");
  } finally {
    dispatch(setLoading(false));
  }
};
