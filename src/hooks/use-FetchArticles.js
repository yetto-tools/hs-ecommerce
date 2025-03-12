import cogoToast from "cogo-toast";
import {
  adapterArticles,
  adapterArticleDetail,
  adapterNewArrivals,
  adapterArticle,
  adapterSearchArticles,
} from "../adapters/articles";
import {
  setArticleDetail,
  setError,
} from "../store/slices/articleDetail-slice";
import { setArticles } from "../store/slices/articles-slice";

import { API_URL, API_VERSION } from "../config";
import { setLoading } from "../store/slices/loading-slice";
import { setNewArrivals } from "../store/slices/newArrivals-slice";

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
      dispatch(setArticles(articles));
      
    } else {
      throw new Error(data.message || "Error fetching products");
    }
  } catch (error) {
    dispatch(setError(error.message));
    cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchArticleDetail = (id) => async (dispatch) => {
  const url = `${API_URL}/api/${API_VERSION}/items/${id}`;

  try {
    dispatch(setLoading(true));
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      cogoToast.error(`Error: ${response.status}`, { position: "bottom-left" });
      throw new Error(`Error: ${response.status}`);
    }

    const { data } = await response.json();

    if (response.ok) {
      const article = adapterArticleDetail(data);
      
      dispatch(setArticleDetail(article));
    } else {
      
      throw new Error(data.message || "Error fetching products");
    }

    // Aquí actualizas el estado global
  } catch (error) {
    console.log(error);
    cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchNewArticles = () => async (dispatch) => {
  const url = `${API_URL}/api/${API_VERSION}/items/new-items`;
  
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
      const articles = adapterNewArrivals(data);

      dispatch(setNewArrivals(articles));
    } else {
      throw new Error(data.message || "Error fetching products");
    }
  } catch (error) {
    dispatch(setError(error.message));
    cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSearchArticles = (value) => async (dispatch) => {
  const url = `${API_URL}/api/${API_VERSION}/items/search/${value}`;

  try {
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const { hide } = cogoToast.info(`Sin resultados en la busqueda`, {
        position: "bottom-left",
        onClick: () => {
          hide();
        },
      });
      return;
    }

    const { data, message } = await response.json();
    if (response.ok) {
      const articles = adapterSearchArticles(data);
      console.log(articles);
      dispatch(setArticles(articles));
      const { hide } = cogoToast.success(`Resultados de la busqueda`, {
        position: "bottom-left",
        onClick: () => {
          hide();
        },
      });
    } else {
      throw new Error(message || "Error fetching products");
    }
  } catch (error) {
    console.log(error);
    dispatch(setError(error.message));
    cogoToast.error(`Error: ${error.message}`, { position: "bottom-left" });
  } finally {
    dispatch(setLoading(false));
  }
};
