import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUsuario } from "../../../store/slices/usuario-slice";
import { useTranslation } from "react-i18next";

const AccountInformation = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const usuario = useSelector((state) => state.usuario.usuario);

  const [localUsuario, setLocalUsuario] = useState({
    id: usuario?.id || "",
    user: usuario?.user || "",
    email: usuario?.email || "",
    phone1: usuario?.phone1 || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocalUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(setUsuario({ ...usuario, ...localUsuario }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="myaccount-info-wrapper">
        <div className="account-info-wrapper">
          <h4 className="fw-600">{t("page_my_account.my_account_information")}</h4>
          <h5>{t("page_my_account.my_personal_detail")}</h5>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <input type="hidden" name="IdUsuario" value={usuario?.id} />
            <label>{t("page_my_account.first_name")}</label>
            <input name="name" type="text" maxLength={300} value={usuario?.name} readOnly />
            <label>{t("page_my_account.username")}</label>
            <input name="user" type="text" value={localUsuario.user} onChange={handleInputChange} />
            <label>{t("page_my_account.email_address")}</label>
            <input name="email" type="email" value={localUsuario.email} onChange={handleInputChange} />
            <label>{t("page_my_account.phone")}</label>
            <input name="phone1" type="tel" value={localUsuario.phone1} onChange={handleInputChange} />
          </div>
        </div>
        <div className="billing-btn mt-3">
          <button type="submit">{t("page_my_account.submit")}</button>
        </div>
      </div>
    </form>
  );
};

export default AccountInformation;
