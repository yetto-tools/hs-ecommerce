import PropTypes from "prop-types";
import React, { Fragment } from "react";
import HeaderOne from "../wrappers/header/HeaderOne";
import FooterOne from "../wrappers/footer/FooterOne";
import ScrollToTop from "../components/scroll-to-top";

const LayoutThree = ({
  children,
  headerContainerClass,
  headerTop,
  headerBorderStyle,
  headerPaddingClass,
}) => {
  return (
    <Fragment>
      <HeaderOne
        layout={headerContainerClass}
        top={headerTop}
        borderStyle={headerBorderStyle}
        headerPaddingClass={headerPaddingClass}
      />
      {children}
      <FooterOne
        backgroundColorClass="footer-white"
        spaceLeftClass="ml-70"
        spaceRightClass="mr-70"
        footerTopBackgroundColorClass="bg-gray-2"
        footerTopSpaceTopClass="pt-80"
        footerTopSpaceBottomClass="pb-60"
        copyrightColorClass="copyright-gray"
        footerLogo="/assets/img/logo/logo-color-120x120.jpg"
      />
      <ScrollToTop />
    </Fragment>
  );
};

LayoutThree.propTypes = {
  children: PropTypes.node,
  headerBorderStyle: PropTypes.string,
  headerContainerClass: PropTypes.string,
  headerPaddingClass: PropTypes.string,
  headerTop: PropTypes.string,
};

export default LayoutThree;
