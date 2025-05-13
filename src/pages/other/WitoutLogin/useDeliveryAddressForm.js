import { useEffect, useState } from "react";
import { CustomerAnonymous } from "../../../adapters/users";
import { useSelector } from "react-redux";

export const useDeliveryAddressForm = () => {
  const [formData, setFormData] = useState(CustomerAnonymous);
  const { country } = useSelector((state) => state.paramsWeb);
  const [paisesFiltrados, setPaisesFiltrados] = useState([]);
  const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);
  const [deptosFiltrados, setDeptosFiltrados] = useState([]);
  const [isValid, setIsValid] = useState({
    nombre: true,
    nitCliente: true,
    nameCliente: true,
    telefono: true,
    idPais: true,
    correo: true,
    idDepartamento: true,
    idMunicipio: true,
    direccion: true,
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const excludeFields = ["nitInput", "observaciones"];
    const requiredFields = Object.keys(CustomerAnonymous).filter(
      (key) => !excludeFields.includes(key)
    );

    const allFilled = requiredFields.every((key) => {
      const value = formData[key];
      return (
        value !== undefined && value !== null && value !== "" && value !== "0"
      );
    });
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
    const excludeFields = ["nitInput", "observaciones"];
    const requiredFields = Object.keys(CustomerAnonymous).filter(
      (key) => !excludeFields.includes(key)
    );

    if (requiredFields.includes(name)) {
      const isFieldValid =
        cleanedValue !== null &&
        cleanedValue !== undefined &&
        cleanedValue !== "" &&
        cleanedValue !== "0";

      setIsValid((prev) => ({
        ...prev,
        [name]: isFieldValid,
      }));
    }
  };

  // Filtrar municipios al seleccionar un departamento
  useEffect(() => {
    // Filtrar departamentos por país
    if (formData.idPais && country?.departamentos) {
      const filtrados = country.departamentos.filter(
        (depto) => Number(depto.IdPais) === Number(formData.idPais)
      );
      setDeptosFiltrados(filtrados);
    } else {
      setDeptosFiltrados([]);
    }

    // Filtrar municipios por departamento
    if (formData.idDepartamento && country?.municipios) {
      const filtrados = country.municipios.filter(
        (mun) => Number(mun.IdDepartamento) === Number(formData.idDepartamento)
      );
      setMunicipiosFiltrados(filtrados);
    } else {
      setMunicipiosFiltrados([]);
    }
  }, [formData.idPais, formData.idDepartamento, country]);

  return {
    formData,
    isValid,
    isFormValid,
    country,
    paisesFiltrados,
    deptosFiltrados,
    municipiosFiltrados,
    handleChange,
    setFormData,
    setIsValid,
    setIsFormValid,
  };
};
