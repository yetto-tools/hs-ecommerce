export const newAddress = {
  idUsuario: "",
  nombre: "",
  idPais: "",
  idDepartamento: "",
  idMunicipio: "",
  telefono: "",
  direccion: "",
  observaciones: "",
  predeterminada: 1,
  estado: 1,
};


export const newAddressData = (data) => {
  return {
    idUsuario: data.idUser,
    nombre: data.name,
    idPais: data.idPais,
    idDepartamento: data.idDepto,
    idMunicipio: data.idCity,
    telefono: data.phone,
    direccion: data.address,
    observaciones: data.comment,
    predeterminada: data.default,
    estado: data.estate,
  };
};