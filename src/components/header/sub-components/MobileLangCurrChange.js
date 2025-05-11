import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { setCurrency } from "../../../store/slices/currency-slice"

const MobileLangCurrChange = () => {
  const {t,  i18n } = useTranslation();
  const dispatch = useDispatch();
  const currency = useSelector((state) => state.currency);

  const changeLanguageTrigger = e => {
    const languageCode = e.target.value;
    i18n.changeLanguage(languageCode);
    switch (languageCode) {
      case 'es-GT':
          dispatch(setCurrency('GTQ'));
        break;
      case 'en':
          dispatch(setCurrency('USD'));
        break;
      default:
        dispatch(setCurrency('GTQ'));
      break;
    }
    closeMobileMenu();

  };

  const setCurrencyTrigger = e => {
    const currencyName = e.target.value;
    dispatch(setCurrency(currencyName));
    closeMobileMenu();
  };

  const closeMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.remove("active");
  };

  return (
    <div className="mobile-menu-middle">
      <div className="lang-curr-style">
        <span className="title mb-2" name="">{t('mobile_menu_select_choose.choose_lang')}</span>
        <select
          value={i18n.resolvedLanguage}
          onChange={changeLanguageTrigger}
        >
          <option value="es-GT">Español (GT)</option>
          <option value="en">English</option>
        </select>
      </div>
      <div className="lang-curr-style" hidden>
        <span className="title mb-2">Choose Currency</span>
        <select
          value={currency.currencyName}
          onChange={setCurrencyTrigger}
        >
          <option value="GTQ">Q</option>
          <option value="USD">$</option>

        </select>
      </div>
    </div>
  );
};

export default MobileLangCurrChange;
