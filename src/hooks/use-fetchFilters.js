import { API_URL } from "../config";
import { setMenu, setError } from "../store/slices/menu-slice";
import { setLoading } from "../store/slices/loading-slice";
import { showToast } from "../toast/toastManager";
import { adapterFilterData } from "../adapters/filterData";

export const fetchFilters = () => async (dispatch) => {

  const url = `${API_URL}/api/v1/categories/filters`;
  try {
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const { data } = await response.json();
    const menu = adapterFilterData(data);
    dispatch(setMenu(menu));
  } catch (error) {
    dispatch(setError(error.message));

    showToast(`Error: ${error.message}`, "error", "bottom-left");
  } finally {
    dispatch(setLoading(false));
  }
};
