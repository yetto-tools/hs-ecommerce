import React, { useEffect, useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { CreditCard } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";

export const CreditCardForm = ({
  handleSubmitPayment,
  cardValues,
  setCardValues,
  setDisableButton,
  disableButton
}) => {
  const { t } = useTranslation();

  const [focused, setFocused] = useState("");
  const handleInputFocus = (e) => {
    setFocused(e.target.name);
  };

  // Formato de la fecha de expiración para el componente de visualización
  const formattedExpiry = `${cardValues.expiryMonth.padStart(
    2,
    "0"
  )}/${cardValues.expiryYear.slice(-2)}`;



  return (
    <div className="checkout-area pt-4 pb-100 enable-selection">
      <div className="container">
        <div className="col-lg-12">
          <Cards
            number={cardValues.ccnumber}
            name={`${cardValues.name}`}
            expiry={formattedExpiry}
            cvc={cardValues.cvc}
            focused={focused}
          />
        </div>
        <div className="col-lg-12">
          <div className="col-lg-12">
            <div className="billing-info-wrap">
              <form onSubmit={handleSubmitPayment} autoComplete="off">
                <div className="billing-info mb-20 row">
                  <label className="fw-semibold mb-0 mt-4" htmlFor="name">
                    Nombre del Titular
                  </label>
                  <div className="col-lg-12 col-md-12 col-12">
                    <input
                      type="text"
                      name="name"
                      value={cardValues.name}
                      onChange={(e) =>
                        setCardValues({
                          ...cardValues,
                          name: e.target.value,
                        })
                      }
                      onFocus={handleInputFocus}
                      placeholder="Nombre"
                      required
                    />
                  </div>
                </div>
                <div className="billing-info mb-20">
                  <label className="fw-semibold mb-0" htmlFor="ccnumber">
                    Número de tarjeta
                  </label>
                  <input
                    type="tel"
                    name="ccnumber"
                    value={cardValues.ccnumber}
                    onChange={(e) =>
                      setCardValues({ ...cardValues, ccnumber: e.target.value })
                    }
                    onFocus={handleInputFocus}
                    placeholder="Número de tarjeta"
                    required
                    autoComplete="off"
                    autoCapitalize="on"
                  />
                </div>

                <div className="billing-info mb-20 row">
                  <div className="row mx-auto px-0">
                    <div className="col-lg-4 col-md-4 col-4 billing-select mb-20">
                      <label className="fw-semibold mb-0" htmlFor="expiryMonth">
                        Mes
                      </label>
                      <select
                        type="tel"
                        name="expiryMonth"
                        value={cardValues.expiryMonth}
                        onChange={(e) =>
                          setCardValues({
                            ...cardValues,
                            expiryMonth: e.target.value,
                          })
                        }
                        onFocus={handleInputFocus}
                        placeholder="Mes de vencimiento (MM)"
                        maxLength="2"
                        required
                      >
                        <option value="">Mes de vencimiento (MM)</option>
                        {Array.from({ length: 12 }, (_, index) => (
                          <option
                            name="expiryMonth"
                            key={(index + 1).toString().padStart(2, "0")}
                            value={(index + 1).toString().padStart(2, "0")}
                          >
                            {(index + 1).toString().padStart(2, "0")}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-4 col-4 billing-info mb-20">
                      <label className="fw-semibold mb-0" htmlFor="expiryYear">
                        Año
                      </label>
                      <input
                        type="number"
                        name="expiryYear"
                        value={cardValues.expiryYear}
                        onChange={(e) =>
                          setCardValues({
                            ...cardValues,
                            expiryYear: e.target.value,
                          })
                        }
                        onFocus={handleInputFocus}
                        placeholder="Año de vencimiento (AA)"
                        maxLength="2"
                        max={99}
                        required
                      />
                    </div>
                    <div className="col-lg-4 col-md-4 col-4 billing-info mb-20">
                      <label className="fw-semibold mb-0" htmlFor="cvc">
                        CVV
                      </label>
                      <input
                        type="number"
                        name="cvc"
                        value={cardValues.cvc}
                        onChange={(e) =>
                          setCardValues({
                            ...cardValues,
                            cvc: e.target.value,
                            cvv: e.target.value,
                          })
                        }
                        onFocus={handleInputFocus}
                        placeholder="cvv"
                        maxLength="3"
                        max={999}
                        required
                      />
                      <input type="hidden" name="cvv" value={cardValues.cvc} />
                    </div>
                  </div>
                </div>
                <div className="col-12 place-order my-4 text-center">
                  <label htmlFor=""></label>
                  {
                      disableButton ? (
                        <span className="button-active-hs btn-black fw-bold w-75 mt-2 py-3 fs-5 opacity-50" style={{ cursor: "not-allowed", pointerEvents: "none" }}>
                          {t("page_checkout.pay")}  <Loader2 className="animate-spin" /> 
                        </span>
                      )  : (
                        <button  type="submit" className="button-active-hs btn-black fw-bold w-75 mt-2 py-3 fs-5" >
                          {t("page_checkout.pay")} <CreditCard />
                        </button>
                      )

                      
                  }
                  
                  
                </div>

                <div className="col-12 hidden">
                  <input name="type" value={cardValues.type} />
                  <input name="key_id" value="14482124" />
                  <input name="hash" id="hash" />
                  <input name="time" id="time" />
                  <input name="amount" value={cardValues.amount} />
                  <input name="orderid" value={cardValues.orderid} />
                  <input name="ccnumber" value={cardValues.ccnumber} />
                  {/* <input name="ccexp" value={cardValues.ccexp} /> */}
                  <input name="cvv" value={cardValues.cvv} />
                  <input name="first_name" value={cardValues.first_name} />
                  <input name="last_name" value={cardValues.last_name} />
                  <input name="email" value={cardValues.email} />
                  <input name="phone" value={cardValues.phone} />

                  <input
                    type="hidden"
                    name="redirect"
                    value="https://hypestreet.dssolutionsgt.com/respuesta.html"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 pt-95">
        <hr />
        <small className="text-muted fst-italic lh-base">
          {t("page_checkout.policy_cookies")}
        </small>
      </div>
    </div>
  );
};
