import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";
import { useTranslation } from "react-i18next";

const HeaderTopDevelopment = ({ borderStyle }) => {
  const currency = useSelector((state) => state.currency);
  const {t} = useTranslation();
  return (
    <div className={clsx("header-top-wap", borderStyle === "fluid-border" && "border-bottom")}>
      
      <div className="header-offer">
        <p>
          Hambiente de Pruebas
          
        </p>
      </div>
    </div>
  );
};

HeaderTopDevelopment.propTypes = {
  borderStyle: PropTypes.string,
};

export default HeaderTopDevelopment;