import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchResetPassword } from "../../../hooks/use-FetchUsuario";
import { useTranslation } from "react-i18next";

const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);

  const [resetUsuario, setResetUsuario] = useState({
    tipo: 1,
    usuario: usuario?.usuario || "",
    claveAnterior: "",
    claveNueva: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResetUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchResetPassword(resetUsuario));
    setResetUsuario({ ...resetUsuario, claveAnterior: "", claveNueva: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="myaccount-info-wrapper">
        <div className="account-info-wrapper">
          <h4 className="fw-600">{t("page_my_account.change_password")}</h4>
        </div>
        <input type="hidden" name="tipo" value="1" />
        <label>{t("page_login_register.email")}</label>
        <input type="email" name="usuario" value={resetUsuario.usuario} onChange={handleChange} readOnly />
        <label>{t("page_my_account.password_after")}</label>
        <input type="password" name="claveAnterior" value={resetUsuario.claveAnterior} onChange={handleChange} />
        <label>{t("page_my_account.password_new")}</label>
        <input type="password" name="claveNueva" value={resetUsuario.claveNueva} onChange={handleChange} />
        <div className="billing-btn mt-3">
          <button type="submit">{t("page_my_account.submit")}</button>
        </div>
      </div>
    </form>
  );
};

export default ChangePassword;
