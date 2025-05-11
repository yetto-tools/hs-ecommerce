// useDebounce.js
import { useRef, useEffect } from "react";

const useDebounce = (callback, delay) => {
  const timerRef = useRef(null);

  const debouncedFunction = (...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  // Limpia el timer al desmontar el componente
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return debouncedFunction;
};

export default useDebounce;
