import Decimal from "decimal.js";

const adapterOrdenTest = (cliente = {}, data = {}) => {
  return {
    nitCliente: "12739251",
    nameCliente: "Erick",
    lastNameCliente: "Echeverria",
    documentoLocal: "FAC007",
    idCliente: 1,
    idMoneda: 1,
    total: 279.0,
    impuesto: 150.0,
    descuentoPorcentaje: 0,
    descuentoMonto: 0,
    comentarios: "Factura DS - API - Endpoint de Facturación",
    BACOrderId: "ABC123",
    BACResponse: "Success",
    BACTransactionID: "TXN123456",
    products: [
      {
        itemCode: "27000V/8CA+M",
        quantity: 1.0,
        idArticulo: "1565",
        codigoInterno: "27000V/8CA+M",
        descripcion: "Camiseta X",
        precioUnitario: 200.0,
        total: 400.0,
        impuestoMonto: 60.0,
        descuentoPorcentaje: 5.0,
        descuentoMonto: 20.0,
        idAlmacen: 1,
      },
    ],
  };
};

export const adapterOrderCustomer = (formValues) => {
  return {
    nitCliente: formValues.nitCliente || "",
    nameCliente: formValues.nameCliente || "",
    lastNameCliente: formValues.nameCliente || "",
    documentoLocal: "", // Agregar si lo tienes en el formulario
    idCliente: "", // Si tienes un ID de cliente
    idMoneda: formValues.currency || 1,
    total: formValues.cartTotalPrice || 0,
    impuesto: 0, // Puedes calcular el impuesto si es necesario
    descuentoPorcentaje: 0, // Puedes agregar descuentos si aplican
    descuentoMonto: 0, // Monto del descuento
    comentarios: "", // Puedes agregar un campo de comentarios en el formulario
    BACOrderId: "", // Si tienes un ID de orden de BAC
    BACResponse: "",
    BACTransactionID: "",
    XmlData:""
  };
};

export const adapterOrderProducts = (
  cartItems,
  { iva = 1.12, idAlmacen = 1 },
  pathImage = ""
) => {
  return cartItems.map((cartItem) => {
    const qty = cartItem.quantity || 0;

    // ✅ Si discount existe y es > 0, se usa como precio final unitario
    const precioUnitarioFinal =
      cartItem.discount && cartItem.discount > 0
        ? new Decimal(cartItem.discount)
        : new Decimal(cartItem.price || 0);

    const precioOriginal = new Decimal(cartItem.price || 0);
    const subtotal = precioUnitarioFinal.mul(qty);

    // Descuento aplicado en moneda = (precio original - precio con descuento) * cantidad
    const descuentoMonto = precioOriginal.gt(precioUnitarioFinal)
      ? precioOriginal.sub(precioUnitarioFinal).mul(qty)
      : new Decimal(0);

    const impuestoMonto = subtotal.sub(subtotal.div(iva));

    return {
      itemCode: cartItem.sku || "",
      quantity: qty,
      idArticulo: cartItem.id || "",
      codigoInterno: cartItem.code || "",
      descripcion: cartItem.code || "",
      precioUnitario: Number(precioUnitarioFinal).toFixed(2), // 👈 ahora con descuento aplicado
      total: Number(subtotal).toFixed(2),
      impuestoMonto: Number(impuestoMonto).toFixed(2),
      descuentoMonto: Number(descuentoMonto).toFixed(2),
      precioOriginal: Number(precioOriginal).toFixed(2), // 👈 opcional, por si quieres guardar el original
      idAlmacen: idAlmacen,
      urlImage: cartItem.images?.length ? pathImage + cartItem.images[0] : "",
    };
  });
};

// export const adapterOrderProducts = (
//   cartItems,
//   { iva = 1.12, idAlmacen = 1 },
//   pathImage = ""
// ) => {
//   return cartItems.map((cartItem) => ({
//     itemCode: cartItem.sku || "",
//     quantity: cartItem.quantity || 0,
//     idArticulo: cartItem.id || "",
//     codigoInterno: cartItem.code || "",
//     descripcion: cartItem.code || "",
//     precioUnitario: Number(
//       new Decimal(cartItem.price) || new Decimal(0)
//     ).toFixed(2),
//     total: Number(
//       new Decimal(cartItem.price * cartItem.quantity) || new Decimal(0)
//     ).toFixed(2),
//     impuestoMonto: Number(
//       new Decimal(cartItem.price - cartItem.price / iva) || new Decimal(0)
//     ).toFixed(2), // Si tienes impuestos, agrégalo aquí
//     descuentoPorcentaje: cartItem.discount || 0,
//     descuentoMonto: Number(
//       new Decimal(
//         (cartItem.price * cartItem.quantity * cartItem.discount) / 100
//       ) || new Decimal(0)
//     ).toFixed(2), // Si hay descuentos en monto
//     idAlmacen: idAlmacen, // Ajustar si se tiene almacenes distintos
//     urlImage: pathImage + cartItem.images[0] || "",
//   }));
// };

export const adapterOrden = (cliente = {}, data = []) => {
  return {
    nitCliente: cliente.nitCliente,
    nameCliente: cliente.nameCliente,
    lastNameCliente: cliente.lastNameCliente,
    documentoLocal: cliente.documentoLocal,
    idCliente: cliente.idCliente,
    idMoneda: cliente.idMoneda,
    total: cliente.total,
    impuesto: cliente.impuesto,
    descuentoPorcentaje: cliente.descuentoPorcentaje,
    descuentoMonto: cliente.descuentoMonto,
    comentarios: cliente.comentarios,
    BACOrderId: cliente.BACOrderId,
    BACResponse: cliente.BACResponse || "Success",
    BACTransactionID: cliente.BACResponse || "",
    products: [
      {
        itemCode: data.itemCode || "",
        quantity: data.quantity || 0,
        idArticulo: data.idArticulo || "",
        codigoInterno: data.codigoInterno || "",
        descripcion: data.descripcion || "",
        precioUnitario: data.precioUnitario || 0,
        total: data.total || 0,
        impuestoMonto: data.impuestoMonto || 0,
        descuentoPorcentaje: data.descuentoPorcentaje || 0,
        descuentoMonto: data.descuentoMonto || 0,
        idAlmacen: data.idAlmacen || 1,
      },
    ],
  };
};
