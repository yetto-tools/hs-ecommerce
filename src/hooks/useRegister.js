import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchRegister } from "../hooks/use-FetchUsuario"; // Ajusta ruta si necesario

export const useRegister = () => {
  const [registerData, setRegisterData] = useState({
    idUsuario: 0,
    usuario: "",
    nombre: "",
    correo: "",
    clave: "",
    telefono: "",
  });
  const [loadingRegister, setLoadingRegister] = useState(false);
  const dispatch = useDispatch();

  const handleRegisterChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoadingRegister(true);
    try {
      await dispatch(fetchRegister(registerData, false));
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingRegister(false);
    }
  };

  return {
    registerData,
    handleRegisterChange,
    handleRegisterSubmit,
    loadingRegister,
  };
};
