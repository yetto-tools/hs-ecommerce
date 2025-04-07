import { useRef, useState } from "react";
import PageContentBlank from "../other/PageContentBlank";
import { useTranslation } from "react-i18next";
import { paymentForm } from "../../adapters/payment";
import { Loader2, CreditCard } from "lucide-react";
import { generarHash } from "../../helpers/validator";

export const FormPayment = () => {
  const { t } = useTranslation();
  const formRef = useRef({});
  const [formValues, setFormValues] = useState(paymentForm);

  const handleChangeFormPaymen = (e) => {
    const { name, value } = e.target;

    // Actualizamos el estado utilizando la función callback para obtener el estado previo.
    setFormValues((prev) => {
      // Creamos una nueva versión de los valores del formulario con el campo actualizado.
      const nuevosValores = { ...prev, [name]: value };

      // Calculamos el hash MD5 usando los valores actualizados.
      const hashMD5 = generarHash(
        nuevosValores.orderid.trim(),
        nuevosValores.amount,
        nuevosValores.time,
        nuevosValores.key_id
      );

      // Retornamos el nuevo estado incluyendo el hash.
      return { ...nuevosValores, hash: hashMD5 };
    });
  };

  const handleSubmitFormPaymen = (e) => {
    e.preventDefault();
    console.log(formValues);

    console.log(
      generarHash(
        "test",
        "1.00",
        "1279302634",
        "23232332222222222222222222222222"
      )
    );

    const hashMD5 = generarHash(
      formValues.orderid,
      formValues.amount,
      formValues.time,
      formValues.key_id
    );
    console.log({
      orderid: formValues.orderid,
      amount: formValues.amount,
      time: formValues.time,
      key: formValues.key_id,
    });
    console.log(hashMD5);
  };

  return (
    <>
      <section className="billing-info-wrap mb-30">
        <form
          className="form-control"
          ref={formRef}
          onChange={handleChangeFormPaymen}
          onSubmit={handleSubmitFormPaymen}
          name="CredomaticPost"
          method="post"
          action="https://credomatic.compassmerchantsolutions.com/api/transact.php"
          autoComplete="off"
          autoFocus={true}
        >
          <div className="billing-info pb-4"></div>

          <label htmlFor="type">{t("page_checkout.type")}</label>
          <input type="text" name="type" value={formValues.type} />

          <label htmlFor="key_id">{t("page_checkout.key_id")}</label>
          <input type="text" name="key_id" value={formValues.key_id} />

          <label htmlFor="hash">{t("page_checkout.hash")}</label>
          <input type="text" name="hash" value={formValues.hash} />

          <label htmlFor="time">{t("page_checkout.time")}</label>
          <input type="text" name="time" value={formValues.time} />

          <label htmlFor="amount">{t("page_checkout.amount")}</label>
          <input
            type="text"
            name="amount"
            value={formValues.amount}
            placeholder="0.00"
          />
          <label htmlFor="tax">{t("page_checkout.tax")}</label>
          <input
            type="text"
            name="tax"
            value={formValues.tax}
            placeholder="0.00"
          />
          <label htmlFor="orderid">{t("page_checkout.orderid")}</label>
          <input type="text" name="orderid" value={formValues.orderid} />
          <label htmlFor="processor_id">
            {t("page_checkout.processor_id")}
          </label>
          <input
            type="text"
            name="processor_id"
            value={formValues.processor_id}
          />
          <label htmlFor="name">{t("page_checkout.name")}</label>
          <input
            type="text"
            name="first_name, last_name"
            id="name"
            value={formValues.name}
            placeholder={t("page_checkout.name")}
          />
          <label htmlFor="phone">{t("page_checkout.phone")}</label>
          <input type="text" name="phone" value={formValues.phone} />
          <label htmlFor="email">{t("page_checkout.email")}</label>
          <input
            type="text"
            name="email"
            value={formValues.email}
            placeholder={t("page_checkout.email")}
          />
          <label htmlFor="ccnumber">{t("page_checkout.ccnumber")}</label>
          <input
            type="text"
            name="ccnumber"
            value={formValues.ccnumber}
            placeholder="0000 0000 0000 0000"
          />
          <label htmlFor="ccexp">{t("page_checkout.ccexp")}</label>
          <input type="text" name="ccexp" value={formValues.ccexp} />
          <label htmlFor="cvv">{t("page_checkout.cvv")}</label>
          <input type="text" name="cvv" value={formValues.cvv} />
          <label htmlFor="avs">{t("page_checkout.avs")}</label>
          <input type="text" name="avs" value={formValues.avs} />
          <label htmlFor="redirect">{t("page_checkout.redirect")}</label>
          <input type="text" name="redirect" value={formValues.redirect} />
          <button
            type="submit"
            className="button-active-hs btn-black w-100 d-flex justify-content-center align-items-center gap-2 py-2"
          >
            Confimar Pago
            <CreditCard />
          </button>
        </form>
      </section>
    </>
  );
};

export const PageSuccessPayment = () => {
  return (
    <PageContentBlank>
      <h1>Success Payment</h1>
      <FormPayment />
    </PageContentBlank>
  );
};
