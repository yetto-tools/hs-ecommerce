import cogoToast from "cogo-toast";
import { adapterProductDetail } from "../adapters/products";
import { adapterArticleDetail } from "../adapters/articles";

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
      cogoToast.error(`Error: ${response.status}`, { position: "bottom-left" });
      throw new Error(`Error: ${response.status}`);
    }
    const { data } = await response.json();
    const { articulos, tallas, colores, marcas, etiquetas } = data;
    const processedData = articulos.map(item => adapterArticleDetail(item, tallas, colores, marcas, etiquetas));
    console.log(processedData);

    return processedData;
  } catch (error) {
    cogoToast.error(`Error: ${error}`);
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

// export const fetchProducts = async (pageNumber = 1, pageSize = 5) => {
//   const host = "https://apihs.yettotools.com";
//   const version = "v1";
//   console.log(host);
//   const url = `${host}/api/${version}/products`;
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ pPageNumber: pageNumber, pPageSize: pageSize }),
//   };

//   try {
//     const response = await fetch(url, requestOptions);
//     if (!response.ok) {
//       cogoToast.error(`Error: ${response.status}`, { position: "bottom-left" });
//       throw new Error(`Error: ${response.status}`);
//     }
//     const data = await response.json();

//     // Convertir y procesar los datos
//     const processedData = data.DataResult.map((product) => {
//       product.variation = product.variation
//         ? JSON.parse(product.variation)
//         : null;
//       product.category = product.category ? JSON.parse(product.category) : null;
//       product.tag = product.tag ? JSON.parse(product.tag) : null;
//       product.image = product.image ? JSON.parse(product.image) : null;
//       return product;
//     });

//     return processedData;
//   } catch (error) {
//     cogoToast.error(`Error: ${error}`);
//     throw error;
//   }
// };

// import cogoToast from "cogo-toast";

// export const fetchProducts = async () => {
//   const url = `${window.origin}/api/Product/list.json`; // URL del JSON estático

//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       cogoToast.error(`Error: ${response.status}`, { position: "bottom-left" });
//       throw new Error(`Error: ${response.status}`);
//     }
//     const data = await response.json();

//     console.log(data);

//     // Convertir y procesar los datos
//     const processedData = data;

//     return processedData;
//   } catch (error) {
//     cogoToast.error(`Error: ${error}`, { position: "bottom-left" });
//     throw error;
//   }
// };
