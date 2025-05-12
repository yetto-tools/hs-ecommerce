import { useEffect, useState } from "react";
import { CustomerAnonymous } from "../../../adapters/users";

export const useDeliveryAddressForm = () => {
  const [formData, setFormData] = useState(CustomerAnonymous);

  const [isValid, setIsValid] = useState({
    nombre: true,
    telefono: true,
    direccion: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const requiredFields = ["nombre", "telefono", "direccion"];
    const allFilled = requiredFields.every(
      (key) =>
        typeof formData[key] === "string" && formData[key].trim().length > 0
    );
    setIsFormValid(allFilled); // Asegúrate que esto se llama correctamente
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let cleanedValue = value;

    if (typeof value === "string") {
      if (name === "nitCliente") {
        cleanedValue = value.trim().replace(/-/g, "");
      } else if (!["message", "observaciones", "direccion"].includes(name)) {
        cleanedValue = value.trimStart().replace(/\s+/g, " ");
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: cleanedValue,
    }));

    // Validar campos obligatorios
    if (["nombre", "telefono", "direccion"].includes(name)) {
      const isFieldValid =
        typeof cleanedValue === "string" && cleanedValue.trim().length > 0;
      setIsValid((prev) => ({
        ...prev,
        [name]: isFieldValid,
      }));
    }
  };

  return {
    formData,
    isValid,
    isFormValid,
    handleChange,
    setFormData,
    setIsValid,
    setIsFormValid,
  };
};
