import cogoToast from "cogo-toast";
import {
  adapterArticles,
  adapterArticleDetail,
  adapterNewArrivals,
  adapterSearchArticles,
  adapterFilters,
} from "../adapters/articles";
import {
  setArticleDetail,
  setError,
} from "../store/slices/articleDetail-slice";
import { setArticles } from "../store/slices/articles-slice";
import { setFilters } from "../store/slices/filters-slice";

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

    const { data } = await response.json();

    if (!response.ok) {
      const { hide } = cogoToast.info(`Sin resultados en la busqueda`, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
      return;
    }


    
    if (response.ok) {
      const articles = adapterArticles(data);
      dispatch(setArticles(articles));
      const filters = adapterFilters(data);
      dispatch(setFilters(filters));
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
      const { hide } = cogoToast.info(`Sin resultados en la busqueda`, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
      return;
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
      const { hide } = cogoToast.info(`Sin resultados de  Nuevos Productos`, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
      return;
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
  const code =   encodeURIComponent(value.split("/")[0]);  
  console.log(code)
  const url = `${API_URL}/api/${API_VERSION}/items/search?value=${code}`;

  try {
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      const { hide } = cogoToast.info(`Sin resultados en la busqueda`, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
      return;
    }

    const { data, message } = await response.json();
    if (response.ok) {
      const articles = adapterSearchArticles(data);
      dispatch(setArticles(articles));

      const filters = adapterFilters(data);
      dispatch(setFilters(filters));

      const { hide } = cogoToast.success(`Resultados de la busqueda`, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
    } else {
      throw new Error(message || "Error fetching products");
    }
  } catch (error) {
    
    dispatch(setError(error.message));
    cogoToast.error(`Error: ${error.message}`, { position: "top-center", });
  } finally {
    dispatch(setLoading(false));
  }
};



export const fetchFilterAritcle = (value) => async (dispatch) => 
{
  console.log(value)
  const url = `${API_URL}/api/${API_VERSION}/items/filter-items`;
  const body = {xml: value};
  console.log(body)
  try {
    dispatch(setLoading(true));
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const { data, message } = await response.json();
    
    if (!response.ok) {
      const { hide } = cogoToast.info(`Sin resultados en la busqueda`, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
      return;
    }

    
    if (response.ok) {
      const articles = adapterSearchArticles(data);
      dispatch(setArticles(articles));

      const filters = adapterFilters(data);
      dispatch(setFilters(filters));

      const { hide } = cogoToast.success(`Resultados de la busqueda`, {
        position: "top-center",
        onClick: () => {
          hide();
        },
      });
    } else {
      throw new Error(message || "Error fetching products");
    }
  } catch (error) {
    
    dispatch(setError(error.message));
    cogoToast.error(`Error: ${error.message}`, { position: "top-center", });
  } finally {
    dispatch(setLoading(false));
  }
} 
//fetchArticles