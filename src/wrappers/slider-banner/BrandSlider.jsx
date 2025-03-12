import React, { useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Instalar módulos de Swiper que vamos a utilizar
SwiperCore.use([Navigation, Pagination]);

export function ImageRotate({ ImageBrand }) {
  const [rotated, setRotated] = useState(false);
  const [animating, setAnimating] = useState(false);

  return (
    ImageBrand && (
      <img
        src={ImageBrand.image}
        alt={ImageBrand.name}
        className="img-fluid"
        width={859}
        height={600}
        style={{
          objectFit: "cover",
          backgroundColor: "transparent",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          aspectRatio: "10/16",
          transition: "transform 0.8s ease-in-out",
          transform: rotated ? "rotateY(360deg)" : "rotateY(0deg)", // Rotación en Y
        }}
        onMouseEnter={() => {
          if (!animating) {
            setRotated((prev) => !prev); // Alterna entre 0° y 180°
            setAnimating(true); // Bloquea nuevas animaciones hasta que termine
          }
        }}
        onTransitionEnd={() => setAnimating(false)} // Habilita nuevas animaciones
        loading="lazy"
      />
    )
  );
}



export function ImageBrand({ ImageSrc }) {
  if (!ImageSrc || !ImageSrc.image) return null; // Evita errores si `ImageSrc` no tiene datos

  return (
    <LazyLoadImage
      src={ImageSrc.image}
      alt={ImageSrc.name || "Imagen"}
      className="img-fluid"
      width={800} // Se ajusta a un tamaño más razonable
      height={600}
      style={{
        objectFit: "cover",
        aspectRatio: "10/16",
        transition: "transform 0.8s ease-in-out",
      }}
      effect="blur" // Aplica efecto de desenfoque al cargar
      placeholderSrc="/placeholder.jpg" // Imagen de baja calidad para mejorar la UX
      srcSet={`${ImageSrc.imageSmall} 480w, ${ImageSrc.image} 1024w`}
      sizes="(max-width: 768px) 480px, 1024px"
    />
  );
}


const BrandSlider = ({ spaceLeftClass, spaceRightClass }) => {
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
    <>
      <div className="container-fluid row mx-auto px-5 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-medium text-left uppercase mx-4 text-white">
          {" "}
          Nuevos Ingresos
        </h1>
      </div>
      <section
        className={clsx(
          "container-fluid align-self-center mx-auto px-5 sm:px-6 lg:px-8 slider-area",
          spaceLeftClass,
          spaceRightClass
        )}
      >
        <div className="slider-active-black nav-style-1-black">
          <Swiper
            modules={[Navigation]}
            navigation={{
              nextEl: ".hs-custom-next",
              prevEl: ".hs-custom-prev",
            }}
            slidesPerView={4} // Default: 4 slides en escritorio
            loop={true} // Habilitar bucle infinito
            breakpoints={{
              320: {
                slidesPerView: 2, // Móviles muy pequeños
                spaceBetween: 1, // Espacio más pequeño entre slides
              },
              576: {
                slidesPerView: 2, // Tablets
                spaceBetween: 5, // Espacio moderado entre slides
              },
              768: {
                slidesPerView: 2, // Tablets grandes o pantallas medianas
                spaceBetween: 10, // Espacio intermedio
              },
              901: {
                slidesPerView: 3, // Tablets grandes o pantallas medianas
                spaceBetween: 10, // Espacio intermedio
              },
              1024: {
                slidesPerView: 4, // Escritorio
                spaceBetween: 10, // Espacio más grande entre slides
              },
            }}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {brands.map((brand, index) => (
              <SwiperSlide key={`${brand.id}-${index}`} className="">
                <div className="container-fluid col-lg-9 col-md-12 col-sm-12 col-12 mx-40 my-5 slider-area">
                  <Link to={brand.url}>
                    <div className="container row product-card mx-auto">
                      <div className="d-flex align-items-center justify-content-center align-content-around">
                        <ImageBrand ImageSrc={brand} />
                      </div>
                    </div>
                  </Link>
                </div>
              </SwiperSlide>
            ))}

            {/* Botones personalizados */}
            <button className="hs-custom-prev hs-custom-next-white">
              <ChevronLeft size={48} />
            </button>
            <button className="hs-custom-next hs-custom-prev-white">
              <ChevronRight size={48} />
            </button>
          </Swiper>
        </div>
      </section>
    </>
  );
};

export default BrandSlider;
