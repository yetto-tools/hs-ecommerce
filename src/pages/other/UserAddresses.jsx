import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const UserAddresses = () => {
  const { t } = useTranslation();
  const direcciones = useSelector((state) => state.usuario.address);
  const { country } = useSelector((state) => state.paramsWeb);

  return (
    <div className="myaccount-info-wrapper">
      <div className="account-info-wrapper">
        <h4 className="fw-600">{t("page_my_account.address_entry")}</h4>
      </div>
      {direcciones?.map((direccion, index) => (
        <div className="entries-wrapper" key={index}>
          <div className="row">
            <div className="col-lg-6">
              <div className="billing-info">
                <label>{t("page_my_account.address_name")}</label>
                <input type="text" value={direccion.name} readOnly />
                <label>{t("page_my_account.address_street")}</label>
                <input type="text" value={direccion.address} readOnly />
                <label>{t("page_my_account.address_country")}</label>
                <input type="text" value={direccion.countryName || ""} readOnly />
                <label>{t("page_my_account.address_city")}</label>
                <input type="text" value={direccion.cityName || ""} readOnly />
                <label>{t("page_my_account.address_phone")}</label>
                <input type="tel" value={direccion.phone} readOnly />
                <label>{t("page_my_account.address_comment")}</label>
                <textarea value={direccion.comment} rows={3} readOnly />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserAddresses;
