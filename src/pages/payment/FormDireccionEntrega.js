import { MapPinPlus } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FormNuevaDireccion from "../../components/address/FormNuevaDireccion";
import { useEffect, useState } from "react";

export const FormDireccionEntrega = ({
  country,
  setFormValues,
  formValues,
  handleChange,
  errorsValidate,
  setShowAddressNew,
  showAddressNew,
  addressSelected,
}) => {
  const { t } = useTranslation();
  const { address } = useSelector((state) => state.usuario);

  useEffect(() => {
    if (address.length > 0) {
      setFormValues((prevValues) => ({
        ...prevValues,
        idDireccion: address[address.length - 1].idAddress,
      }));
    }
  }, [address]);
  const handleDebug = () => {
    console.log(address);
  };
  return (
    <>
      <div className="col-lg-12 row ">
        <div className="col-lg-9 col-9">
          <div className="billing-info mb-20">
            <label onClick={handleDebug}>
              {t("page_checkout.street_address")}
            </label>
            <select
              name="idDireccion"
              onChange={handleChange}
              className="form-select"
            >
              <option>{t("page_checkout.select_address")}</option>
              {address &&
                address.map((direccion) => (
                  <option
                    key={`${direccion.idAddress}-${direccion.name}`}
                    value={direccion.idAddress}
                    selected={
                      address[address.length - 1].idAddress ===
                      direccion.idAddress
                    }
                  >
                    {direccion.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-lg-2 col-md-2 col-2">
          <label></label>
          <button
            type="button"
            className="button-active-hs btn-black fw-bold mt-1 px-4 py-2"
            onClick={() => {
              showAddressNew
                ? setShowAddressNew(false)
                : setShowAddressNew(true);
            }}
          >
            <MapPinPlus />
          </button>
        </div>
      </div>
      <div className="col-lg-12 col-md-12 col-12 py-2 mb-4 billing-info">
        {addressSelected ? (
          <div className="billing-info px-2 p-2 read-only-input">
            <span className="fw-bold px-2 text-xs">
              {addressSelected?.address}
            </span>
          </div>
        ) : (
          <div className="billing-info px-2 p-2 read-only-input">
            <span className="col-12 fw-bold px-2 text-xs">
              {t("page_checkout.select_address_yet")}
            </span>
          </div>
        )}
      </div>

      {showAddressNew && (
        <div className="col-lg-12 col-md-12 mt-2">
          <FormNuevaDireccion
            country={country}
            formValues={formValues}
            handleChange={handleChange}
            errorsValidate={errorsValidate}
            setShowAddressNew={setShowAddressNew}
          />
        </div>
      )}

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
