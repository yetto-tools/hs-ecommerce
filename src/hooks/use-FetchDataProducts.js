import { adapterArticleDetail } from "../adapters/articles";
import { showToast } from "../toast/toastManager";

export const fetchProductById = async (idProduct) => {
  const host = "https://apihs.yettotools.com";
  const version = "v1";

  const url = `${host}/api/${version}/article/${idProduct}`;
  const requestOptions = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  };

  try {
    const response = await fetch(url, requestOptions);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const { data } = await response.json();
    const { articulos, tallas, colores, marcas, etiquetas } = data;
    const processedData = articulos.map((item) =>
      adapterArticleDetail(item, tallas, colores, marcas, etiquetas)
    );

    return processedData;
  } catch (error) {
    showToast(`Error: ${error}`, "error", "bottom-left");

    throw error;
  }
};

// Dentro de tu archivo de acciones o donde manejes lógica asíncrona
export const fetchProductsByGroupAndGenre =
  (idGroup, idGenre) => async (dispatch) => {
    const host = "https://apihs.yettotools.com";
    const version = "v1";
    let url = `${host}/api/${version}/products`;

    if (idGroup && !idGenre) {
      url += `?group=${idGroup}`;
    } else if (!idGroup && idGenre) {
      url += `?genre=${idGenre}`;
    } else if (idGroup && idGenre) {
      url += `?group=${idGroup}&genre=${idGenre}`;
    }

    try {
      const response = await fetch(url);
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "PRODUCTS_FETCH_SUCCESS", payload: data });
      } else {
        throw new Error(data.message || "Error fetching products");
      }
    } catch (error) {
      dispatch({ type: "PRODUCTS_FETCH_ERROR", error: error.message });
    }
  };
