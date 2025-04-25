import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import { Loader2, Send } from "lucide-react";
import { fetchNewAdressUser } from "../../hooks/use-FetchUsuario";
import { showToast } from "../../toast/toastManager";

const FormNuevaDireccion = ({ setShowAddressNew }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { usuario, address } = useSelector((state) => state.usuario);
  const { country } = useSelector((state) => state.paramsWeb);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    idUsuario: "",
    nombre: "",
    idPais: 1,
    idDepartamento: "",
    idMunicipio: "",
    telefono: "",
    direccion: "",
    observaciones: "",
    predeterminada: 1,
    estado: 1,
  });

  const [municipiosFiltrados, setMunicipiosFiltrados] = useState([]);

  // Filtrar municipios al seleccionar un departamento
  useEffect(() => {
    if (formData.idDepartamento) {
      const filtrados = country?.municipios?.filter(
        (mun) => Number(mun.IdDepartamento) === Number(formData.idDepartamento)
      );
      setMunicipiosFiltrados(filtrados);
    } else {
      setMunicipiosFiltrados([]);
    }
  }, [formData.idDepartamento, country?.municipios]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario?.id) {
      showToast(
        "Debe iniciar sesión para registrar una dirección",
        "warn",
        "top-center"
      );
      return;
    }

    const nuevaDireccion = {
      ...formData,
      idUsuario: usuario.id,
    };

    try {
      setLoading(true);

      const isSuccess = await dispatch(
        fetchNewAdressUser(usuario.id, nuevaDireccion)
      );
      console.log("Direccion guardada con exito");
      /// Reset
      if (isSuccess) {
        setFormData({
          nombre: "",
          idPais: 1,
          idDepartamento: "",
          idMunicipio: "",
          telefono: "",
          direccion: "",
          observaciones: "",
          predeterminada: 1,
          estado: 1,
        });
        setShowAddressNew((prevState) => !prevState);
      }
    } catch (error) {
      showToast("Error al guardar la direccion", "error", "top-center");
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 border rounded shadow-sm mt-4"
    >
      <h4
        className="mb-3 font-semibold"
        onClick={() => {
          console.log(address);
        }}
      >
        Agregar Nueva Dirección
      </h4>
      <div className="mb-3">
        <label className="form-label">Nombre Direccion</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">País</label>
        <select
          name="idPais"
          value={formData.idPais}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Seleccione un país</option>
          {country?.paises?.map((pais) => (
            <option key={pais.IdPais} value={pais.IdPais}>
              {pais.Nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Departamento</label>
        <select
          name="idDepartamento"
          value={formData.idDepartamento}
          onChange={handleChange}
          className="form-select"
          required
        >
          <option value="">Seleccione un Departamento</option>
          {country?.departamentos?.map((depto) => (
            <option key={depto.IdDepartamento} value={depto.IdDepartamento}>
              {depto.Nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Municipio</label>

        <select
          name="idMunicipio"
          value={formData.idMunicipio}
          onChange={handleChange}
          className="form-select"
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
      </div>

      <div className="mb-3">
        <label className="form-label">Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Dirección</label>
        <textarea
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Observaciones</label>
        <textarea
          name="observaciones"
          value={formData.observaciones}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="row justify-content-center">
        <div className="col-12">
          <button
            type="submit"
            className="button-active-hs btn-black w-100 d-flex justify-content-center align-items-center gap-2 py-2"
            disabled={loading}
          >
            <span>{t("page_checkout.save_address")}</span>

            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <Send className="position-relative" />
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormNuevaDireccion;
