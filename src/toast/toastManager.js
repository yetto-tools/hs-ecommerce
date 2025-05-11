// toastManager.js
let showToastCallback = null;

export const setShowToast = (callback) => {
  showToastCallback = callback;
};

export const showToast = (
  message,
  type = "info",
  position = "top-right",
  duration = 3000
) => {
  if (showToastCallback) {
    showToastCallback(message, type, position, duration);
  } else {
    console.warn("Toast system not initialized yet.");
  }
};
