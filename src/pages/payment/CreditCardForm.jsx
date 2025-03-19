import React, { useState } from "react";

const CreditCardForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    ccnumber: "",
    ccexp: "",
    cvv: "",
    amount: "",
    orderid: "Prueba123",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones básicas
    if (!formData.ccnumber || formData.ccnumber.length < 13) {
      alert("Número de tarjeta inválido");
      return;
    }
    if (!formData.ccexp || formData.ccexp.length !== 4) {
      alert("Fecha de expiración inválida");
      return;
    }
    if (!formData.cvv || formData.cvv.length < 3) {
      alert("CVV inválido");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      alert(`Transacción ${result.status}: ${result.message}`);
    } catch (error) {
      console.error("Error en la transacción:", error);
      alert("Error al procesar el pago.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "0 auto", textAlign: "center" }}>
      <h2>Pago con Tarjeta</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} required />
        <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} required />
        <input type="email" name="email" placeholder="Correo electrónico" onChange={handleChange} required />
        <input type="tel" name="phone" placeholder="Teléfono" onChange={handleChange} required />
        <input type="text" name="ccnumber" placeholder="Número de tarjeta" onChange={handleChange} required maxLength="16" />
        <input type="text" name="ccexp" placeholder="MMYY" onChange={handleChange} required maxLength="4" />
        <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} required maxLength="4" />
        <input type="text" name="amount" placeholder="Monto" onChange={handleChange} required />
        <button type="submit">Pagar</button>
      </form>
    </div>
  );
};

export default CreditCardForm;
