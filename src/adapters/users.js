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
