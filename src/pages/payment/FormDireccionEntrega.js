import clsx from "clsx";
import { useTranslation } from "react-i18next";


export const FormDireccionEntrega = ({country, formValues, handleChange,errorsValidate})=>{
    const { t } = useTranslation();
    return(
        <>
        <div className="col-lg-12">
        <div className="billing-select mb-20">
          <label htmlFor="idPais">{t("page_checkout.country")}</label>
          <select name="idPais" id="idPais" required={true}>
            <option name="idPais">{t("page_checkout.select_country")}</option>
            {
              country &&
              country.paises.map((pais, index) => (
                <option 
                  key={pais.IdPais || `pais-${index}`} 
                  value={pais.IdPais} 
                  selected={ pais.IdPais == 1}
                >{pais.Nombre}</option>
              ))
            }
          </select>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="billing-select mb-20">
          <label>{t("page_checkout.select_state")}</label>
          <select name="idDepartamento" required={true} onChange={handleChange}>
            <option name="idDepartamento">{t("page_checkout.select_country")}</option>
            {
              country &&
              country.departamentos.map((depto, index ) => (
                <option key={depto.id || `depto-${index}`} value={depto.id}>{depto.Nombre}</option>
              ))
            }
          </select>
        </div>
      </div>                     
      <div className="col-lg-12">
        <div className="billing-info mb-20">
          <label>{t("page_checkout.address_delivery")}</label>
          <input type="text" value={formValues.ciudad} required={true} onChange={handleChange}
            placeholder={t("page_checkout.address_delivery")}
          />
        </div>
      </div>

      <div className="col-lg-6 col-md-6">
        <div className="billing-info mb-20">
          <label className={clsx(!errorsValidate.phone && "text-danger")}>{t("page_checkout.phone1")}</label>
          <input 
            type="tel" 
            name="telefono"
            id="telefono"
            maxLength={20}  
            required={true} 
            onChange={handleChange} 
            value={formValues.telefono}
            placeholder="Ej: 1234-5678"
            pattern="^\d{4}-\d{4}$"
            className={clsx(errorsValidate.phone ? "text-danger" :"")}
            />
          {!errorsValidate.email && <p className="text-danger mt-1">{"telefono inválido"}</p>} {/* Mensaje de error */}
        </div>
      </div>
      <div className="col-lg-6 col-md-6">
        <div className="billing-info mb-20">
          <label htmlFor="email" className={clsx(!errorsValidate.email && "text-danger")}>{t("page_checkout.email_address")}</label>
          <input 
            type="email" 
            name="email" 
            value={formValues.email} 
            maxLength={150}
            required 
            onChange={handleChange}
            className={clsx(!errorsValidate.email && "border-danger text-danger fw-bold")}
          />
          {!errorsValidate.email && <p className="text-danger mt-1">{"correo inválido"}</p>} {/* Mensaje de error */}
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
    )
}