import PropTypes from "prop-types";
import clsx from "clsx";
import Swiper, { SwiperSlide } from "../../components/swiper";
import categoryData from "../../data/category/category-two.json";
import CategoryTwoSingle from "../../components/category/CategoryTwoSingle.js";
import SectionTitleFour from "../../components/section-title/SectionTitleFour.js";

const settings = {
  loop: true, // Para que el slider sea infinito
  spaceBetween: 30, // Espacio entre los slides
  centeredSlides: true, // Centrar siempre la diapositiva activa
  autoplay: {
    delay: 5000, // Cambiar de slide cada 5 segundos
    disableOnInteraction: false, // No detener el autoplay al interactuar
  },
  grabCursor: true, // Cambia el cursor al estilo "grabbing"
  slidesPerView: "auto", // Mostrar tantas imágenes como quepan
  slidesPerGroup: 1, // Asegura que se mueva un slide a la vez
  loopFillGroupWithBlank: false, // Evita llenar espacios vacíos con bloques en blanco
  watchSlidesProgress: true, // Monitorea el progreso de los slides
  loopedSlides: categoryData.length, // Ajustar para el bucle correcto
  breakpoints: {
    320: {
      slidesPerView: 1, // Un slide visible en pantallas pequeñas
      centeredSlides: true, // Centrar el único slide visible
    },
    576: {
      slidesPerView: 2, // Tres slides visibles en pantallas medianas
    },
    992: {
      slidesPerView: 3, // Cuatro slides visibles en pantallas grandes
    },
  },
};
const CategoryTwoSlider = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("collections-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        {/* section title */}
        <SectionTitleFour titleText="New  Arrivals" spaceBottomClass="mb-40" />
        <div className="collection-wrap">
          <div className="collection-active">
            {categoryData && (
              <Swiper options={settings}>
                {categoryData.map((single, key) => (
                  <SwiperSlide key={key}>
                    <CategoryTwoSingle data={single} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

CategoryTwoSlider.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string,
};

export default CategoryTwoSlider;
