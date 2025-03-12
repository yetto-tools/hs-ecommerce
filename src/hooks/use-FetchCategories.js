import { setProducts } from "../store/slices/products-slices";
import cogoToast from "cogo-toast";


const API_URL = "https://apihs.yettotools.com";
export const fetchProducts =
  (level1 = 0, level2 = 0, level3 = 0) =>
  async (dispatch) => {
    const url = `${API_URL}/api/articulos/${level1}/${level2}/${level3}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        cogoToast.error(`Error: ${response.status}`, {
          position: "bottom-left",
        });
        throw new Error(`${response.status}`);
      }
      const data = await response.json();
      dispatch(setProducts(data.data.articulos)); // Aquí actualizas el estado global
    } catch (error) {
      cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
    }
  };

export default fetchProducts;
