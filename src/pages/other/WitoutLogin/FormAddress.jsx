import clsx from "clsx";

const FormDeliveryAddress = ({ formData, isValid, handleChange }) => {
  const title = "Datos de Envío";

  return (
    <section id="delivery_address">
      {title && (
        <h4
          className="mb-3 font-semibold"
          onClick={() => console.log(formData)}
        >
          {title}
        </h4>
      )}
      <hr />

      <div className={clsx("mb-3", !isValid.nombre && "text-danger fw-bold")}>
        <label className="form-label mb-0">Nombre *</label>
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
        {!isValid.nombre && <small>Campo requerido</small>}
      </div>

      <div className="row">
        <div
          className={clsx(
            "mb-3 col-md-12",
            !isValid.telefono && "text-danger fw-bold"
          )}
        >
          <label className="form-label mb-0">Teléfono *</label>

          <div className="validation">
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
            <span className="validity"></span>
          </div>
          {!isValid.telefono && <small>Campo requerido</small>}
        </div>
      </div>

      <div
        className={clsx("mb-3", !isValid.direccion && "text-danger fw-bold")}
      >
        <label className="form-label mb-0">Dirección *</label>
        <div className="validation">
          <textarea
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            className="form-control"
            placeholder="Dirección"
            required
          />
          <span className="validity"></span>
        </div>
        {!isValid.direccion && <small>Campo requerido</small>}
      </div>

      <div className="mb-3">
        <label className="form-label mb-0">Observaciones</label>
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
