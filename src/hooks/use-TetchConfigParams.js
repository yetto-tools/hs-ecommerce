export const fetchConfigParams = () => async (dispatch, getState) => {
  const url = process.env.PUBLIC_URL + "/config-params.json";

  // Disparamos la acción de solicitud para poder, por ejemplo, mostrar un loader
  dispatch({ type: "FETCH_CONFIG_PARAMS_REQUEST" });

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // Verificamos si la respuesta es exitosa
    if (!response.ok) {
      throw new Error(`Error en la respuesta: ${response.statusText}`);
    }

    const data = await response.json();

    // Disparamos la acción de éxito con los datos obtenidos
    dispatch({ type: "FETCH_CONFIG_PARAMS_SUCCESS", payload: data });
  } catch (error) {
    // Disparamos la acción de error para manejar el fallo
    dispatch({ type: "FETCH_CONFIG_PARAMS_FAILURE", payload: error.message });
  } finally {
    // Aquí puedes realizar acciones adicionales si es necesario,
    // como ocultar un loader o realizar alguna limpieza.
  }
};
