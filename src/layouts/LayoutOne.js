import PropTypes from "prop-types";
import { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";

import ScrollToTop from "../components/scroll-to-top";
import FooterHypestreet from "../wrappers/footer/FooterHypestreet";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LayoutOne = ({
  children,
  headerContainerClass,
  headerTop,
  headerPaddingClass,
  headerPositionClass,
}) => {
  return (
    <Fragment>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        headerPaddingClass={headerPaddingClass}
        headerPositionClass={headerPositionClass}
      />
      {children}

      <FooterHypestreet
        backgroundColorClass="bg-black"
        spaceTopClass="pt-100"
        spaceBottomClass="pb-70"
      />
      <ScrollToTop />
    </Fragment>
  );
};

LayoutOne.propTypes = {
  children: PropTypes.node,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerPositionClass: PropTypes.string,
  headerTop: PropTypes.string,
};

export default LayoutOne;
