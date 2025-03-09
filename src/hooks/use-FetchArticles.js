import cogoToast from "cogo-toast";
import { adapterArticles, adapterArticleDetail } from "../adapters/articles";
import { setArticleDetail, setLoading, setError } from "../store/slices/articleDetail-slice";

import { API_URL, API_VERSION } from "../config";

export const fetchArticles = (n1, n2, n3) => async (dispatch) => {
 
  const url = `${API_URL}/api/${API_VERSION}/items/menu?idFirstLevel=${n1}&idSecondLevel=${n2}&idThirdLevel=${n3}`;

  try {

    dispatch(setLoading(true));
    
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      cogoToast.error(`Error: ${response.status}`, { position: "bottom-left" });
      throw new Error(`Error: ${response.status}`);
    }

    const { data } = await response.json();


    if (response.ok) {
        const articles = adapterArticles(data);
        dispatch(setArticleDetail(articles));
        console.log(articles);
    } else {
      throw new Error(data.message || "Error fetching products");
    }
    
  } catch (error) {
    dispatch(setError(error.message));
    cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
  }
  finally {
    dispatch(setLoading(false));
  }
};


export const fetchArticleDetail = (id) => async (dispatch) => {

  const url = `${API_URL}/api/${API_VERSION}/items/${id}`;
  
  try {
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      cogoToast.error(`Error: ${response.status}`, { position: "bottom-left" });
      throw new Error(`Error: ${response.status}`);
    }
    
    const { data } = await response.json();
    
    if (response.ok) {
      if(data.code == 200){

        const { articulo } = data;
        const articleDetail = adapterArticleDetail(articulo);        
        dispatch( { type: "ARTICLE_FETCH_SUCCESS", payload: articleDetail });
      }
      else {
        dispatch({ type: "PRODUCTS_FETCH_ERROR", error: data.message });
      }
      
    } else {
      throw new Error(data.message || "Error fetching products");
    }
    

    


 // Aquí actualizas el estado global
  } catch (error) {
    cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
  }
}
