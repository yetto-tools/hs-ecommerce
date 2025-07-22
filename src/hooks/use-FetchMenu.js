import { API_URL } from "../config";
import { setMenu, setError } from "../store/slices/menu-slice";
import { setLoading } from "../store/slices/loading-slice";
import { adapterMenu } from "../adapters/menu";
import { showToast } from "../toast/toastManager";

export const fetchMenu = () => async (dispatch, getState) => {
  const { menu } = getState(); // Ajusta esto si tu estado es diferente

  if (menu?.menu?.length > 0) {
    return; // Ya tienes los datos del artículo
  }

  const url = `${API_URL}/api/v1/menu`;
  try {
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    // {code: 500, data: [], : "aborted"}
    if(response.status === 500 && response.statusText === "aborted") return;


    if (!response.ok) { 
      throw new Error(`Error: ${response.status}`);
    }
    const { data } = await response.json();
    const menu = adapterMenu(data);
    dispatch(setMenu(menu));
  } catch (error) {
    dispatch(setError(error.message));

    showToast(`Error: ${error.message}`, "error", "bottom-left");
  } finally {
    dispatch(setLoading(false));
  }
};
