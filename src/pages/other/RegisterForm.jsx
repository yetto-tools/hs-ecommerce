import { useState } from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchRegister } from "../../hooks/use-FetchUsuario";

const RegisterForm = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [registerData, setRegisterData] = useState({
    idUsuario: 0,
    usuario: "",
    nombre: "",
    correo: "",
    clave: "",
    telefono: "",
  });

  const handleChange = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchRegister(registerData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="idUsuario" value={registerData.idUsuario} />
      <label>{t("page_login_register.username")}</label>
      <input type="text" name="usuario" onChange={handleChange} required value={registerData.usuario} />

      <label>{t("page_login_register.name")}</label>
      <input type="text" name="nombre" onChange={handleChange} required value={registerData.nombre} />

      <label>{t("page_login_register.email")}</label>
      <input type="email" name="correo" onChange={handleChange} required value={registerData.correo} />

      <label>{t("page_login_register.password")}</label>
      <input type="password" name="clave" onChange={handleChange} required value={registerData.clave} />

      <label>{t("page_login_register.phone")}</label>
      <input type="tel" name="telefono" onChange={handleChange} required value={registerData.telefono} />

      <div className="button-box">
        <button type="submit">{t("page_login_register.register")}</button>
      </div>
    </form>
  );
};

export default RegisterForm;
