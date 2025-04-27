import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import FormNuevaDireccion from "../../components/address/FormNuevaDireccion";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Plus } from "lucide-react";

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

  const onCloseModal = () => {
    setShowAddressNew(false);
  };
  return (
    <>
      <div className="col-lg-12 row ">
        <div className="col-lg-7 col-7">
          <div className="billing-info mb-20">
            <label onClick={handleDebug}>
              {t("page_checkout.street_address")}
            </label>
            <select
              name="idDireccion"
              onChange={handleChange}
              className="form-select"
              value={formValues.idDireccion || ""} // ← añadimos esto
            >
              <option>{t("page_checkout.select_address")}</option>
              {address &&
                address.map((direccion) => (
                  <option
                    key={`${direccion.idAddress}-${direccion.name}`}
                    value={direccion.idAddress}
                  >
                    {direccion.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="col-lg-5 col-md-5 col-5">
          <label></label>
          <div className="text-sm w-100 mt-1">
            <button
              type="button"
              className="button-active-hs btn-black fw-bold mt-1 px-4 py-2.5 row"
              style={{ fontSize: "0.820rem" }}
              onClick={() => {
                showAddressNew
                  ? setShowAddressNew(false)
                  : setShowAddressNew(true);
              }}
            >
              {address.length > 0
                ? t("page_checkout.change_address")
                : t("page_checkout.add_new_address")}
            </button>
          </div>
        </div>
      </div>

      <Modal
        show={showAddressNew}
        onHide={onCloseModal}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton>
          <div className="row col-md-12 text-center">
            <h3 className="modal-title fw-semibold">
              {address.length > 0
                ? t("page_checkout.change_address")
                : t("page_checkout.add_new_address")}
            </h3>
          </div>
        </Modal.Header>
        <Modal.Body>
          <section className="modal-body py-0">
            <div className="row">
              <div className="col-md-8 col-sm-12 col-xs-12 mx-auto">
                <FormNuevaDireccion
                  country={country}
                  formValues={formValues}
                  handleChange={handleChange}
                  errorsValidate={errorsValidate}
                  setShowAddressNew={setShowAddressNew}
                  title=""
                  onCloseModal={onCloseModal}
                />
              </div>
            </div>
          </section>
        </Modal.Body>
      </Modal>

      {/* {showAddressNew && (
        <div className="col-lg-12 col-md-12 mt-2">
          <FormNuevaDireccion
            country={country}
            formValues={formValues}
            handleChange={handleChange}
            errorsValidate={errorsValidate}
            setShowAddressNew={setShowAddressNew}
          />
        </div>
      )} */}

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

      <div className="col-lg-12 col-md-12 mt-2">
        <div className="additional-info-wrap">
          <h4>{t("page_checkout.additional_information")}</h4>
          <div className="additional-info">
            <textarea
              placeholder="Notas sobre su pedido, Ej: Llamar antes de la entrega."
              name="message"
              value={formValues.message}
              onChange={handleChange}
              rows={3}
              cols={50}
            />
          </div>
        </div>
      </div>
    </>
  );
};
