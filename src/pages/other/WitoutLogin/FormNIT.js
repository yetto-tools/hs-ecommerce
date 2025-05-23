import clsx from "clsx";
import { Loader2, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import React, { forwardRef } from "react";

export const FormNIT = forwardRef(
  (
    { formValues, handleChange, handleCheckNit, loading, error, style },
    ref
  ) => {
    const { t } = useTranslation();

    return (
      <form onSubmit={handleCheckNit} ref={ref}>
        <div className="billing-info mb-20">
          <div className=" d-flex flex-row justify-content-start align-items-center gap-2">
            <label htmlFor="nitCliente">
              Buscar y verificar {t("page_checkout.vat")}
            </label>
            <label>{"|"}</label>
            <label>DPI</label>
          </div>
          <div
            className="place-order d-flex position-relative align-items-center gap-2"
            id="nit-section"
          >
            <input
              type="search"
              id="nitInput"
              name="nitInput"
              value={formValues.nitInput}
              onChange={handleChange}
              disabled={loading}
              required
              className={clsx(
                "nit-input",
                error && "border-danger text-danger fw-bold"
              )}
              autoComplete="off"
            />
            <button
              id="btn-validar-nit"
              type="submit"
              className="btn-hover-green text-center"
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
        <div className="col-lg-12">
          <div className="billing-info mb-20">
            <label>
              {t("page_checkout.vat")} | {t("page_checkout.dpi")}
            </label>
            <input
              type="text"
              name="nitCliente"
              value={formValues.nitCliente}
              readOnly
              className="read-only-input"
            />
          </div>
          <div className="billing-info mb-20">
            <label>{t("page_checkout.first_name")}</label>
            <input
              type="text"
              name="nameCliente"
              value={formValues.nameCliente}
              readOnly
              className="read-only-input"
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
  }
);
