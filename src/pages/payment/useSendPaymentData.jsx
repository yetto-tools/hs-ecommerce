// useSendPaymentData.js
import { useEffect } from "react";

const useSendPaymentData = (paymentData) => {
  useEffect(() => {
    // Asegúrate de que el objeto tenga datos (o añade otras validaciones según necesites)
    if (paymentData && Object.keys(paymentData).length) {
      const endpointUrl = "https://ejemplo.com/api/payment-success"; // Reemplaza por tu URL real

      fetch(endpointUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Error en la red: ${response.statusText}`);
          }
          return response.json();
        })
        .then((result) => {
          console.log("Datos de pago enviados exitosamente:", result);
        })
        .catch((error) => {
          console.error("Error al enviar los datos de pago:", error);
        });
    }
  }, [paymentData]);
};

export default useSendPaymentData;
