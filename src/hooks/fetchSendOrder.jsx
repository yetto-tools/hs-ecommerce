import { API_URL } from "../config";
import { showToast } from "../toast/toastManager";

export const fetchSendOrder = (orderData) => {
  return async () => {
    try {
      const res = await fetch(`${API_URL}/api/v1/factura`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Error en el servidor");
      showToast("Orden enviada correctamente", "success", "bottom-left", 7000);
      return json;
    } catch (error) {
      showToast(`${error.message}`, "error", "bottom-left");
      throw error;
    }
  };
};

export const adapterCheckoutOrder = ({ cliente, productos }) => ({
  nitCliente: cliente.nitCliente,
  nameCliente: cliente.nameCliente,
  lastNameCliente: cliente.lastNameCliente,
  documentoLocal: cliente.documentoLocal || generateUUID(),
  idCliente: cliente.idCliente,
  idMoneda: 1,
  total: cliente.total,
  impuesto: cliente.impuesto,
  descuentoPorcentaje: cliente.descuentoPorcentaje || 0,
  descuentoMonto: cliente.descuentoMonto || 0,
  comentarios: cliente.comentarios || "",
  BACOrderId: cliente.BACOrderId || "",
  BACResponse: cliente.BACResponse || "",
  BACTransactionID: cliente.BACTransactionID || "",
  products: productos.map((item) => ({
    itemCode: item.codigoInterno,
    quantity: item.quantity,
    idArticulo: item.idArticulo,
    codigoInterno: item.codigoInterno,
    descripcion: item.descripcion,
    precioUnitario: item.precioUnitario,
    total: item.total,
    impuestoMonto: item.impuestoMonto,
    descuentoPorcentaje: item.descuentoPorcentaje || 0,
    descuentoMonto: item.descuentoMonto || 0,
    idAlmacen: item.idAlmacen || 1,
  })),
});

const generateUUID = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
