import clsx from "clsx";

import { useEffect, useRef } from "react";
import { fetchValidaNIT } from "../../../hooks/use-fetchValidaNIT";
import { useDispatch, useSelector } from "react-redux";
import { FormNIT } from "./FormNIT";

const FormDeliveryAddress = ({
  formData,
  setFormData,
  country,
  deptosFiltrados,
  municipiosFiltrados,
  isValid,
  handleChange,
}) => {
  const title = "Datos de Envío";

  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const { validacionNit, loading, error } = useSelector(
    (state) => state.validarNit
  );
  const handleCheckNit = (e) => {
    e.preventDefault();

    const { nitInput } = formData;
    if (!nitInput.trim()) {
      alert("El campo NIT/DPI no puede estar vacío.");
      document.querySelector("#nitInput")?.click();
      return;
    }
    dispatch(fetchValidaNIT(nitInput));
  };

  useEffect(() => {
    if (validacionNit?.Nombre) {
      setFormData((prev) => ({
        ...prev,
        nitCliente: validacionNit.Nit,
        nameCliente: validacionNit.Nombre,
      }));
    }
  }, [validacionNit]);

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
      <div className={clsx("mb-3", !isValid.nombre && "text-danger fw-bold")}>
        <label className="form-label mb-0">Correo *</label>
        <div className="validation">
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            className="form-control"
            placeholder="Correo"
            required
            autoComplete="off"
            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
            title="Ingrese un correo electrónico válido (ej: usuario@dominio.com)"
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
      <div className="row">
        <div
          className={clsx(
            "mb-3 col-md-12",
            !isValid.telefono && "text-danger fw-bold"
          )}
        >
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
              <label className="form-label mb-0">País *</label>
              <div className="validation">
                <select
                  name="idPais"
                  value={formData.idPais} // Vinculado al estado
                  onChange={handleChange}
                  className={clsx(
                    "form-select rounded py-2",
                    !isValid.idPais && "is-invalid"
                  )}
                  required
                >
                  <option value="">Seleccione un país</option>
                  {country?.paises?.map((pais) => (
                    <option key={pais.IdPais} value={pais.IdPais}>
                      {pais.Nombre}
                    </option>
                  ))}
                </select>
                {!isValid.idPais && (
                  <small className="text-danger">Campo requerido</small>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
              <label className="form-label mb-0">Departamento *</label>
              <div className="validation">
                <select
                  name="idDepartamento"
                  value={formData.idDepartamento}
                  onChange={handleChange}
                  className={clsx(
                    "form-select rounded py-2",
                    !isValid.idDepartamento && "is-invalid"
                  )}
                  required
                  disabled={!deptosFiltrados.length}
                >
                  <option value="">Seleccione un Departamento</option>
                  {deptosFiltrados.map((depto) => (
                    <option
                      key={depto.IdDepartamento}
                      value={depto.IdDepartamento}
                    >
                      {depto.Nombre}
                    </option>
                  ))}
                </select>
                {!isValid.idDepartamento && (
                  <small className="text-danger">Campo requerido</small>
                )}
              </div>
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12 mb-3">
              <label className="form-label mb-0">Municipio *</label>
              <div className="validation">
                <select
                  name="idMunicipio"
                  value={formData.idMunicipio}
                  onChange={handleChange}
                  className={clsx(
                    "form-select rounded py-2",
                    !isValid.idMunicipio && "is-invalid"
                  )}
                  required
                  disabled={!municipiosFiltrados.length}
                >
                  <option value="">Seleccione un municipio</option>
                  {municipiosFiltrados.map((mun) => (
                    <option key={mun.IdMunicipio} value={mun.IdMunicipio}>
                      {mun.Nombre}
                    </option>
                  ))}
                </select>
                {!isValid.idMunicipio && (
                  <small className="text-danger">Campo requerido</small>
                )}
              </div>
            </div>
          </div>
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

      <div>
        <FormNIT
          formValues={formData}
          handleChange={handleChange}
          handleCheckNit={handleCheckNit}
          loading={loading}
          error={error}
          style={{
            fontWeight: "500",
            lineHeight: "1",
            zIndex: "9",
            display: "block",
            width: "2.5rem",
            padding: "0.5rem",
            textAlign: "center",
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
            background: "none",
            backgroundColor: "#000",
          }}
          ref={inputRef}
        />
      </div>
    </section>
  );
};

export default FormDeliveryAddress;
