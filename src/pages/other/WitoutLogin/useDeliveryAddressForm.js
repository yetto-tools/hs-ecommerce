import { useState } from "react";

export const useDeliveryAddressForm = (initialValues) => {
  const [formData, setFormData] = useState(initialValues);

  const [isValid, setIsValid] = useState({
    nombre: true,
    telefono: true,
    direccion: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue;

    if (typeof value === "string" && name === "nitCliente") {
      cleanedValue = value.trim().replace(/-/g, "");
    } else if (
      typeof value === "string" &&
      name !== "message" &&
      name !== "observaciones" &&
      name !== "direccion"
    ) {
      cleanedValue = value.trimStart().replace(/\s+/g, " ");
    } else {
      cleanedValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));

    // Validar campos obligatorios
    if (["nombre", "telefono", "direccion"].includes(name)) {
      setIsValid((prev) => ({
        ...prev,
        [name]: cleanedValue.length > 0,
      }));
    }
  };

  return {
    formData,
    isValid,
    handleChange,
    setFormData,
    setIsValid,
  };
};
