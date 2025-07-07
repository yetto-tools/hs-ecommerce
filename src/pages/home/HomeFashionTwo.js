import React, { Fragment, useEffect, useState } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import NewArrivals from "../../wrappers/slider-banner/NewArrivals";
import CustomSlider from "../../wrappers/slider-banner/CustomSlider";

import BannerMultiColumnImage from "../../components/banner/BannerMultiColumnImage";
import SliderBanner from "../../wrappers/slider-banner/SliderBanner";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";

const HomeFashionTwo = () => {
  const [brand, setBrand] = useState(null);

  useEffect(() => {
    const getBrands = async () => {
      try {
        const response = await fetch(
          `${window.location.origin}/data/BannerPrincipal.json`
        );
        console.log(`${window.location.origin}/data/BannerPrincipal.json`);
        console.log(response);
        if (!response.ok) throw new Error("Network response was not ok");

        const data = await response.json();
        setBrand(data);
      } catch (error) {
        console.error("Error al cargar las marcas:", error);
      }
    };

    getBrands();
  }, []);

  return (
    <Fragment>
      <SEO
        titleTemplate="Las Mejores Marcas"
        shortDescription="¡Hypeate! ⚡️ las mejores marcas."
        image={`${process.env.REACT_APP_IMAGE_ROOT}/logo-w-colors.png`}
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <main className="">
          <SliderBanner />
          <FeatureIconFour
            spaceBottomClass="pb-70"
            containerClass="container"
            responsiveClass="res-mrg-md-mt"
          />
        </main>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionTwo;
