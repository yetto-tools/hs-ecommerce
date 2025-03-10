import React, { Fragment, useEffect } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import BannerSingleImage from "../../components/banner/BannerSingleImage";
import NewArrivals from "../../wrappers/slider-banner/NewArrivals";
import CustomSlider from "../../wrappers/slider-banner/CustomSlider";
import BannerPrincipal from "../../wrappers/slider-banner/BannerPrincipal";
import BannerMultiColumn from "../../components/banner/BannerMultiColumn";
import BannerMultiColumnImage from "../../components/banner/BannerMultiColumnImage";
import { useDispatch, useSelector } from "react-redux";
import { fetchNewArticles } from "../../hooks/use-FetchArticles";

const HomeFashionTwo = () => {
  const brands = [
    {
      id: 1,
      logo: "",
      image: "/assets/img/marcas/new era.jpg",
      name: "new era",
    },
    {
      id: 2,
      logo: "",
      image: "/assets/img/marcas/mitchelle & ness.jpg",
      name: "mitchell & ness",
    },
    {
      id: 3,
      logo: "",
      image: "/assets/img/marcas/adidas.jpg",
      name: "adidas",
    },
    {
      id: 4,
      logo: "",
      image: "/assets/img/marcas/nike.jpg",
      name: "nike",
    },
    {
      id: 5,
      logo: "",
      image: "/assets/img/marcas/jordan.jpg",
      name: "jordan",
    },
    {
      id: 6,
      logo: "",
      image: "/assets/img/marcas/puma.jpg",
      name: "puma",
    },
    {
      id: 7,
      logo: "",
      image: "/assets/img/marcas/new balance.jpg",
      name: "new balance",
    },
    {
      id: 8,
      logo: "",
      image: "/assets/img/marcas/asics.jpg",
      name: "asics",
    },
  ];
  return (
    <Fragment>
      <SEO
        titleTemplate="Las Mejores Marcas"
        shortDescription="¡Hypeate! ⚡️ las mejores marcas."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-2"
        headerTop="visible"
      >
        <main className="">
          {/* hero slider */}
          <HeroSliderNine spaceLeftClass="" spaceRightClass="" />

          {/* slider new arrivals */}
          <div
            className="bg-white container-fluid  d-flex flex-column justify-content-around align-items-center  align-items-center"
            style={{ height: "48rem" }}
          >
            {/* <BrandLogoSliderFour
              spaceBottomClass="pb-50"
              spaceTopClass="pt-50"
            /> */}

            <NewArrivals />
          </div>
          {/* slide de marcas  */}

          {/*  */}

          <div
            className="bg-black d-flex flex-column justify-content-around align-items-center  align-items-center pb-5 bg-black"
            style={{ height: "36rem" }}
          >
            <div className="container-fluid text-left">
              <div className="row m-5">
                <h1 className="text-white uppercase">Marcas</h1>
              </div>
            </div>
            <CustomSlider slides={brands} />
          </div>

          {/* <BannerSingleImage /> */}
          <BannerMultiColumnImage />

          {/* tab product */}
          {/* <TabProductFive spaceBottomClass="pb-60" category="GORRAS" /> */}
          <div className="pt-40 pb-20 bg-black"></div>
          {/* blog featured */}
          {/* <BlogFeatured spaceBottomClass="pb-55" /> */}
        </main>
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashionTwo;
