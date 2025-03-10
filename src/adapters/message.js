export const adapterMessage = (message) => {
  return {
    message: message === "User not found" ? "Usuario inexistente" : message,
  };
};
