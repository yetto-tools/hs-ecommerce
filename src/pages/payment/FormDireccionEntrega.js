

import { Icon, MapPinPlus } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";


export const FormDireccionEntrega = ({
  country,
  formValues,
  handleChange,
  errorsValidate,
}) => {
  const { t } = useTranslation();
  const {address } = useSelector((state) => state.usuario);
  const [showAddressNew, setShowAddressNew] = useState(false);

  return (
    <>
      <div className="col-lg-12 row ">
        <div className="col-lg-9 col-9">
          <div className="billing-info mb-20">
            <label>{t("page_checkout.street_address")}</label>
            <select name="idDireccion" onChange={handleChange} className="form-select">
              <option >{t("page_checkout.select_address")}</option>
              {address &&  address.map((direccion) => (
                <option key={`${direccion.id}-${direccion.name}`} value={direccion.id}>
                  {direccion.name}
                </option>
              ))}
              
            </select>
    
          </div>
        </div>
        <div className="col-lg-2 col-2">
          <label></label>
          <button
            type="button"
            className="button-active-hs btn-black fw-bold mt-1 px-4 py-2"
            onClick={() => {
              showAddressNew ? setShowAddressNew(false) : setShowAddressNew(true);
            }}
          >
            <MapPinPlus />
            </button>
        </div>
      </div>

      {
        showAddressNew && (
          <div className="col-lg-12 col-md-12 mt-2">
            <div className="additional-info-wrap">
              <h4>{t("page_checkout.additional_information")}</h4>
              <div className="additional-info">
                <textarea
                  placeholder="Notas sobre su pedido, Ej: Llamar antes de la entrega."
                  name="message"
                  value={formValues.message}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
        )
      }
    
      <div className="col-lg-12 col-md-12 mt-2">
        <div className="additional-info-wrap">
          <h4>{t("page_checkout.additional_information")}</h4>
          <div className="additional-info">
            <textarea
              placeholder="Notas sobre su pedido, Ej: Llamar antes de la entrega."
              name="message"
              value={formValues.message}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};
