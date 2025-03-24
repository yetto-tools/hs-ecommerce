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
    cvv: "",
    avs: "",
    redirect: "https://hypestreet.dssolutionsgt.com/confirmacion-pago",
    expiryYear: "",
    expiryMonth: "",
  };
};

export const adapterPaymentForm = (data) => {
  // const ccexp = expiryMonth + expiryYear;
  return {
    type: data.type || "auth",
    key_id: data.key_id || "14482124",
    hash: data.hash || "",
    time: data.time || "",
    amount: data.amount || "",
    orderid: data.orderid || "",
    ccnumber: data.ccnumber || "",
    ccexp: data.ccexp || "",
    cvv: data.cvv || "",
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    email: data.email || "",
    phone: data.phone || "",
    redirect:
      data.redirect || "https://hypestreet.dssolutionsgt.com/confirmacion-pago",
    expiryYear: data.expiryYear || "",
    expiryMonth: data.expiryMonth || "",
  };
};
