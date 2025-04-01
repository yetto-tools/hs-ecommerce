import { useState, useCallback } from "react";
import { API_URL } from "../../config";

const useFetchStock = () => {
  const [stock, setStock] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchStock = useCallback(async (code) => {
    setIsLoading(true);
    try {
      const value = encodeURIComponent(code);
      const response = await fetch(
        `${API_URL}/api/v1/items/stock?value=${value}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setStock(data.stock);
      setError(null);
    } catch (error) {
      console.error("Failed to fetch stock:", error);
      setError(error);
      setStock(0); // Considerar el stock como 0 si la llamada falla
    }
    setIsLoading(false);
  }, []);

  return { stock, isLoading, error, fetchStock };
};

export default useFetchStock;
