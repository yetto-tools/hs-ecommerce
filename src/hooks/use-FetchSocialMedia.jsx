// use - FetchSocialMedia.jsx;
import { API_URL } from "../config";
import { setSocialMedia } from "../store/slices/socialMedia-slice";

export const fetchSocialMedia = () => async (dispatch) => {
  const url = `${API_URL}/api/v1/socialmedia`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const { data, message } = await response.json();

    if (!response.ok) {
      throw new Error(message || `HTTP error! Status: ${response.status}`);
    }

    // ✅ data[0] contiene el array real de objetos
    const socialLinks = Array.isArray(data) && Array.isArray(data[0]) ? data[0] : [];
    
    dispatch(setSocialMedia(socialLinks));
  } catch (error) {
    console.error("❌ Error cargando redes sociales:", error.message);
  }
};
