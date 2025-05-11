import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { setShowToast as registerGlobalToast } from "./toastManager";

const ToastContext = createContext();

let idCounter = 0;
const timers = new Map(); // Map global para manejar los timeouts

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((toasts) => toasts.filter((t) => t.id !== id));
    // Limpiar timeout si existe
    const timeoutId = timers.get(id);
    if (timeoutId) {
      clearTimeout(timeoutId);
      timers.delete(id);
    }
  }, []);

  const showToast = useCallback(
    (message, type = "info", position = "top-right", duration = 5000) => {
      setToasts((toasts) => {
        const exists = toasts.some(
          (t) =>
            t.message === message && t.type === type && t.position === position
        );
        if (exists) return toasts;

        const id = idCounter++;
        const timeoutId = setTimeout(() => removeToast(id), duration);
        timers.set(id, timeoutId);

        return [...toasts, { id, message, type, position }];
      });
    },
    [removeToast]
  );

  useEffect(() => {
    registerGlobalToast(showToast);
  }, [showToast]);

  const getIconForType = (type) => {
    switch (type) {
      case "success":
        return "✅";
      case "error":
        return "❌";
      case "info":
        return "ℹ️";
      case "warn":
        return "⚠️";
      default:
        return "🔔";
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {[
        "top-left",
        "top-center",
        "top-right",
        "center",
        "bottom-left",
        "bottom-center",
        "bottom-right",
        "left-center",
        "right-center",
      ].map((position) => (
        <div key={position} className={`yetty-toast-container ${position}`}>
          {toasts
            .filter((toast) => toast.position === position)
            .map((toast) => (
              <div key={toast.id} className={`yetty-toast ${toast.type}`}>
                <span className="yetty-toast-icon">
                  {getIconForType(toast.type)}
                </span>
                <span className="yetty-toast-message">{toast.message}</span>
                <button
                  className="yetty-toast-close"
                  onClick={() => removeToast(toast.id)}
                >
                  &times;
                </button>
              </div>
            ))}
        </div>
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
