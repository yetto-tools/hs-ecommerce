import { API_URL_BAC, DB_ENV } from "../config";
import { setLoading, setError } from "../store/slices/loading-slice";
import { adapterMessage } from "../adapters/message";
import { showToast } from "../toast/toastManager";
import { setcartOrder } from "../store/slices/cartOrder-slice";

export const fetchCartOrder = (order, enableLoading = true) => async (dispatch) => {
  console.log("🔥 dispatching fetchCartOrder", order);
 console.log(API_URL_BAC)
  const url = `${API_URL_BAC}/api/Cart/create?env=${DB_ENV}`;

  try {
    dispatch(setLoading(enableLoading));

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
          
      },
      body: JSON.stringify(order),
    });

    const result = await response.json();
    console.log("📦 API response", result);

    const { data, message } = result;
    const { message: mensaje } = adapterMessage(message);

    if (!response.ok) {
      throw new Error(mensaje || `HTTP error! Status: ${response.status}`);
    }
    let cartOrder = {};
    // Guardar
    if(data){
      if(data.length  >0){
         cartOrder = data[0]
          dispatch(setcartOrder(cartOrder));
        // Guardar
        sessionStorage.setItem('cartOrderId', JSON.stringify(cartOrder));
      }
    }
    
    
    return cartOrder;

  } catch (error) {
    console.error("❌ Error en fetchCartOrder", error);
    dispatch(setError(error.message));
    showToast(`Error: ${error.message}`, "error", "bottom-left");
  } finally {
    dispatch(setLoading(false));
  }
};
