export const sendOrder = async (formValues, cartItems, transactionResponse) => {
  const orderData = {
    nitCliente: formValues.nitCliente,
    nameCliente: formValues.nameCliente,
    lastNameCliente: formValues.nameCliente,
    documentoLocal: "0",
    idCliente: 3,
    idMoneda: 1,
    total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
    impuesto: (cartItems.reduce((total, item) => total + item.price * item.quantity, 0) * 0.12).toFixed(2),
    descuentoPorcentaje: 0,
    descuentoMonto: 0,
    comentarios: "Compra en línea",
    BACOrderId: transactionResponse.orderId,
    BACResponse: transactionResponse.response,
    BACTransactionID: transactionResponse.transactionId,
    direccionFacturacion: formValues.direccionFacturacion,
    direccionEnvio: formValues.direccionEnvio,
    products: cartItems.map((item) => ({
      itemCode: item.id,
      quantity: item.quantity,
      idArticulo: item.id,
      descripcion: item.name,
      precioUnitario: item.price,
      total: item.price * item.quantity,
      impuestoMonto: (item.price * item.quantity) * 0.12,
      descuentoPorcentaje: 0,
      descuentoMonto: 0,
      idAlmacen: 1,
    })),
  };

  await fetch("/api/orden", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData),
  })
    .then((res) => res.json())
    .then(() => alert("Pedido enviado con éxito"))
    .catch(() => alert("Error al enviar el pedido"));
};
