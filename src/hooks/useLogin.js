import { useState } from "react";
import { useDispatch } from "react-redux";
import { fetchLogin } from "../hooks/use-FetchUsuario"; // Ajusta ruta si necesario
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loadingLogin, setLoadingLogin] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);
    try {
      await dispatch(fetchLogin(loginData, false));
      navigate("/"); // Puedes decidir si quieres navegar aquí
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingLogin(false);
    }
  };

  return {
    loginData,
    handleLoginChange,
    handleLoginSubmit,
    loadingLogin,
  };
};
