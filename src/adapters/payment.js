export const paymentForm = () => {
  return {
    type: "sale",
    key_id: "49338953",
    hash: "",
    time: "",
    amount: "",
    tax: "",
    orderid: "",
    processor_id: "",
    first_name: "",
    phone: "",
    email: "",
    ccnumber: "",
    ccexp: "",
    cvv: "",
    avs: "",
    redirect: `${window.location.origin}/success-payment`,
  };
};

export const adapterPaymentForm = (data) => {
  return {
    type: data.type || "sale",
    key_id: data.key_id || "49338953",
    hash: data.hash || "",
    time: data.time || "",
    amount: data.amount || "",
    tax: data.tax || "",
    orderid: data.orderid || "",
    processor_id: data.processor_id || "",
    first_name: data.first_name || "",
    phone: data.phone || "",
    email: data.email || "",
    ccnumber: data.ccnumber || "",
    ccexp: data.ccexp || "",
    cvv: data.cvv || "",
    avs: data.avs || "",
    redirect: data.redirect || `${window.location.origin}/pago-exito`,
  };
};
