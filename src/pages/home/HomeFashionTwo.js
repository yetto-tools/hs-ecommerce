import React, { Fragment } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderNine from "../../wrappers/hero-slider/HeroSliderNine";
import BannerSingleImage from "../../components/banner/BannerSingleImage";
import NewArrivals from "../../wrappers/slider-banner/NewArrivals";
import CustomSlider from "../../wrappers/slider-banner/CustomSlider";
import BannerPrincipal from "../../wrappers/slider-banner/BannerPrincipal";
import BannerMultiColumn from "../../components/banner/BannerMultiColumn";
import BannerMultiColumnImage from "../../components/banner/BannerMultiColumnImage";

const HomeFashionTwo = () => {
  const products = [
    {
      idArticulo: 255,
      CodigoInterno: "JI4219/PRP+7",
      Sku: "JI4219",
      name: "SAMBA",
      shortDescription:
        "Reviví la época gloriosa del deporte con estas zapatillas adidas Samba OG. Lanzadas por primera vez en los años 50, las Samba trascendieron sus raíces futbolísticas para convertirse en un ícono cultural. Este par rinde homenaje al modelo original con una parte superior hecha en una mezcla de materiales sofisticados y el icónico diseño de la puntera en T. La suela de caucho es resistente al desgaste y brinda tracción sin importar lo que te depare el día, tanto dentro como fuera de la cancha.",
      price: 1059.0,
      Descuento_Porcentaje: 25.0,
      priceDiscount: 794.25,
      image: "JI4219_01.webp",
      images: ["JI4219_01.webp", "JI4219_02.webp", "JI4219_03.webp"],
      stock: 50,
      variation: [
        {
          color: "purple",
          colorHex: "#433a39",
          image: "JI4219_01.webp",
          size: [
            {
              name: " 6",
              stock: 50,
            },
            {
              name: " 6.5",
              stock: 50,
            },
            {
              name: " 7",
              stock: 50,
            },
          ],
        },
      ],
    },
    {
      idArticulo: 81,
      CodigoInterno: "IF0881/GRN+9",
      Sku: "IF0881",
      name: "GAZELLE",
      shortDescription:
        "Sal del pasado y ponte estos icónicos zapatos Gazelle de adidas. Diseñadas originalmente a finales de los años 60 para entrenar, las Gazelles son ahora un elemento esencial del estilo cotidiano que fusiona looks vintage con vibraciones modernas. Esta versión es una reproducción auténtica de un modelo del 91 y presenta la misma gamuza premium, puntera en T y lengüeta moldeada. Un forro sintético y una suela de goma garantizan comodidad en cada paso. Ya sea que estés haciendo recados o saliendo por la noche, estas zapatillas atemporales te mantendrán fresco.",
      price: 1049.0,
      Descuento_Porcentaje: 0.0,
      priceDiscount: 1049.0,
      image: "IF0881_01.webp",
      images: ["IF0881_01.webp", "IF0881_02.webp", "IF0881_03.webp"],
      stock: 50,
      variation: [
        {
          color: "teal",
          colorHex: "#433a39",
          image: "IF0881_01.webp",
          size: [
            {
              name: " 7.5",
              stock: 50,
            },
            {
              name: " 9",
              stock: 50,
            },
            {
              name: " 9.5",
              stock: 50,
            },
            {
              name: " 10.5",
              stock: 50,
            },
            {
              name: " 11",
              stock: 50,
            },
            {
              name: " 12",
              stock: 50,
            },
          ],
        },
      ],
    },
    {
      idArticulo: 148,
      CodigoInterno: "IG3783/WHT+9.5",
      Sku: "IG3783",
      name: "FORUM LOW",
      shortDescription:
        "Una actualización discreta pero elegante de un zapato icónico, estas zapatillas adidas aportan una sutil sofisticación al uso diario. Cuero de primera calidad en tonos complementarios combinados con detalles agrietados y el característico logotipo de la lengüeta para darle un toque de contraste. Un forro textil y una suela de goma brindan comodidad durante todo el día. Para aquellos que buscan zapatos con versatilidad y atractivo atemporal, este par es un elemento esencial para el día a día.",
      price: 1069.0,
      Descuento_Porcentaje: 0.0,
      priceDiscount: 1069.0,
      image: "IG3783_01.webp",
      images: ["IG3783_01.webp", "IG3783_02.webp", "IG3783_03.webp"],
      stock: 50,
      variation: [
        {
          color: "white",
          colorHex: "#433a39",
          image: "IG3783_01.webp",
          size: [
            {
              name: " 6.5",
              stock: 50,
            },
            {
              name: " 7.5",
              stock: 50,
            },
            {
              name: " 8",
              stock: 50,
            },
            {
              name: " 8.5",
              stock: 50,
            },
            {
              name: " 9",
              stock: 50,
            },
            {
              name: " 9.5",
              stock: 50,
            },
          ],
        },
      ],
    },
    {
      idArticulo: 238,
      CodigoInterno: "IH7907/WHT+9",
      Sku: "IH7907",
      name: "FORUM LOW CL",
      shortDescription:
        "Este par de zapatillas adidas Forum Low CL te ofrece el equilibrio perfecto entre estilo relajado y retro. Disfruta de una comodidad ininterrumpida gracias a la parte superior de cuero de primera calidad y al suave forro textil. Estos zapatos versátiles son un elemento básico del guardarropa.",
      price: 1069.0,
      Descuento_Porcentaje: 0.0,
      priceDiscount: 1069.0,
      image: "IH7907_01.webp",
      images: ["IH7907_01.webp", "IH7907_02.webp", "IH7907_03.webp"],
      stock: 50,
      variation: [
        {
          color: "white",
          colorHex: "#433a39",
          image: "IH7907.webp",
          size: [
            {
              name: " 7",
              stock: 50,
            },
            {
              name: " 7.5",
              stock: 50,
            },
            {
              name: " 8.5",
              stock: 50,
            },
            {
              name: " 9",
              stock: 50,
            },
            {
              name: " 9.5",
              stock: 50,
            },
          ],
        },
      ],
    },
    {
      idArticulo: 220,
      CodigoInterno: "IH4881/WHT+9.5",
      Sku: "IH4881",
      name: "SAMBA",
      shortDescription:
        "Reviví la época gloriosa del deporte con estas zapatillas adidas Samba OG. Lanzadas por primera vez en los años 50, las Samba trascendieron sus raíces futbolísticas para convertirse en un ícono cultural. Este par rinde homenaje al modelo original con una parte superior hecha en una mezcla de materiales sofisticados y el icónico diseño de la puntera en T. La suela de caucho es resistente al desgaste y brinda tracción sin importar lo que te depare el día, tanto dentro como fuera de la cancha.",
      price: 1140.0,
      Descuento_Porcentaje: 0.0,
      priceDiscount: 1140.0,
      image: "IH4881_01.webp",
      images: ["IH4881_01.webp", "IH4881_02.webp", "IH4881_03.webp"],
      stock: 50,
      variation: [
        {
          color: "white",
          colorHex: "#433a39",
          image: "IH7907.webp",
          size: [
            {
              name: " 6",
              stock: 50,
            },
            {
              name: " 7 5",
              stock: 50,
            },
            {
              name: " 8",
              stock: 50,
            },
            {
              name: " 8.5",
              stock: 50,
            },
          ],
        },
      ],
    },
  ];

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

            <NewArrivals products={products} />
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
