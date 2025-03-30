export const adapterUsuario = (data) => {
  return {
    id: data.IdUsuario || 0,
    name: data.Nombre,
    user: data.Usuario,
    email: data.Correo,
    phone1: data.Telefono || "",
    idRol: data.idRol || 1,
  };
};

export const adapterAddressUser = (direccion) => {
  return {
    idAddress: direccion.IdUsuario_Direccion,
    idUser: direccion.IdUsuario,
    name: direccion.Nombre || "",
    idCountry: direccion.IdPais,
    idState: direccion.IdDepartamento,
    idCity: direccion.IdMunicipio,
    phone: direccion.Telefono || "",
    address: direccion.Direccion || "",
    comment: direccion.Observaciones || "",
    default: direccion.Predeterminada || 0,
    status: direccion.Estado || 0,
  };
};

export const adapterAddressesUser = (direcciones) => {
  return direcciones.map((direccion) => adapterAddressUser(direccion));
};

export const adapterNewAdressesUser = (direcciones) => {
  return direcciones.map((direccion) => adapterNewAdressUser(direccion));
};

export const adapterNewAdressUser = (direccion) => {
  return {
    idAddress: direccion.IdUsuario_Direccion || 0,
    idUser: direccion.IdUsuario,
    name: direccion.Nombre || "",
    idCountry: direccion.IdPais,
    idState: direccion.IdDepartamento,
    idCity: direccion.IdMunicipio,
    phone: direccion.Telefono || "",
    address: direccion.Direccion || "",
    comment: direccion.Observaciones || "",
    default: direccion.Predeterminada || 0,
    status: direccion.Estado || 0,
  };
};

export const adapterLoginUser = (data) => {
  return {
    rolId: 1,
    emailUser: data.email,
    password: data.password,
  };
};
