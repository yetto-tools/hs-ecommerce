import React, { Fragment, useEffect, useState } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import NewArrivals from "../../wrappers/slider-banner/NewArrivals";
import CustomSlider from "../../wrappers/slider-banner/CustomSlider";

import BannerMultiColumnImage from "../../components/banner/BannerMultiColumnImage";
import SliderBanner from "../../wrappers/slider-banner/SliderBanner";
import FeatureIconFour from "../../wrappers/feature-icon/FeatureIconFour";
import BannerOne from "../../wrappers/banner/BannerOne";
import HeroSliderSeven from "../../wrappers/hero-slider/HeroSliderSeven";

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

          <section className="container-fluid col-9 mx-auto pt-100 pb-50">
            <BannerOne spaceBottomClass="pb-70" />
          </section>

          <section className="container-fluid col-11 mx-auto pt-50 pb-100">
            <HeroSliderSeven />
          </section>

          <section className="container-fluid col-11 mx-auto  pt-50 pb-100">
            <FeatureIconFour
              spaceBottomClass="pb-70"
              containerClass="container-fluid"
              responsiveClass="res-mrg-md-mt"
            />
          </section>
        </main>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionTwo;
