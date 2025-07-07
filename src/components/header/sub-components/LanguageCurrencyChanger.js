import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../../../store/slices/currency-slice";

const LanguageCurrencyChanger = ({ currency }) => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const changeLanguageTrigger = (e) => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
  };

  const setCurrencyChangeTrigger = (codeCurrency) => {
    const currencyName = codeCurrency;
    dispatch(setCurrency(currencyName));
  };

  const setCurrencyTrigger = (e) => {
    const currencyName = e.target.value;
    dispatch(setCurrency(currencyName));
  };

  return (
    <div className="language-currency-wrap">
      {/* <div className="same-language-currency language-style">
        <span>
          {
            i18n.resolvedLanguage === "es-GT"
            ? "Español (GT)"
            : i18n.resolvedLanguage === "en"
            ? "English"
            : ""}
            {" "}
          <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown">
          <ul>
            <li>
              <button value="es-GT" onClick={e => {changeLanguageTrigger(e); setCurrencyChangeTrigger("GTQ") } } >
                Español (GT)
              </button>
            </li>
            <li>
              <button value="en" onClick={e => { changeLanguageTrigger(e); setCurrencyChangeTrigger("USD")} } >
                English
              </button>
            </li>
          </ul>
        </div>
      </div>
      <div className="same-language-currency use-style" hidden>
        <span>
          {currency.currencyName} <i className="fa fa-angle-down" />
        </span>
        <div className="lang-car-dropdown" >
          <ul>
          <li>
              <button value="GTQ" onClick={e => setCurrencyTrigger(e)}>
                GTQ
              </button>
            </li>

            <li>
              <button value="USD" onClick={e => setCurrencyTrigger(e)}>
                USD
              </button>
            </li>
          </ul>
        </div>
      </div> */}
      <div className="same-language-currency">
        <p>{t("header_top.call_phone")}</p>
      </div>
    </div>
  );
};

LanguageCurrencyChanger.propTypes = {
  currency: PropTypes.shape({}),
};

export default LanguageCurrencyChanger;
