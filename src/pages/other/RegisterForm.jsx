import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchRegister } from "../../hooks/use-FetchUsuario";

const RegisterForm = ({ showRegister, setShowRegister }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const { usuario } = useSelector((state) => state.usuario);

  const [registerData, setRegisterData] = useState({
    idUsuario: 0,
    usuario: "",
    nombre: "",
    correo: "",
    clave: "",
    telefono: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
      ...(name === "correo" && { usuario: value.split("@")[0] }), // sincroniza también el usuario
    }));
  };

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await dispatch(fetchRegister(registerData));
    setShowRegister(false);
  };

  return (
    <form onSubmit={handleSubmitRegister}>
      <input type="hidden" name="idUsuario" value={registerData.idUsuario} />
      <div className="row mb-20">
        <div className="col-md-6">
          <label>{t("page_login_register.name")}</label>
          <input
            className="form-control"
            type="text"
            name="nombre"
            onChange={handleChange}
            required
            value={registerData.nombre}
          />
        </div>
        <div className="col-md-6">
          <label>{t("page_login_register.email")}</label>
          <input
            type="email"
            name="correo"
            onChange={handleChange}
            required
            value={registerData.correo}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-20 hidden">
        <div className="col-md-6">
          <label>{t("page_login_register.username")}</label>
          <input
            className="form-control"
            type="text"
            name="usuario"
            onChange={handleChange}
            required
            value={registerData.usuario}
            readOnly={true}
          />
        </div>
      </div>
      <div className="row mb-20">
        <div className="col-md-6">
          <label>{t("page_login_register.password")}</label>
          <input
            type="password"
            name="clave"
            onChange={handleChange}
            required
            value={registerData.clave}
            className="form-control"
          />
        </div>
        <div className="col-md-6">
          <label>{t("page_login_register.phone")}</label>
          <input
            type="tel"
            name="telefono"
            onChange={handleChange}
            required
            value={registerData.telefono}
            className="form-control"
          />
        </div>
      </div>
      <div className="row mb-20 mt-40 pt-5">
        <div className="col-md-12">
          <div className="button-box">
            <button
              type="submit"
              className="button-active-hs btn-black w-100 d-flex justify-content-center align-items-center gap-2 py-2"
            >
              {t("page_login_register.register")}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
