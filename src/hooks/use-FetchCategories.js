import { setProducts } from "../store/slices/products-slices";
import { showToast } from "../toast/toastManager";

const API_URL = "https://apihs.yettotools.com";
export const fetchProducts =
  (level1 = 0, level2 = 0, level3 = 0) =>
  async (dispatch) => {
    const url = `${API_URL}/api/articulos/${level1}/${level2}/${level3}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      dispatch(setProducts(data.data.articulos)); // Aquí actualizas el estado global
    } catch (error) {
      showToast(`${error.message}`, "error", "bottom-left");
    }
  };

export default fetchProducts;
