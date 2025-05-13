export const adapterUserLogin = (user) => {
  return {
    id: user.Usuario,
    username: user.user,
    firstName: user.PrimerNombre,
    secondName: user.SegundoNombre,
    firstLastName: user.PrimerApellido,
    secondLastName: user.SegundoApellido,
    email: user.CorreoElec,
    phone1: user.NumTel,
    role: user.role,
  };
};

export const adapterUserRegister = (user) => {
  return {
    user: user.user,
    firstName: user.firstName,
    secondName: user.secondName,
    firstLastName: user.firstLastname,
    secondLastName: user.secondLastname,
    email: user.email,
    phone1: user.phoneNumber,
    password: user.password,
    origin: user.originCreation || "web",
  };
};

export const CustomerAnonymous = {
  idUsuario: "999999",
  nombre: "",
  correo: "",
  nitInput: "",
  nitCliente: "",
  nameCliente: "",
  idPais: "",
  idDepartamento: "",
  idMunicipio: "",
  telefono: "",
  direccion: "",
  observaciones: "",
};

export const adapterUserAnonymous = (user = null) => {
  if (!user)
    return {
      idUsuario: "999999",
      nombre: "",
      idPais: "",
      idDepartamento: "",
      idMunicipio: "",
      telefono: "",
      direccion: "",
      observaciones: "",
    };
  else {
    return {
      idUsuario: user.id,
      nombre: user.name,
      idPais: user.idCountry,
      idDepartamento: user.idState,
      idMunicipio: user.idCity,
      telefono: user.phone,
      direccion: user.address,
      observaciones: user.comment,
    };
  }
};
