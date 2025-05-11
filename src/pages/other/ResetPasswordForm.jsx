import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchResetPassword } from "../../hooks/use-FetchUsuario";
import { ChevronLeft } from "lucide-react";

const ResetPasswordForm = ({ onBack }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { usuario } = useSelector((state) => state.usuario);
  const [resetData, setResetData] = useState({
    tipo: 1,
    usuario: usuario?.usuario || "",
    claveAnterior: "",
    claveNueva: "",
  });

  const handleChange = (e) => {
    setResetData({ ...resetData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(fetchResetPassword(resetData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="fw-600 d-flex align-items-center gap-4 mb-2">
        <ChevronLeft size={30} onClick={onBack} style={{ cursor: "pointer" }} />
        {t("page_my_account.change_password")}
      </h4>
      <label>{t("page_login_register.email")}</label>
      <input type="email" name="usuario" value={resetData.usuario} onChange={handleChange} required />

      <label>{t("page_my_account.password_after")}</label>
      <input type="password" name="claveAnterior" value={resetData.claveAnterior} onChange={handleChange} required />

      <label>{t("page_my_account.password_new")}</label>
      <input type="password" name="claveNueva" value={resetData.claveNueva} onChange={handleChange} required />

      <button type="submit">{t("page_my_account.submit")}</button>
    </form>
  );
};

export default ResetPasswordForm;
