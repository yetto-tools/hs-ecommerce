import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { dataPaymentForm } from "../../adapters/DataPaymentForm";
import { EncriptarTransaccion } from "../../helpers/validator";

import { CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";

export const CreditCardForm = ({ handleSubmitPayment }) => {
  const { t } = useTranslation();
  const [formValues, setFormValues] = useState(dataPaymentForm);
  const [focused, setFocused] = useState("");
  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  // Formato de la fecha de expiración para el componente de visualización
  const formattedExpiry = `${formValues.expiryMonth.padStart(
    2,
    "0"
  )}/${formValues.expiryYear.slice(-2)}`;

  return (
    <div className="checkout-area pt-95 pb-100 enable-selection">
      <div className="container">
        <div className="col-lg-12">
          <Cards
            number={formValues.ccnumber}
            name={`${formValues.first_name} ${formValues.last_name}`}
            expiry={formattedExpiry}
            cvc={formValues.cvv}
            focused={focused}
          />
        </div>
        <div className="col-lg-12">
          <div className="col-lg-12">
            <div className="billing-info-wrap">
              <form onSubmit={handleSubmitPayment}>
                <div className="billing-info mb-20">
                  <label className="fw-semibold mb-0" htmlFor="number">
                    Número de tarjeta
                  </label>
                  <input
                    type="tel"
                    name="number"
                    value={formValues.ccnumber}
                    onChange={(e) =>
                      setFormValues({ ...formValues, ccnumber: e.target.value })
                    }
                    onFocus={handleInputFocus}
                    placeholder="Número de tarjeta"
                    required
                  />
                </div>
                <div className="billing-info mb-20 row">
                  <label className="fw-semibold mb-0" htmlFor="name">
                    Nombre del titular
                  </label>
                  <div className="col-lg-6 col-md-6 col-12">
                    <input
                      type="text"
                      name="name"
                      value={formValues.first_name}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          first_name: e.target.value,
                        })
                      }
                      onFocus={handleInputFocus}
                      placeholder="Nombre"
                      required
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-12">
                    <input
                      type="text"
                      name="name"
                      value={formValues.last_name}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          last_name: e.target.value,
                        })
                      }
                      onFocus={handleInputFocus}
                      placeholder="Apellido"
                      required
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 d-flex flex-wrap justify-content-start align-items-center gap-1  mb-20">
                  <div className="col-lg-12 col-md-12 col-12 billing-select mb-20">
                    <label className="fw-semibold mb-0" htmlFor="expiryMonth">
                      Mes
                    </label>
                    <select
                      type="tel"
                      name="expiryMonth"
                      value={formValues.expiryMonth}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          expiryMonth: e.target.value,
                        })
                      }
                      onFocus={handleInputFocus}
                      placeholder="Mes de vencimiento (MM)"
                      maxLength="2"
                      required
                    >
                      {Array.from({ length: 12 }, (_, index) => (
                        <option
                          name="expiryMonth"
                          key={index + 1}
                          value={index + 1}
                        >
                          {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 billing-info mb-20">
                    <label className="fw-semibold mb-0" htmlFor="expiryYear">
                      Año
                    </label>
                    <input
                      type="tel"
                      name="expiryYear"
                      value={formValues.expiryYear}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          expiryYear: e.target.value,
                        })
                      }
                      onFocus={handleInputFocus}
                      placeholder="Año de vencimiento (AA)"
                      maxLength="4"
                      required
                    />
                  </div>
                  <div className="col-lg-12 col-md-12 col-12 billing-info mb-20">
                    <label className="fw-semibold mb-0" htmlFor="cvv">
                      cvv
                    </label>
                    <input
                      type="tel"
                      name="cvv"
                      value={formValues.cvv}
                      onChange={(e) =>
                        setFormValues({ ...formValues, cvv: e.target.value })
                      }
                      onFocus={handleInputFocus}
                      placeholder="cvv"
                      required
                    />
                  </div>
                </div>
                <div className="col-12 place-order my-4 text-center">
                  <label htmlFor=""></label>
                  <button
                    type="submit"
                    className="button-active-hs btn-black fw-bold w-75 mt-2 py-3 fs-5"
                  >
                    {t("page_checkout.pay")} <CreditCard />
                  </button>
                </div>

                <div className="col-12">
                  <input name="type" value={formValues.type} />
                  <input name="key_id" value="14482124" />
                  <input name="hash" id="hash" />
                  <input name="time" id="time" />
                  <input name="amount" value={formValues.amount} />
                  <input name="orderid" value={formValues.orderid} />
                  <input name="ccnumber" value={formValues.ccnumber} />
                  {/* <input name="ccexp" value={formValues.ccexp} /> */}
                  <input name="cvv" value={formValues.cvv} />
                  <input name="first_name" value={formValues.first_name} />
                  <input name="last_name" value={formValues.last_name} />
                  <input name="email" value={formValues.email} />
                  <input name="phone" value={formValues.phone} />

                  <input
                    type="hidden"
                    name="redirect"
                    value="https://hypestreet.dssolutionsgt.com/respuesta.html"
                  />
                  {EncriptarTransaccion(
                    formValues,
                    "Y4qNwKDv7yW858GdU96bSK7u43bvCytc"
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
