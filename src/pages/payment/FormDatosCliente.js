import clsx from "clsx";
import { Loader2, Search } from "lucide-react";
import { useTranslation } from "react-i18next";


export const FormDatosCliente = ({
  formValues,
  handleChange,
  handleCheckNit,
  loading,
  error,
  style,
  ref,
}) => {
  const { t } = useTranslation();




  return (
    <form onSubmit={handleCheckNit} ref={ref} >
      <div className="billing-info mb-20">
        <div className=" d-flex flex-row justify-content-start align-items-center gap-2">
          <label htmlFor="nitCliente">{t("page_checkout.vat")}</label>
          <label>{"|"}</label>
          <label>{t("page_checkout.dpi")}</label>
        </div>
        <div className="place-order d-flex position-relative align-items-center gap-2">
          <input
            type="search"
            id="nitCliente"
            name="nitCliente"
            value={formValues.nitCliente}
            onChange={handleChange}
            disabled={loading}
            required={true}
            className={clsx(error && "border-danger text-danger fw-bold")}
          />
          <button
            type="submit"
            className="btn-hover-green text-center "
            style={style}
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Search className="postion-fixed" />
            )}
          </button>
        </div>
      </div>
      <div className="col-lg-12  ">
        <div className="billing-info mb-20">
          <label>{t("page_checkout.first_name")}</label>
          <input
            type="text"
            name="nameCliente"
            value={formValues.nameCliente}
            readOnly={true}
          />
        </div>
      </div>

      <div className="col-lg-6 col-md-6">
        <div className="billing-info mb-20" hidden>
          <label>{t("page_checkout.last_name")}</label>
          <input type="hidden" name="lastNameCliente" />
        </div>
      </div>


    </form>
  );
};
