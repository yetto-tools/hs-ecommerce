export const dataPaymentForm = () => {
  // const ccexp = expiryMonth + expiryYear;
  return {
    type: "auth",
    key_id: "14482124",
    hash: "",
    time: "",
    amount: "",
    tax: "",
    orderid: "",
    // processor_id: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    ccnumber: "",
    ccexp: "",
    cvc: "",
    cvv: "",
    avs: "",
    redirect: "https://hypestreet.dssolutionsgt.com/pago-exito",
    expiryYear: "",
    expiryMonth: "",
    "first_name,last_name": "",
  };
};

export const adapterPaymentForm = (cliente, tarjeta, pago, redirect) => {
  // const ccexp = expiryMonth + expiryYear;
  return {
    type: pago.type || "auth",
    key_id: pago.key_id || "14482124",
    hash: pago.hash || "",
    time: pago.time || "",
    amount: pago.amount || "",
    orderid: pago.orderid || "",
    ccnumber: tarjeta.ccnumber || "",
    ccexp: tarjeta.ccexp || "",
    cvc: tarjeta.cvc || "",
    cvv: tarjeta.cvc || "",
    name: cliente.name || "",
    avs: cliente.address || "",
    email: cliente.email || "",
    phone: cliente.phone || "",

    redirect: redirect || "https://hypestreet.dssolutionsgt.com/pago-exito",

    expiryYear: tarjeta.expiryYear || "",
    expiryMonth: tarjeta.expiryMonth || "",
  };
};


export const adapterFormBAC = (key_id, redirect) => {
  // const ccexp = expiryMonth + expiryYear;
  return {

    type:"auth",
    key_id: key_id ?? "14482124",
    hash: "",
    time:"",
    amount:"",
    tax:"",
    orderid:"",
    processor_id:"",
    "first_name,last_name": "",
    phone:"",
    email:"",
    ccnumber:"",
    ccexp:"",
    cvv:"",
    avs:"",
    redirect:redirect ?? "https://hypestreet.dssolutionsgt.com/pago-exito",

  };
};