import { API_URL } from "../config";
import { setMenu, setError } from "../store/slices/menu-slice";
import { setLoading } from "../store/slices/loading-slice";
import { adapterMenu } from "../adapters/menu";
import cogoToast from "cogo-toast";

export const fetchMenu = () => async (dispatch) => {
  const url = `${API_URL}/api/v1/menu`;
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
    const menu = adapterMenu(data);
    dispatch(setMenu(menu));
  } catch (error) {
    dispatch(setError(error.message));
    cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
  } finally {
    dispatch(setLoading(false));
  }
};
