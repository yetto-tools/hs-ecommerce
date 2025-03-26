

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

  return (
    <>

      <div className="col-lg-12">
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
