import clsx from "clsx";
import { useTranslation } from "react-i18next";
import { useDeliveryAddressForm } from "./useDeliveryAddressForm";


const FormDeliveryAddress = ({ isFirstRender }) => {
  const title = "Datos de Envío";
  const { t } = useTranslation();

  const {
    formData,
    isValid,
    handleChange,
  } = useDeliveryAddressForm({
    idUsuario: 1,
    nombre: "",
    idPais: 1,
    idDepartamento: 7,
    idMunicipio: 45,
    telefono: "",
    direccion: "",
    observaciones: "",
  });

  return (
    <section id="delivery_address">
      {title && (
        <h4 className="mb-3 font-semibold" onClick={() => console.log(formData)}>
          {title}
        </h4>
      )}
      <hr />

      <div className={clsx("mb-3", !isValid.nombre && !isFirstRender && "text-danger fw-bold")}>
        <label className="form-label">Nombre *</label>
        <div className="validation">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="form-control"
            placeholder="Nombre"
            required
            autoComplete="off"
          />
          <span className="validity"></span>
        </div>
        {!isValid.nombre && !isFirstRender && <small>Campo requerido</small>}
      </div>

      <div className="row">
        <div className={clsx("mb-3 col-md-12", !isValid.telefono && !isFirstRender && "text-danger fw-bold")}>
          <label className="form-label">Teléfono *</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            className="form-control"
            placeholder="Teléfono"
            required
            autoComplete="off"
          />
          {!isValid.telefono && !isFirstRender && <small>Campo requerido</small>}
        </div>
      </div>

      <div className={clsx("mb-3", !isValid.direccion && !isFirstRender && "text-danger fw-bold")}>
        <label className="form-label">Dirección *</label>
        <textarea
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="form-control"
          placeholder="Dirección"
          required
        />
        {!isValid.direccion && !isFirstRender && <small>Campo requerido</small>}
      </div>

      <div className="mb-3">
        <label className="form-label">Observaciones</label>
        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="form-control"
          placeholder="Observaciones"
        />
      </div>
    </section>
  );
};

export default FormDeliveryAddress;
